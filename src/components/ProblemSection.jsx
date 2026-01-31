import React from 'react';
import { Camera, AlertCircle, Shield, XCircle, ChevronDown } from 'lucide-react';

export default function ProblemSection({ scrollToSection }) {
  return (
    <section id="problem" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">The Problem</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-slate-800 p-8 rounded-xl border-2 border-red-500">
            <Camera className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Mass Surveillance Without Oversight</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-2 mt-1 flex-shrink-0" />
                <span>Cameras photograph EVERY vehicle that passes, not just suspects</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-2 mt-1 flex-shrink-0" />
                <span>Data stored for weeks or months, tracking your movements</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-2 mt-1 flex-shrink-0" />
                <span>No warrant required to collect or search this data</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-2 mt-1 flex-shrink-0" />
                <span>Communities often unaware cameras exist</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl border-2 border-orange-500">
            <AlertCircle className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Unauthorized Federal Access</h3>
            <p className="text-gray-300 mb-4">
              A University of Washington report (October 2025) revealed shocking findings:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong>8 WA agencies</strong> directly shared data with Border Patrol</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong>10+ agencies</strong> had "back door" federal access without knowledge</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                <span>Data used to track <strong>abortion seekers</strong> and <strong>immigrants</strong></span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                <span>Auburn & Lakewood were <strong>unaware</strong> and revoked access</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-red-900 to-orange-900 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            Washington's Shield Law Being Violated
          </h3>
          <p className="text-lg text-gray-200">
            Washington State law (RCW 10.93.160) <strong>prohibits</strong> the use of surveillance systems for civil immigration enforcement.
            Yet federal agencies accessed local surveillance data, potentially violating state law and putting vulnerable communities at risk.
          </p>
        </div>

        <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-xl border border-purple-500">
          <h3 className="text-2xl font-bold mb-4">Beyond Cameras: The Full Surveillance Ecosystem</h3>
          <p className="text-lg text-gray-200 mb-4">
            License plate readers are just one piece of a much larger surveillance infrastructure. Data brokers sell your
            location history to ICE. Cell-site simulators intercept your phone calls. Facial recognition systems track you
            in public spaces. Social media monitoring tools map your relationships. Together, these technologies create an
            interconnected web of surveillance operating at every level of government &mdash; often with corporate America's help.
          </p>
          <button
            onClick={() => scrollToSection('surveillance-tech')}
            className="text-purple-300 hover:text-white font-semibold flex items-center transition"
          >
            Explore the technologies below
            <ChevronDown className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
