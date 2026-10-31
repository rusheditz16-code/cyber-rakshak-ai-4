import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';

export default function ComplaintModal({ complaint, onClose }) {
  const [copied, setCopied] = useState(false);
  const [langTab, setLangTab] = useState('gu');

  if (!complaint) return null;

  const currentLetter = langTab === 'gu' ? complaint.letter_gu : complaint.letter_en;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-300" />
            <div>
              <h3 className="font-bold text-lg">અધિકૃત સાયબર ક્રાઈમ ફરિયાદ પત્ર</h3>
              <p className="text-xs text-emerald-200">
                સંદર્ભ આઈડી: {complaint.complaint_id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-emerald-700 p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Actions */}
        <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={() => setLangTab('gu')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                langTab === 'gu' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
              }`}
            >
              ગુજરાતી ફરિયાદ
            </button>
            <button
              onClick={() => setLangTab('en')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                langTab === 'en' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
              }`}
            >
              English Draft
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-md text-xs font-semibold border border-slate-300 shadow-sm transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'કોપી થઈ ગયું!' : 'કોપી કરો'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-md text-xs font-semibold border border-slate-300 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>પ્રિન્ટ</span>
            </button>
          </div>
        </div>

        {/* Complaint Text */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs sm:text-sm bg-slate-50 whitespace-pre-wrap leading-relaxed text-slate-800 border-b border-slate-200">
          {currentLetter}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-emerald-50 text-xs text-emerald-900 space-y-1">
          <p className="font-bold">આગળ શું કરવું?</p>
          {complaint.submission_steps_gu.map((step, idx) => (
            <p key={idx}>{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
