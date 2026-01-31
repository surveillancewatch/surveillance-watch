import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function DownloadModal({ toolkitFiles, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Download Complete Toolkit</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-300 mb-6">
          Click each file below to download. Save all files to a folder on your computer for easy access.
        </p>
        <div className="space-y-3">
          {toolkitFiles.map((file, index) => (
            <a
              key={index}
              href={file.path}
              download={file.filename}
              className="flex items-center justify-between bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3 text-blue-400" />
                <span className="font-semibold">{file.name}</span>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </a>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-500">
          <p className="text-sm text-gray-300">
            <strong>Tip:</strong> Right-click any file and select "Save Link As..." if the download doesn't start automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
