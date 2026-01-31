import React, { useState } from 'react';
import {
  Database,
  Smartphone,
  Camera,
  Eye,
  Share2,
  MapPin,
  Activity,
  ChevronDown,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { SURVEILLANCE_TECHNOLOGIES } from '../data/surveillanceTechData';

const ICON_MAP = {
  Database,
  Smartphone,
  Camera,
  Eye,
  Share2,
  MapPin,
  Activity,
};

const COLOR_MAP = {
  red: { border: 'border-red-500', icon: 'text-red-400', badge: 'bg-red-900 text-red-200', bullet: 'text-red-400' },
  orange: { border: 'border-orange-500', icon: 'text-orange-400', badge: 'bg-orange-900 text-orange-200', bullet: 'text-orange-400' },
  blue: { border: 'border-blue-500', icon: 'text-blue-400', badge: 'bg-blue-900 text-blue-200', bullet: 'text-blue-400' },
  purple: { border: 'border-purple-500', icon: 'text-purple-400', badge: 'bg-purple-900 text-purple-200', bullet: 'text-purple-400' },
  cyan: { border: 'border-cyan-500', icon: 'text-cyan-400', badge: 'bg-cyan-900 text-cyan-200', bullet: 'text-cyan-400' },
  yellow: { border: 'border-yellow-500', icon: 'text-yellow-400', badge: 'bg-yellow-900 text-yellow-200', bullet: 'text-yellow-400' },
  pink: { border: 'border-pink-500', icon: 'text-pink-400', badge: 'bg-pink-900 text-pink-200', bullet: 'text-pink-400' },
};

export default function SurveillanceTechSection() {
  const [expandedTech, setExpandedTech] = useState(null);

  const toggleTech = (id) => {
    setExpandedTech(expandedTech === id ? null : id);
  };

  return (
    <section id="surveillance-tech" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Surveillance Technologies</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Federal, state, and local agencies &mdash; along with corporate partners &mdash; deploy a growing
            arsenal of surveillance tools. Click any card to learn more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {SURVEILLANCE_TECHNOLOGIES.map((tech) => {
            const IconComponent = ICON_MAP[tech.icon];
            const colors = COLOR_MAP[tech.color];
            const isExpanded = expandedTech === tech.id;

            return (
              <div
                key={tech.id}
                className={`bg-slate-900 rounded-xl border-l-4 ${colors.border} transition-all duration-200`}
              >
                <button
                  onClick={() => toggleTech(tech.id)}
                  className="w-full p-6 text-left flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    {IconComponent && <IconComponent className={`w-8 h-8 ${colors.icon}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.tagline}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-200 ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-gray-300">{tech.description}</p>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-200 mb-2">Why It Matters:</h4>
                      <ul className="space-y-2">
                        {tech.whyItMatters.map((point, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-300">
                            <AlertCircle className={`w-4 h-4 ${colors.bullet} mr-2 mt-0.5 flex-shrink-0`} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-200 mb-2">Key Players:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tech.keyPlayers.map((player, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}
                          >
                            {player}
                          </span>
                        ))}
                      </div>
                    </div>

                    {tech.waSpecific && (
                      <div className="bg-blue-900 bg-opacity-30 p-3 rounded-lg border border-blue-800">
                        <p className="text-sm text-blue-200">
                          <strong>WA State:</strong> {tech.waSpecific}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 space-y-1">
                      {tech.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
