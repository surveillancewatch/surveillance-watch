import React from 'react';
import { Eye, FileText, ChevronDown } from 'lucide-react';

export default function HeroSection({ scrollToSection, setShowWizard }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(74, 144, 226, 0.3), transparent 50%)'
      }}></div>

      <nav className="relative z-10 container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Eye className="w-8 h-8 text-red-400" />
          <span className="text-xl font-bold">WA Surveillance Watch</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => scrollToSection('problem')} className="hover:text-blue-300 transition">The Issue</button>
          <button onClick={() => scrollToSection('surveillance-tech')} className="hover:text-blue-300 transition">Surveillance Tech</button>
          <button onClick={() => scrollToSection('victory')} className="hover:text-blue-300 transition">Recent Victory</button>
          <a href="/tacoma-stingray-report.html" className="hover:text-blue-300 transition">Reports</a>
          <button onClick={() => scrollToSection('action')} className="hover:text-blue-300 transition">Take Action</button>
          <button onClick={() => scrollToSection('resources')} className="hover:text-blue-300 transition">Resources</button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl">
          <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            BREAKING: Court Rules Surveillance Data Must Be Public
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your City Is Watching.<br />
            <span className="text-blue-300">Are You Watching Back?</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            From license plate readers to facial recognition to data brokers &mdash; government and corporate
            surveillance is everywhere. Without oversight. Without transparency. Until now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowWizard(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Interactive Wizard
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">NEW</span>
            </button>
            <button
              onClick={() => scrollToSection('action')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Get the Templates
            </button>
            <button
              onClick={() => scrollToSection('problem')}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </header>
  );
}
