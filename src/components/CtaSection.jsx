import React from 'react';
import { Download, Share2 } from 'lucide-react';

export default function CtaSection({ downloadAllFiles, shareThisCampaign }) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Demand Transparency?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Join hundreds of Washington residents who are exercising their rights and demanding
          accountability for all forms of government and corporate surveillance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadAllFiles}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            <Download className="inline w-5 h-5 mr-2" />
            Get the Toolkit
          </button>
          <button
            onClick={shareThisCampaign}
            className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition"
          >
            <Share2 className="inline w-5 h-5 mr-2" />
            Share This Campaign
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-300">
          <p>
            Questions? Email us at{' '}
            <a href="mailto:wasurveillancewatch@proton.me" className="text-blue-300 hover:text-white underline transition">
              wasurveillancewatch@proton.me
            </a>
            {' '}or contact the ACLU of Washington.
          </p>
        </div>
      </div>
    </section>
  );
}
