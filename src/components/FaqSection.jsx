import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';

export default function FaqSection({ expandedFaq, setExpandedFaq }) {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-750 transition"
              >
                <span className="font-semibold pr-8">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    expandedFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
