import React from 'react';
import {
  Shield,
  FileText,
  Users,
  Eye,
  Camera,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { RESOURCE_CATEGORIES } from '../data/resourcesData';

const ICON_MAP = {
  Shield,
  FileText,
  Users,
  Eye,
  Camera,
  Smartphone,
};

const COLOR_MAP = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  orange: 'text-orange-400',
  cyan: 'text-cyan-400',
};

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Resources</h2>

        <div className="max-w-6xl mx-auto space-y-12">
          {RESOURCE_CATEGORIES.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-2xl font-bold mb-6 text-gray-200">{category.title}</h3>
              <div className={`grid gap-8 ${category.resources.length === 1 ? 'md:grid-cols-1 max-w-lg' : 'md:grid-cols-3'}`}>
                {category.resources.map((resource, resIdx) => {
                  const IconComponent = ICON_MAP[resource.icon];
                  const colorClass = COLOR_MAP[resource.color];

                  return (
                    <div key={resIdx} className="bg-slate-900 p-6 rounded-xl">
                      {IconComponent && (
                        <IconComponent className={`w-12 h-12 ${colorClass} mb-4`} />
                      )}
                      <h4 className="text-xl font-bold mb-3">{resource.name}</h4>
                      <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                      >
                        {resource.urlLabel} <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                      {resource.phone && (
                        <p className="text-sm text-gray-500 mt-2">Phone: {resource.phone}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
