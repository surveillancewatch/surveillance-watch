import React from 'react';

export default function StatsBar() {
  return (
    <section className="bg-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">80+</div>
            <div className="text-gray-400">WA Cities Using ALPR</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400 mb-2">7+</div>
            <div className="text-gray-400">Surveillance Technologies in Use</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">18+</div>
            <div className="text-gray-400">Agencies With Federal Access</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">$Billions</div>
            <div className="text-gray-400">Spent on Data Broker Contracts</div>
          </div>
        </div>
      </div>
    </section>
  );
}
