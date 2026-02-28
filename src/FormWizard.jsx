import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, ChevronLeft, Check, Download, AlertCircle, MapPin, Calendar, User, Building, Mail, ExternalLink, Info } from 'lucide-react';
import { CONTACTS_DATA } from './contactsData.js';

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    // Step 1: Agency Selection
    selectedAgency: null,
    agencyName: '',
    agencyEmail: '',
    agencyPortal: '',
    agencyType: 'Police Department', // Police Department, Sheriff's Office, City/Town
    
    // Step 2: User Information
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    
    // Step 3: Camera Locations
    cameraLocations: [''],
    requestAllLocations: true,
    
    // Step 4: Options
    templateType: 'simplified', // simplified or comprehensive
    dateRangeType: 'inception', // inception, specific, recent
    startDate: '',
    endDate: '',
    requestFeeWaiver: false,
    preferredFormat: 'electronic',
    
    // Additional items
    includeAuditLogs: true,
    includeFederalAccess: true,
  });

  // Filter agencies by type first, then by search term
  const filteredAgencies = useMemo(() => {
    // Filter by agency type
    let typeFiltered;
    if (formData.agencyType === "Sheriff's Office") {
      // County-level entries only
      typeFiltered = CONTACTS_DATA.filter(a => a.Notes === 'County Public Records');
    } else {
      // Police Department and City/Town: city/town entries (exclude county and tribal)
      typeFiltered = CONTACTS_DATA.filter(a => a.Notes !== 'County Public Records' && a.County !== 'Tribal');
    }

    if (!searchTerm) return typeFiltered;
    const term = searchTerm.toLowerCase();

    if (formData.agencyType === "Sheriff's Office") {
      // Search by county name for sheriff mode
      return typeFiltered.filter(agency =>
        agency.County.toLowerCase().includes(term) ||
        agency.Email.toLowerCase().includes(term)
      );
    }

    return typeFiltered.filter(agency =>
      agency.City.toLowerCase().includes(term) ||
      agency.County.toLowerCase().includes(term) ||
      agency.Email.toLowerCase().includes(term)
    );
  }, [searchTerm, formData.agencyType]);

  const handleAgencySelect = (agency) => {
    let agencyName;
    if (formData.agencyType === "Sheriff's Office") {
      agencyName = `${agency.County} County Sheriff's Office`;
    } else if (formData.agencyType === 'Police Department') {
      agencyName = `${agency.City} Police Department`;
    } else {
      // City/Town
      const isTown = agency.Notes && agency.Notes.toLowerCase().includes('town');
      agencyName = isTown ? `Town of ${agency.City}` : `City of ${agency.City}`;
    }

    setFormData({
      ...formData,
      selectedAgency: agency,
      agencyName,
      agencyEmail: agency.Email,
      agencyPortal: agency['Portal URL'] || '',
    });
  };

  const updateFormData = (field, value) => {
    if (field === 'agencyType') {
      // Clear selection and search when agency type changes
      setSearchTerm('');
      setFormData({ ...formData, [field]: value, selectedAgency: null, agencyName: '', agencyEmail: '', agencyPortal: '' });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Check if selected agency is a small town that may not have its own PD
  const isSmallTownEntry = formData.selectedAgency &&
    formData.agencyType === 'Police Department' &&
    ['Town Hall', 'Town Clerk', 'General Contact', 'City Hall'].includes(formData.selectedAgency.Notes);

  // Find matching county sheriff entry for suggestion
  const countySheriffEntry = useMemo(() => {
    if (!isSmallTownEntry || !formData.selectedAgency) return null;
    return CONTACTS_DATA.find(a =>
      a.Notes === 'County Public Records' &&
      a.County === formData.selectedAgency.County
    );
  }, [isSmallTownEntry, formData.selectedAgency?.County]);

  const addCameraLocation = () => {
    setFormData({
      ...formData,
      cameraLocations: [...formData.cameraLocations, '']
    });
  };

  const updateCameraLocation = (index, value) => {
    const newLocations = [...formData.cameraLocations];
    newLocations[index] = value;
    setFormData({ ...formData, cameraLocations: newLocations });
  };

  const removeCameraLocation = (index) => {
    const newLocations = formData.cameraLocations.filter((_, i) => i !== index);
    setFormData({ ...formData, cameraLocations: newLocations });
  };

  const generateRequest = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let dateRangeText = '';
    if (formData.dateRangeType === 'inception') {
      dateRangeText = 'All records from program inception to present';
    } else if (formData.dateRangeType === 'recent') {
      dateRangeText = 'January 1, 2024 to present';
    } else {
      dateRangeText = `${formData.startDate} to ${formData.endDate}`;
    }

    let locationsText = '';
    if (formData.requestAllLocations) {
      locationsText = '- All surveillance camera locations operated by your department';
    } else {
      locationsText = formData.cameraLocations
        .filter(loc => loc.trim())
        .map(loc => `- ${loc}`)
        .join('\n');
    }

    const templateContent = formData.templateType === 'simplified' 
      ? generateSimplifiedTemplate()
      : generateComprehensiveTemplate();

    return templateContent
      .replaceAll('[INSERT DATE]', today)
      .replaceAll('[POLICE DEPARTMENT NAME]', formData.agencyName)
      .replaceAll('[DEPARTMENT EMAIL]', formData.agencyEmail)
      .replaceAll('[DEPARTMENT NAME]', formData.agencyName)
      .replaceAll('[YOUR NAME]', formData.userName)
      .replaceAll('[YOUR EMAIL]', formData.userEmail)
      .replaceAll('[YOUR PHONE]', formData.userPhone || '(not provided)')
      .replaceAll('[CAMERA LOCATIONS]', locationsText)
      .replaceAll('[DATE RANGE]', dateRangeText);
  };

  const generateSimplifiedTemplate = () => {
    return `# SIMPLIFIED PUBLIC RECORDS REQUEST
## Law Enforcement Surveillance Camera Systems - Brief Template
### Washington State RCW 42.56

---

**Date:** [INSERT DATE]

**To:** [POLICE DEPARTMENT NAME] - Public Records Officer  
**Email:** [DEPARTMENT EMAIL]

**From:** [YOUR NAME] | [YOUR EMAIL] | [YOUR PHONE]

---

## PUBLIC RECORDS REQUEST

**IMPORTANT:** A November 2025 Skagit County Superior Court ruling confirmed that surveillance camera data collected by law enforcement qualifies as public records under RCW 42.56, even when it includes images of individuals not suspected of crimes.

Dear Public Records Officer,

Pursuant to Washington State's Public Records Act (RCW 42.56), I request copies of the following public records:

### REQUESTED RECORDS

All records related to automated surveillance camera systems operated by, accessible to, or used in partnership with [DEPARTMENT NAME], including:

**Technology Systems Covered:**
- Automatic License Plate Readers (ALPR): Flock Safety, Motorola/Vigilant, Genetec, ELSAG, Neology, or similar
- Video surveillance: Ring Law Enforcement Portal, Axon systems, Real-Time Crime Centers, community camera registries
- Facial recognition systems integrated with camera networks
- Any other mass surveillance camera technology

**Specific Camera Locations:**
[CAMERA LOCATIONS]

### Specific Records Requested:

1. **Contracts & Costs:** All agreements with surveillance technology vendors (Flock Safety, Ring/Amazon, Axon, Motorola, Genetec, etc.), purchase orders, invoices, and total program costs

2. **Policies:** All policies and procedures governing surveillance camera use, data retention policies, privacy assessments, and policies regarding federal agency access

3. **Camera Details:** Installation dates, locations (with maps if available), complete inventory by type/manufacturer, and operational status of all surveillance cameras operated by your department

4. **Data Sharing & Federal Access:** 
   - Lists of agencies with access to your surveillance data
   - Data-sharing agreements (local, state, federal)
   - **Network audit logs showing all searches by any agency, including federal agencies**
   - Records of whether "National Lookup" features were enabled
   - Documentation of federal agency access (ICE, Border Patrol, FBI, etc.)
   - Records showing whether your agency was aware of federal access

5. **Usage Data:** For the period [DATE RANGE]:
   - Total license plate reads or footage hours per camera/system
   - Number and types of alerts generated
   - Cases where alerts led to stops or arrests
   - Statistics on external agency access

6. **Communications:** Emails between department staff and surveillance technology vendors, and communications regarding federal agency access

**Time Period:** [DATE RANGE]

**Format:** Electronic copies via email (PDF preferred)

---

## RESPONSE REQUIREMENTS

Per RCW 42.56.520, please respond within five (5) business days. If any records are partially exempt, please provide all non-exempt portions with redactions explained per RCW 42.56.210.

Please acknowledge receipt of this request and contact me if clarification is needed.

**Contact:** [YOUR EMAIL] (preferred) | [YOUR PHONE]

Thank you for your prompt attention to this matter.

Sincerely,

[YOUR NAME]  
[INSERT DATE]

---

**Legal Support:**
If denied based on privacy concerns, reference the Skagit County Superior Court ruling (*Rodriguez v. City of Sedro Woolley*, Nov. 2025) that confirmed surveillance data is subject to RCW 42.56. The court found that "broad and indiscriminate" surveillance collection does not create a privacy exemption.

**Key Issues to Monitor:**
Based on recent UW findings, many WA agencies may be unaware of federal access to their surveillance systems. Your request helps ensure transparency and accountability regarding who accesses this data.`;
  };

  const generateComprehensiveTemplate = () => {
    const feeWaiverText = formData.requestFeeWaiver
      ? '\n\n**Fee Waiver/Reduction Request:** I request a waiver or reduction of fees pursuant to RCW 42.56.120 as this request is in the public interest and not for commercial purposes. The disclosure of this information will contribute significantly to public understanding of government operations.'
      : '';

    const auditLogsText = formData.includeAuditLogs
      ? '\n- **Network audit logs showing all searches conducted by any agency, including search reasons/purposes**'
      : '';

    const federalAccessText = formData.includeFederalAccess
      ? `\n- Records of any federal agency access to surveillance data (FBI, ICE, DEA, CBP/Border Patrol, HSI, etc.)
- Documentation of whether "National Lookup" or similar inter-agency search features were enabled
- Records showing whether your agency was aware of federal access to your surveillance systems
- Communications regarding federal agency access requests or data sharing
- Records of access revocations or security audits following the UW Center for Human Rights report (October 2025)`
      : '';

    return `# PUBLIC RECORDS REQUEST
## Law Enforcement Surveillance Camera Systems Request Template
### Automated License Plate Readers (ALPR) & Video Surveillance
### Washington State Public Records Act (RCW 42.56)

---

**Date:** [INSERT DATE]

**To:** [POLICE DEPARTMENT NAME]
**Attention:** Public Records Officer/Public Disclosure Unit
**Email:** [DEPARTMENT EMAIL]

**From:**
[YOUR NAME]
[YOUR EMAIL]
[YOUR PHONE]

---

## IMPORTANT RECENT LEGAL PRECEDENT

**Skagit County Superior Court Ruling (November 2025):**

Judge Elizabeth Yost Neidzwski of Skagit County Superior Court recently ruled that surveillance camera data, including images captured by Flock cameras, qualifies as public records subject to Washington's Public Records Act (RCW 42.56). This landmark decision came after the cities of Sedro Woolley and Stanwood attempted to block public records requests by arguing that releasing surveillance images would violate privacy.

**Key Findings from the Court:**
- The judge found that the scope of surveillance was "so broad and indiscriminate" — with most images capturing people not suspected of any crime — that the data must be released under public records law
- The ruling specifically stated: "The Flock data do qualify as public records subject to the Public Records Act"
- This decision could affect dozens of Washington police departments using similar surveillance technology
- Both cities involved in the lawsuit have since turned off their camera systems

**Additional Context - Federal Access Concerns:**

A University of Washington Center for Human Rights report (October 2025) revealed that federal agents, including U.S. Border Patrol and ICE, had accessed Washington's surveillance camera networks, potentially in violation of state law prohibiting use of such systems for immigration enforcement.

---

## REQUEST FOR PUBLIC RECORDS

Dear Public Records Officer,

Pursuant to the Washington State Public Records Act, RCW 42.56, I am requesting access to and copies of public records described below. This request is made for personal use and not for commercial purposes.

### REQUESTED RECORDS

I am requesting all records related to automated surveillance camera systems operated by, accessible to, or used in partnership with [DEPARTMENT NAME], including but not limited to:

**Technology Systems Covered by This Request:**
- Automatic License Plate Reader (ALPR) systems including but not limited to: Flock Safety, Motorola/Vigilant Solutions, Genetec AutoVu, ELSAG, Neology, and any other fixed or mobile ALPR systems
- Video surveillance and monitoring systems including but not limited to: Ring Neighbors Public Safety Service/Law Enforcement Portal, Amazon Sidewalk network access, Axon/Evidence.com camera integrations, Real-Time Crime Center camera networks, community camera registry programs
- Facial recognition or biometric surveillance systems integrated with camera networks
- Any other mass surveillance camera technology, whether owned, leased, accessed, or operated through third-party agreements

**Specific Camera Location(s) of Interest:**
[CAMERA LOCATIONS]

For each identified camera/surveillance location and system, I request:

### 1. DEPLOYMENT AND OPERATIONAL RECORDS
- All contracts, agreements, or memoranda of understanding between [DEPARTMENT NAME] and surveillance technology vendors including but not limited to: Flock Safety, Ring/Amazon, Axon, Motorola, Vigilant Solutions, Genetec, and any other surveillance system providers
- Purchase orders, invoices, and payment records for all surveillance camera systems and related services
- Installation dates and locations of all surveillance cameras (include maps, network diagrams, or coverage area maps if available)
- Complete inventory of all surveillance camera systems by type, manufacturer, and location
- Current operational status of each camera/system
- Maintenance and service records
- Any technical specifications, operational manuals, or user guides for the camera systems
- Integration records showing how different systems connect or share data

### 2. POLICY AND PROCEDURE RECORDS
- All policies, procedures, standard operating procedures (SOPs), or guidelines governing the use of surveillance camera systems including ALPR, video surveillance, and facial recognition technologies
- Data retention policies specific to each type of surveillance data
- Privacy impact assessments or privacy policies related to surveillance systems
- Training materials provided to officers or staff regarding surveillance camera system use
- Audit procedures or oversight mechanisms for surveillance data access and use
- Policies governing third-party access to surveillance systems
- Community notification or transparency policies regarding surveillance deployments

### 3. DATA SHARING AND ACCESS RECORDS
- Lists of all agencies, organizations, or entities with access to surveillance data collected by [DEPARTMENT NAME]
- Data sharing agreements with other law enforcement agencies (local, state, federal, tribal)
- Records of participation in any surveillance data sharing networks (Flock network, Ring Neighbors portal, regional crime centers, etc.)
- Lists of all third-party vendors with access to surveillance data
- Logs of external agency queries or access to data from the specified locations for the period [DATE RANGE]${auditLogsText}${federalAccessText}
- Any agreements related to participation in inter-agency data sharing networks
- Records of civilian requests for footage through community camera programs

### 4. USAGE STATISTICS

For the period [DATE RANGE]:

**ALPR Systems:**
- Total number of license plate reads captured by each camera
- Number of "hot list" alerts generated
- Records indicating how alerts were categorized (stolen vehicle, wanted person, missing person, etc.)
- Documentation of cases where ALPR alerts led to stops, arrests, or investigations
- Statistics on accuracy rates, false positive alerts, or system errors

**Video Surveillance Systems:**
- Total hours of footage captured
- Number of footage requests processed (by agency personnel, external agencies, or civilians)
- Number of investigations assisted by surveillance footage

**Facial Recognition Systems (if applicable):**
- Number of searches conducted
- Accuracy and false positive rates
- Legal basis for each search

### 5. DATA RETENTION AND DELETION RECORDS
- Current data retention periods for each type of surveillance data (ALPR, video footage, facial recognition, etc.)
- Records of data deletion or purging activities
- Storage location of surveillance data (local, cloud, third-party servers)
- Geographic location of data servers (in-state, out-of-state, international)
- Chain of custody procedures for surveillance evidence

### 6. CORRESPONDENCE AND COMMUNICATIONS
- Email communications between [DEPARTMENT NAME] staff and surveillance technology vendors including Flock Safety, Ring/Amazon, Axon, Motorola, Vigilant Solutions, Genetec, and any other surveillance system providers
- Internal communications regarding the deployment, operation, or policy related to surveillance cameras
- Any correspondence with community members, elected officials, or oversight bodies regarding surveillance cameras
- Marketing materials, presentations, or proposals received from surveillance technology vendors

### 7. FINANCIAL RECORDS
- Total costs associated with surveillance camera systems (purchase, installation, subscription, maintenance)
- Budget documents allocating funds for ALPR systems
- Any cost-benefit analyses performed prior to or after deployment

### 8. PUBLIC NOTIFICATION AND TRANSPARENCY
- Records of public notices or community engagement regarding surveillance camera deployment
- Any reports to city council, county commissioners, or other governing bodies
- Public presentations or documents related to surveillance camera programs

---

## REQUEST PARAMETERS

**Time Period:** [DATE RANGE]

**Format Preference:** Electronic copies via email (PDF format preferred) or secure file transfer. If electronic provision is not possible, please provide records in the most cost-effective format available.${feeWaiverText}

---

## LEGAL REQUIREMENTS AND TIMELINE

Pursuant to RCW 42.56.520, I understand that you have five (5) business days to respond to this request by either:
1. Providing the requested records;
2. Providing a reasonable estimate of the time required to respond and the cost; or
3. Denying the request with a written statement of the specific exemption authorizing the withholding and an explanation of how the exemption applies.

If any portion of the requested records is exempt from disclosure, I request that you provide all non-exempt portions with redactions clearly marked and explained pursuant to RCW 42.56.210.

---

## CONTACT INFORMATION

Please acknowledge receipt of this request within five (5) business days. I can be reached at:

**Email:** [YOUR EMAIL] (preferred)
**Phone:** [YOUR PHONE]

I prefer communication via email for efficiency and to maintain a clear record of correspondence.

---

## CLARIFICATION

If any part of this request is unclear or requires clarification, please contact me immediately. I am happy to work with you to narrow or clarify this request to ensure compliance with the Public Records Act while obtaining the information sought.

Thank you for your attention to this matter. I look forward to your prompt response.

Sincerely,

[YOUR NAME]
[INSERT DATE]

---

**Legal Support:**
If denied based on privacy concerns, reference the Skagit County Superior Court ruling (*Rodriguez v. City of Sedro Woolley*, Nov. 2025) that confirmed surveillance data is subject to RCW 42.56. The court found that "broad and indiscriminate" surveillance collection does not create a privacy exemption.`;
  };

  const markdownToHtml = (md) => {
    let html = md
      // Escape HTML entities first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Horizontal rules
      .replace(/^---$/gm, '<hr/>')
      // Headers
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      // Italic
      .replace(/\*(.+?)\*/g, '<i>$1</i>')
      // Numbered list items (with sub-items via indentation)
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      // Bullet list items (with sub-items via indentation)
      .replace(/^   - (.+)$/gm, '<li style="margin-left:20px">$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      // Wrap consecutive <li> in <ul>
      .replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
      // Line breaks: two trailing spaces or blank lines become breaks
      .replace(/  $/gm, '<br/>')
      // Paragraphs: wrap remaining non-tag lines
      .replace(/^(?!<[huo1-9lr])((?!<).+)$/gm, '<p>$1</p>');

    return html;
  };

  const downloadRequest = () => {
    const markdownContent = generateRequest();
    const bodyHtml = markdownToHtml(markdownContent);

    const wordDoc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Public Records Request</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #222; max-width: 7in; margin: 0 auto; }
  h1 { font-size: 18pt; margin-top: 12pt; margin-bottom: 6pt; }
  h2 { font-size: 14pt; margin-top: 12pt; margin-bottom: 6pt; }
  h3 { font-size: 12pt; margin-top: 10pt; margin-bottom: 4pt; }
  p { margin: 6pt 0; }
  ul { margin: 6pt 0; padding-left: 20pt; }
  li { margin: 3pt 0; }
  hr { border: none; border-top: 1px solid #999; margin: 12pt 0; }
  b { font-weight: bold; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

    const blob = new Blob([wordDoc], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Public_Records_Request_${formData.selectedAgency?.City}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isEmailAddress = (str) => str && str.includes('@') && !str.startsWith('http');

  const sendViaEmail = () => {
    const subject = encodeURIComponent(
      `Public Records Request - Surveillance Camera Systems - ${formData.agencyName}`
    );
    const plainText = generateRequest();
    const truncated = plainText.length > 1800
      ? plainText.substring(0, 1800) + '\n\n--- Full request attached as Word document ---'
      : plainText;
    const body = encodeURIComponent(truncated);
    window.location.href = `mailto:${formData.agencyEmail}?subject=${subject}&body=${body}`;
  };

  const isStepComplete = (step) => {
    switch(step) {
      case 1:
        return formData.selectedAgency && formData.agencyName && formData.agencyEmail;
      case 2:
        return formData.userName && formData.userEmail;
      case 3:
        return formData.requestAllLocations || formData.cameraLocations.some(loc => loc.trim());
      case 4:
        return true; // Options are all optional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Public Records Request Wizard</h1>
          <p className="text-gray-300">Create your customized surveillance camera records request</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${currentStep === step ? 'bg-blue-500 text-white' : 
                    currentStep > step ? 'bg-green-500 text-white' : 
                    'bg-gray-700 text-gray-400'}
                `}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div className={`h-1 w-16 mx-2 ${currentStep > step ? 'bg-green-500' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Agency</span>
            <span>Your Info</span>
            <span>Cameras</span>
            <span>Options</span>
            <span>Review</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-800 rounded-xl p-8 min-h-[500px]">
          {/* Step 1: Agency Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2" />
                Select Your Agency
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Agency Type</label>
                <select
                  value={formData.agencyType}
                  onChange={(e) => updateFormData('agencyType', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Police Department">Police Department</option>
                  <option value="Sheriff's Office">Sheriff's Office</option>
                  <option value="City/Town">City/Town (General)</option>
                </select>
              </div>

              {formData.agencyType === 'Police Department' && (
                <div className="mb-6 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-300">
                      Some smaller municipalities may not have their own police department and are served by the county sheriff's office. If you don't find your city listed or know it doesn't have a PD, switch to "Sheriff's Office" above to find the county contact.
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  {formData.agencyType === "Sheriff's Office" ? 'Search for Your County' : 'Search for Your City or County'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={formData.agencyType === "Sheriff's Office" ? "Type to search (e.g., 'Thurston', 'King')..." : "Type to search (e.g., 'Olympia', 'Thurston County')..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {searchTerm && (
                <div className="mb-6 max-h-64 overflow-y-auto bg-slate-700 rounded-lg border border-slate-600">
                  {filteredAgencies.length > 0 ? (
                    filteredAgencies.map((agency, index) => (
                      <button
                        key={index}
                        onClick={() => handleAgencySelect(agency)}
                        className={`
                          w-full text-left px-4 py-3 hover:bg-slate-600 transition
                          ${formData.selectedAgency?.City === agency.City && formData.selectedAgency?.County === agency.County ? 'bg-blue-600' : ''}
                        `}
                      >
                        <div className="font-semibold">
                          {formData.agencyType === "Sheriff's Office" ? `${agency.County} County` : agency.City}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formData.agencyType === "Sheriff's Office"
                            ? 'County Public Records Contact'
                            : `${agency.County} County • ${agency.Notes}`}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{agency.Email}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-400">
                      No agencies found. Try a different search term.
                    </div>
                  )}
                </div>
              )}

              {formData.selectedAgency && (
                <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-green-400 mb-2">Selected Agency</div>
                      <div className="space-y-1 text-sm">
                        <div><strong>Agency:</strong> {formData.agencyName}</div>
                        <div><strong>Email:</strong> {formData.agencyEmail}</div>
                        {formData.agencyPortal && (
                          <div>
                            <strong>Portal:</strong>{' '}
                            <a href={formData.agencyPortal} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                              {formData.agencyPortal}
                            </a>
                          </div>
                        )}
                        <div><strong>Location:</strong> {formData.selectedAgency.City}, {formData.selectedAgency.County} County</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isSmallTownEntry && countySheriffEntry && (
                <div className="mt-4 bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-400 mb-1">Small municipality detected</div>
                      <div className="text-sm text-gray-300 mb-3">
                        {formData.selectedAgency.City} may not have its own police department. You may also want to send a request to the {formData.selectedAgency.County} County Sheriff's Office.
                      </div>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFormData({
                            ...formData,
                            agencyType: "Sheriff's Office",
                            selectedAgency: countySheriffEntry,
                            agencyName: `${countySheriffEntry.County} County Sheriff's Office`,
                            agencyEmail: countySheriffEntry.Email,
                            agencyPortal: countySheriffEntry['Portal URL'] || '',
                          });
                        }}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-semibold transition"
                      >
                        Switch to {formData.selectedAgency.County} County Sheriff's Office
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Your Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2" />
                Your Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={formData.userName}
                    onChange={(e) => updateFormData('userName', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jane.smith@email.com"
                    value={formData.userEmail}
                    onChange={(e) => updateFormData('userEmail', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(360) 555-1234"
                    value={formData.userPhone}
                    onChange={(e) => updateFormData('userPhone', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Mailing Address (Optional)
                  </label>
                  <textarea
                    placeholder="123 Main St, Olympia, WA 98501"
                    value={formData.userAddress}
                    onChange={(e) => updateFormData('userAddress', e.target.value)}
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    Your contact information will be included in the public records request so the agency can respond to you. 
                    Email is preferred as it creates an automatic paper trail.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Camera Locations */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                Camera Locations
              </h2>

              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requestAllLocations}
                    onChange={(e) => updateFormData('requestAllLocations', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-semibold">Request ALL surveillance camera locations</span>
                </label>
                <p className="text-sm text-gray-400 ml-8 mt-1">
                  Recommended if you don't know specific camera locations. The agency will provide a complete inventory.
                </p>
              </div>

              {!formData.requestAllLocations && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Specific Camera Locations (Optional)
                  </label>
                  <p className="text-sm text-gray-400 mb-4">
                    Add specific camera locations if you know them. You can leave this blank to request all locations.
                  </p>
                  
                  {formData.cameraLocations.map((location, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="e.g., 4th Ave & Capitol Way, or 'Main Street entrance'"
                        value={location}
                        onChange={(e) => updateCameraLocation(index, e.target.value)}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.cameraLocations.length > 1 && (
                        <button
                          onClick={() => removeCameraLocation(index)}
                          className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={addCameraLocation}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm"
                  >
                    + Add Another Location
                  </button>
                </div>
              )}

              <div className="mt-6 bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-yellow-400 mb-1">How to find cameras in your area:</div>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Look for small square boxes on poles at intersections</li>
                      <li>Check local news for reports of camera installations</li>
                      <li>Search "[Your City] Flock cameras" or "[Your City] ALPR"</li>
                      <li>Attend city council meetings or check meeting minutes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Options */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Request Options
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Template Type</label>
                  <div className="space-y-2">
                    <label className="flex items-start space-x-3 cursor-pointer p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                      <input
                        type="radio"
                        value="simplified"
                        checked={formData.templateType === 'simplified'}
                        onChange={(e) => updateFormData('templateType', e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Simplified Template (Recommended)</div>
                        <div className="text-sm text-gray-400">2 pages, covers essential information, perfect for first-time requesters</div>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                      <input
                        type="radio"
                        value="comprehensive"
                        checked={formData.templateType === 'comprehensive'}
                        onChange={(e) => updateFormData('templateType', e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Comprehensive Template</div>
                        <div className="text-sm text-gray-400">6 pages, detailed investigation, for journalists or follow-up requests</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Date Range for Records</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="inception"
                        checked={formData.dateRangeType === 'inception'}
                        onChange={(e) => updateFormData('dateRangeType', e.target.value)}
                      />
                      <span>All records from program inception to present</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="recent"
                        checked={formData.dateRangeType === 'recent'}
                        onChange={(e) => updateFormData('dateRangeType', e.target.value)}
                      />
                      <span>January 1, 2024 to present</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="specific"
                        checked={formData.dateRangeType === 'specific'}
                        onChange={(e) => updateFormData('dateRangeType', e.target.value)}
                      />
                      <span>Specific date range:</span>
                    </label>
                    {formData.dateRangeType === 'specific' && (
                      <div className="ml-8 flex gap-4">
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData('startDate', e.target.value)}
                          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                        />
                        <span className="self-center">to</span>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => updateFormData('endDate', e.target.value)}
                          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Options</label>
                  <div className="space-y-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.includeAuditLogs}
                        onChange={(e) => updateFormData('includeAuditLogs', e.target.checked)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Include Network Audit Logs</div>
                        <div className="text-sm text-gray-400">Shows who searched the data and why (highly recommended)</div>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.includeFederalAccess}
                        onChange={(e) => updateFormData('includeFederalAccess', e.target.checked)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Request Federal Agency Access Records</div>
                        <div className="text-sm text-gray-400">Important given recent UW report findings</div>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requestFeeWaiver}
                        onChange={(e) => updateFormData('requestFeeWaiver', e.target.checked)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Request Fee Waiver</div>
                        <div className="text-sm text-gray-400">Argue that disclosure is in the public interest</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Download */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Check className="w-6 h-6 mr-2" />
                Review & Download
              </h2>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-2">Agency Information</div>
                  <div className="text-sm space-y-1">
                    <div><strong>Agency:</strong> {formData.agencyName}</div>
                    <div><strong>Email:</strong> {formData.agencyEmail}</div>
                    <div><strong>Location:</strong> {formData.selectedAgency?.City}, {formData.selectedAgency?.County} County</div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-2">Your Information</div>
                  <div className="text-sm space-y-1">
                    <div><strong>Name:</strong> {formData.userName}</div>
                    <div><strong>Email:</strong> {formData.userEmail}</div>
                    {formData.userPhone && <div><strong>Phone:</strong> {formData.userPhone}</div>}
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-2">Request Details</div>
                  <div className="text-sm space-y-1">
                    <div><strong>Template:</strong> {formData.templateType === 'simplified' ? 'Simplified (2 pages)' : 'Comprehensive (6 pages)'}</div>
                    <div><strong>Camera Locations:</strong> {formData.requestAllLocations ? 'All locations' : `${formData.cameraLocations.filter(l => l.trim()).length} specific location(s)`}</div>
                    <div><strong>Date Range:</strong> {
                      formData.dateRangeType === 'inception' ? 'From inception to present' :
                      formData.dateRangeType === 'recent' ? 'January 1, 2024 to present' :
                      `${formData.startDate} to ${formData.endDate}`
                    }</div>
                    <div><strong>Audit Logs:</strong> {formData.includeAuditLogs ? 'Yes' : 'No'}</div>
                    <div><strong>Federal Access:</strong> {formData.includeFederalAccess ? 'Yes' : 'No'}</div>
                    <div><strong>Fee Waiver:</strong> {formData.requestFeeWaiver ? 'Requested' : 'Not requested'}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={downloadRequest}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Your Request
                </button>

                {isEmailAddress(formData.agencyEmail) ? (
                  <button
                    onClick={sendViaEmail}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send via Email to {formData.agencyName}
                  </button>
                ) : formData.agencyPortal ? (
                  <a
                    href={formData.agencyPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Open Records Portal for {formData.agencyName}
                  </a>
                ) : null}

                {isEmailAddress(formData.agencyEmail) && (
                  <p className="text-xs text-gray-400 text-center -mt-2">
                    Opens your email app with the request pre-filled. Attach the downloaded Word document for best results.
                  </p>
                )}

                <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-2">Next Steps:</div>
                  <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                    <li>Download your customized request using the button above</li>
                    {isEmailAddress(formData.agencyEmail) ? (
                      <li>Click "Send via Email" or open your email app manually</li>
                    ) : (
                      <li>Open the .doc file in Word, Google Docs, or LibreOffice</li>
                    )}
                    <li>Review the document and make any final adjustments</li>
                    <li>Submit to: <span className="font-mono text-blue-400">{formData.agencyEmail}</span></li>
                    <li>Keep a copy for your records and note the submission date</li>
                    <li>The agency must respond within 5 business days</li>
                  </ol>
                </div>

                <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-semibold text-green-400 mb-1">Your request is ready!</div>
                      <div className="text-gray-300">
                        You've successfully created a professional public records request based on the November 2025 
                        Skagit County court ruling. Your request helps ensure transparency and accountability in 
                        surveillance technology use in Washington State.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              px-6 py-3 rounded-lg font-semibold transition flex items-center
              ${currentStep === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'}
            `}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepComplete(currentStep)}
              className={`
                px-6 py-3 rounded-lg font-semibold transition flex items-center
                ${!isStepComplete(currentStep)
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Step {currentStep} of 5
          {!isStepComplete(currentStep) && currentStep < 5 && (
            <span className="ml-2 text-yellow-400">• Complete required fields to continue</span>
          )}
        </div>
      </div>
    </div>
  );
}
