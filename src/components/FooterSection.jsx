import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
        <p className="mb-2">
          This campaign provides information and tools for exercising your rights under Washington's Public Records Act (RCW 42.56)
          and for understanding the full scope of government and corporate surveillance technologies.
        </p>
        <p className="mb-4">
          Not legal advice. For specific legal guidance, consult an attorney.
        </p>

        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:wasurveillancewatch@proton.me"
            className="text-blue-400 hover:text-blue-300 flex items-center transition"
          >
            <Mail className="w-4 h-4 mr-1" />
            wasurveillancewatch@proton.me
          </a>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="flex items-center gap-3">
            <a
              href="mailto:wasurveillancewatch@proton.me?subject=Feature%20Request%20-%20WA%20Surveillance%20Watch"
              className="text-gray-400 hover:text-gray-300 flex items-center transition"
            >
              <Mail className="w-3 h-3 mr-1" />
              Suggest a Feature
            </a>
            <a
              href="https://github.com/jeff-is-working/surveillance-watch/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 flex items-center transition"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Report an Issue
            </a>
          </span>
        </div>

        <p className="text-xs text-gray-500">
          Based on Rodriguez v. City of Sedro Woolley (Nov 2025) and UW Center for Human Rights Report (Oct 2025)
        </p>
      </div>
    </footer>
  );
}
