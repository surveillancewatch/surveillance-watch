import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function VictorySection() {
  return (
    <section id="victory" className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-green-400 text-green-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            LANDMARK VICTORY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Court Rules: Surveillance Data Is Public Record
          </h2>
          <p className="text-xl text-gray-200">
            November 2025 - Skagit County Superior Court
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">What Happened</h3>
              <p className="text-gray-200 mb-4">
                Jose Rodriguez, a tattoo artist, filed public records requests with dozens of Washington agencies
                seeking surveillance camera images. When two cities sued to block his requests, Judge Elizabeth
                Yost Neidzwski ruled decisively:
              </p>
              <div className="bg-green-800 bg-opacity-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="italic text-lg">
                  "The Flock data do qualify as public records subject to the Public Records Act."
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Why It Matters</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Surveillance that is "broad and indiscriminate" MUST be disclosed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Privacy arguments rejected by the court</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Affects dozens of WA police departments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Both cities turned off cameras after losing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>You now have legal precedent to demand transparency</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
