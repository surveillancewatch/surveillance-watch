import React from 'react';
import { Phone, MessageSquare, Share2, FileText, ExternalLink, Download } from 'lucide-react';

export default function GetInvolvedSection({ scrollToSection, shareThisCampaign }) {
  return (
    <section id="get-involved" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Filing records requests is just the start. Here are more ways to push back
            against unchecked surveillance in your community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Contact Elected Officials */}
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition">
            <Phone className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Contact Your Elected Officials</h3>
            <p className="text-gray-300 text-sm mb-4">
              Your state legislators and city council members have the power to pass surveillance oversight
              laws, audit existing contracts, and require transparency. A single phone call or email from
              a constituent makes a real difference.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">&#8226;</span>
                Call your state legislator about surveillance oversight legislation
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">&#8226;</span>
                Ask your city council to audit local surveillance contracts
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">&#8226;</span>
                Request a local surveillance oversight ordinance
              </li>
            </ul>
            <div className="flex flex-col space-y-2">
              <a
                href="https://5calls.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center transition"
              >
                Find your federal reps on 5Calls.org
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <a
                href="https://app.leg.wa.gov/districtfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center transition"
              >
                Find your WA state legislators
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <a
                href={import.meta.env.BASE_URL + 'Template_download/PHONE_CALL_SCRIPT_elected_officials.docx'}
                download="Phone_Call_Script.docx"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center transition"
              >
                <Download className="w-4 h-4 mr-1" />
                Download Phone Call Script
              </a>
              <a
                href={import.meta.env.BASE_URL + 'Template_download/EMAIL_TO_ELECTED_OFFICIALS.docx'}
                download="Email_To_Elected_Officials.docx"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center transition"
              >
                <Download className="w-4 h-4 mr-1" />
                Download Email Templates
              </a>
            </div>
          </div>

          {/* Card 2: Make Public Comment */}
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition">
            <MessageSquare className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Make Public Comment</h3>
            <p className="text-gray-300 text-sm mb-4">
              City council and county commission meetings include a public comment period.
              Speaking up puts surveillance issues on the public record and pressures officials
              to act.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">&#8226;</span>
                Keep comments to 2-3 minutes &mdash; be concise and specific
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">&#8226;</span>
                Cite the Rodriguez v. Sedro Woolley ruling and UW report
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">&#8226;</span>
                Ask a specific question: "Does our city use Flock cameras?"
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">&#8226;</span>
                Bring others &mdash; numbers demonstrate community concern
              </li>
            </ul>
            <div className="flex flex-col space-y-2">
              <a
                href={import.meta.env.BASE_URL + 'Template_download/PUBLIC_MEETING_TALKING_POINTS.docx'}
                download="Public_Meeting_Talking_Points.docx"
                className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center transition"
              >
                <Download className="w-4 h-4 mr-1" />
                Download Talking Points
              </a>
              <p className="text-xs text-gray-500">
                Check your city's website for meeting schedules and how to sign up to speak.
              </p>
            </div>
          </div>

          {/* Card 3: Spread the Word */}
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-green-500 transition">
            <Share2 className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Spread the Word</h3>
            <p className="text-gray-300 text-sm mb-4">
              Most people have no idea how pervasive government surveillance has become.
              Share this site and its resources to help others learn about and push back
              against unchecked surveillance in their communities.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">&#8226;</span>
                Share on social media with your local community groups
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">&#8226;</span>
                Forward templates to friends and neighbors
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">&#8226;</span>
                Bring it up at neighborhood meetings and community events
              </li>
            </ul>
            <button
              onClick={shareThisCampaign}
              className="text-green-400 hover:text-green-300 text-sm font-semibold flex items-center transition"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share This Campaign
            </button>
          </div>

          {/* Card 4: File a Records Request */}
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-yellow-500 transition">
            <FileText className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">File a Records Request</h3>
            <p className="text-gray-300 text-sm mb-4">
              Every public records request increases transparency. When agencies know the public
              is watching, they're more likely to follow the law. Use our templates and wizard to
              file your own request &mdash; it's your right and it matters.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">&#8226;</span>
                Use the Interactive Wizard for a guided experience
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">&#8226;</span>
                Download templates covering 7+ surveillance technologies
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">&#8226;</span>
                Share your results to help others understand what's happening
              </li>
            </ul>
            <button
              onClick={() => scrollToSection('action')}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold flex items-center transition"
            >
              Go to Take Action
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
