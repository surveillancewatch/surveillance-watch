import React from 'react';
import { FileText, ChevronDown, Download, Users } from 'lucide-react';

export default function TakeActionSection({ activeTab, setActiveTab, setShowWizard, downloadAllFiles, toolkitFiles }) {
  return (
    <section id="action" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Take Action Now</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We've created a complete toolkit to help you demand transparency from your local police department.
            Everything you need is here, ready to use.
          </p>
        </div>

        {/* Wizard Promotion Box */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-xl border-2 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 p-3 rounded-lg">
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold">Interactive Request Builder</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">NEW!</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Our new step-by-step wizard makes it even easier! Search from 253 Washington agencies,
                  autofill contact information, and generate your custom request in 5-10 minutes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <span className="bg-purple-700 px-3 py-1 rounded-full">&#10003; Auto-fill contacts</span>
                  <span className="bg-purple-700 px-3 py-1 rounded-full">&#10003; Step-by-step guidance</span>
                  <span className="bg-purple-700 px-3 py-1 rounded-full">&#10003; 253 agencies included</span>
                  <span className="bg-purple-700 px-3 py-1 rounded-full">&#10003; Ready in minutes</span>
                </div>
                <button
                  onClick={() => setShowWizard(true)}
                  className="bg-white text-purple-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 flex items-center"
                >
                  Launch Interactive Wizard
                  <ChevronDown className="w-5 h-5 ml-2 transform rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['overview', 'templates', 'guides', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {tab === 'overview' ? 'Overview' : tab === 'templates' ? 'Templates' : tab === 'guides' ? 'How-To Guides' : 'Local Contacts'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-slate-800 p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-6">Quick Start - 3 Steps to Transparency</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Download the Template</h4>
                    <p className="text-gray-300">
                      Choose the Simplified Template (recommended for beginners) or Comprehensive Template (for detailed investigation).
                      Both are fully compliant with Washington State law.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Fill in the Blanks</h4>
                    <p className="text-gray-300">
                      Replace the [BRACKETED] items with your information and the camera locations in your area.
                      Takes about 15 minutes. Our guide walks you through every step.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Submit & Follow Up</h4>
                    <p className="text-gray-300">
                      Email your request to your local police department. They must respond within 5 business days.
                      Use our email templates for any follow-up needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-500">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Total Time Investment
                </h4>
                <p className="text-lg">
                  <strong className="text-blue-300">About 1 hour</strong> for your first request.
                  You'll get faster with practice. Many people have successfully done this!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Simplified Template</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">RECOMMENDED</span>
                </div>
                <p className="text-gray-300 mb-4">
                  2 pages with essential information. Perfect for first-time requesters.
                  Covers all surveillance technologies and includes the court ruling.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-400">
                  <li>+ Camera locations & contracts</li>
                  <li>+ Policies & data sharing</li>
                  <li>+ Federal access records</li>
                  <li>+ Network audit logs</li>
                </ul>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/flock_camera_records_request_SIMPLIFIED.docx"}
                  download="Surveillance_Camera_Request_SIMPLIFIED.docx"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Simplified Template
                </a>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border-2 border-purple-500">
                <h3 className="text-2xl font-bold mb-4">Comprehensive Template</h3>
                <p className="text-gray-300 mb-4">
                  6 pages with detailed investigation items. For journalists, researchers,
                  or follow-up requests. Covers 8 detailed record categories.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-400">
                  <li>+ Everything in Simplified, plus:</li>
                  <li>+ Technical specifications</li>
                  <li>+ Training materials</li>
                  <li>+ Extensive correspondence</li>
                  <li>+ Financial analyses</li>
                </ul>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/flock_camera_records_request_template.docx"}
                  download="Surveillance_Camera_Request_COMPREHENSIVE.docx"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Comprehensive Template
                </a>
              </div>

              <div className="md:col-span-2 bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Complete Toolkit (All Files)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">Request Templates:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>- Simplified Template</li>
                      <li>- Comprehensive Template</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Guides & Resources:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>- Complete How-To Guide</li>
                      <li>- Quick Start One-Page Guide</li>
                      <li>- Legal Context Document</li>
                      <li>- Email Templates (10 scenarios)</li>
                      <li>- Quick Reference Guide</li>
                      <li>- Master Toolkit Index</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={downloadAllFiles}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center"
                >
                  <Download className="w-6 h-6 mr-2" />
                  Download Complete Toolkit (All Files)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">&#128214; Complete How-To Guide</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Step-by-step walkthrough with 7 detailed steps, troubleshooting, and Thurston County contacts.
                </p>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/HOW_TO_GUIDE_public_records_requests.pdf"}
                  download="How_To_Guide.pdf"
                  className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Guide
                </a>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">&#9889; Quick Start Guide</h3>
                <p className="text-gray-300 text-sm mb-4">
                  One-page printable reference card. Get started in 5 minutes.
                </p>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/QUICK_START_one_page_guide.pdf"}
                  download="Quick_Start_Guide.pdf"
                  className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </a>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">&#9878;&#65039; Legal Context Document</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Deep dive into court ruling, UW report, and how to cite precedent in appeals.
                </p>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/LEGAL_CONTEXT_surveillance_cameras.pdf"}
                  download="Legal_Context.pdf"
                  className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Document
                </a>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">&#128231; Email Templates</h3>
                <p className="text-gray-300 text-sm mb-4">
                  10 ready-to-use templates for submission, follow-ups, appeals, and more.
                </p>
                <a
                  href={import.meta.env.BASE_URL + "Template_download/EMAIL_TEMPLATES_all_scenarios.docx"}
                  download="Email_Templates.docx"
                  className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Templates
                </a>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-slate-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Thurston County Area Contacts</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3">City of Olympia</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> publicrecords@olympiawa.gov</p>
                    <p><strong>Phone:</strong> (360) 753-8300</p>
                    <p className="text-gray-400">Olympia Police Department</p>
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3">City of Lacey</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> publicrecords@cityoflacey.org</p>
                    <p><strong>Phone:</strong> (360) 459-4333</p>
                    <p className="text-gray-400">Lacey Police Department</p>
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3">City of Tumwater</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> publicrecords@ci.tumwater.wa.us</p>
                    <p><strong>Phone:</strong> (360) 754-4200</p>
                    <p className="text-gray-400">Tumwater Police Department</p>
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3">Thurston County</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> publicrecords@co.thurston.wa.us</p>
                    <p><strong>Phone:</strong> (360) 786-5500</p>
                    <p className="text-gray-400">Sheriff's Office</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-50 p-6 rounded-lg border border-blue-500">
                <h4 className="font-bold mb-3">Finding Contacts for Other Cities</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Search online for: "[City Name] Police public records" or call your city hall and ask:
                  "What's the best way to submit a public records request?"
                </p>
                <p className="text-sm text-gray-400">
                  The Complete How-To Guide includes contact information for major Washington cities and counties.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
