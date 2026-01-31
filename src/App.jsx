import React, { useState } from 'react';
import FormWizard from './FormWizard';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import ProblemSection from './components/ProblemSection';
import SurveillanceTechSection from './components/SurveillanceTechSection';
import VictorySection from './components/VictorySection';
import TakeActionSection from './components/TakeActionSection';
import ResourcesSection from './components/ResourcesSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import FooterSection from './components/FooterSection';
import GetInvolvedSection from './components/GetInvolvedSection';
import DownloadModal from './components/DownloadModal';

export default function SurveillanceAwarenessPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toolkitFiles = [
    { name: 'Simplified Template', path: import.meta.env.BASE_URL + 'Template_download/flock_camera_records_request_SIMPLIFIED.docx', filename: 'Simplified_Template.docx' },
    { name: 'Comprehensive Template', path: import.meta.env.BASE_URL + 'Template_download/flock_camera_records_request_template.docx', filename: 'Comprehensive_Template.docx' },
    { name: 'Complete How-To Guide', path: import.meta.env.BASE_URL + 'Template_download/HOW_TO_GUIDE_public_records_requests.pdf', filename: 'How_To_Guide.pdf' },
    { name: 'Quick Start Guide', path: import.meta.env.BASE_URL + 'Template_download/QUICK_START_one_page_guide.pdf', filename: 'Quick_Start_Guide.pdf' },
    { name: 'Legal Context Document', path: import.meta.env.BASE_URL + 'Template_download/LEGAL_CONTEXT_surveillance_cameras.pdf', filename: 'Legal_Context.pdf' },
    { name: 'Email Templates', path: import.meta.env.BASE_URL + 'Template_download/EMAIL_TEMPLATES_all_scenarios.docx', filename: 'Email_Templates.docx' },
    { name: 'Quick Reference', path: import.meta.env.BASE_URL + 'Template_download/QUICK_REFERENCE_surveillance_requests.pdf', filename: 'Quick_Reference.pdf' },
    { name: 'Toolkit Index', path: import.meta.env.BASE_URL + 'Template_download/TOOLKIT_INDEX_master_guide.pdf', filename: 'Toolkit_Index.pdf' },
    { name: 'Phone Call Script', path: import.meta.env.BASE_URL + 'Template_download/PHONE_CALL_SCRIPT_elected_officials.docx', filename: 'Phone_Call_Script.docx' },
    { name: 'Email to Elected Officials', path: import.meta.env.BASE_URL + 'Template_download/EMAIL_TO_ELECTED_OFFICIALS.docx', filename: 'Email_To_Elected_Officials.docx' },
    { name: 'Public Meeting Talking Points', path: import.meta.env.BASE_URL + 'Template_download/PUBLIC_MEETING_TALKING_POINTS.docx', filename: 'Public_Meeting_Talking_Points.docx' },
    { name: 'Facial Recognition Request', path: import.meta.env.BASE_URL + 'Template_download/RECORDS_REQUEST_facial_recognition.docx', filename: 'Facial_Recognition_Request.docx' },
    { name: 'Cell-Site Simulator Request', path: import.meta.env.BASE_URL + 'Template_download/RECORDS_REQUEST_cell_site_simulators.docx', filename: 'Cell_Site_Simulator_Request.docx' },
    { name: 'Data Broker Request', path: import.meta.env.BASE_URL + 'Template_download/RECORDS_REQUEST_data_brokers.docx', filename: 'Data_Broker_Request.docx' },
    { name: 'Social Media Monitoring Request', path: import.meta.env.BASE_URL + 'Template_download/RECORDS_REQUEST_social_media_monitoring.docx', filename: 'Social_Media_Monitoring_Request.docx' },
    { name: 'Comprehensive Omnibus Request', path: import.meta.env.BASE_URL + 'Template_download/RECORDS_REQUEST_comprehensive_omnibus.docx', filename: 'Comprehensive_Omnibus_Request.docx' },
    { name: 'Federal Privacy Advocacy Letter', path: import.meta.env.BASE_URL + 'Template_download/ADVOCACY_LETTER_federal_privacy_law.docx', filename: 'Federal_Privacy_Advocacy_Letter.docx' },
    { name: 'State Privacy Advocacy Letter', path: import.meta.env.BASE_URL + 'Template_download/ADVOCACY_LETTER_state_privacy_law.docx', filename: 'State_Privacy_Advocacy_Letter.docx' },
    { name: 'Local Surveillance Ordinance Letter', path: import.meta.env.BASE_URL + 'Template_download/ADVOCACY_LETTER_local_surveillance_ordinance.docx', filename: 'Local_Surveillance_Ordinance_Letter.docx' }
  ];

  const downloadAllFiles = () => {
    setShowDownloadModal(true);
  };

  const shareThisCampaign = async () => {
    const shareData = {
      title: 'WA Surveillance Watch',
      text: 'Demand transparency on government and corporate surveillance in Washington State. Get free templates to file public records requests.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share it with others to spread awareness.');
      } catch (err) {
        prompt('Copy this link to share:', window.location.href);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <HeroSection scrollToSection={scrollToSection} setShowWizard={setShowWizard} />
      <StatsBar />
      <ProblemSection scrollToSection={scrollToSection} />
      <SurveillanceTechSection />
      <VictorySection />
      <TakeActionSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowWizard={setShowWizard}
        downloadAllFiles={downloadAllFiles}
        toolkitFiles={toolkitFiles}
      />
      <ResourcesSection />
      <GetInvolvedSection scrollToSection={scrollToSection} shareThisCampaign={shareThisCampaign} />
      <FaqSection expandedFaq={expandedFaq} setExpandedFaq={setExpandedFaq} />
      <CtaSection downloadAllFiles={downloadAllFiles} shareThisCampaign={shareThisCampaign} />
      <FooterSection />

      {showDownloadModal && (
        <DownloadModal
          toolkitFiles={toolkitFiles}
          onClose={() => setShowDownloadModal(false)}
        />
      )}

      {showWizard && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90"
          onClick={() => setShowWizard(false)}
        >
          <div className="min-h-screen p-4">
            <button
              onClick={() => setShowWizard(false)}
              className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold z-50 shadow-lg transition"
            >
              &#10005; Close Wizard
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <FormWizard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
