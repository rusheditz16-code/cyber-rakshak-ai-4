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
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85dvh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-3.5 sm:p-4 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-lg truncate">અધિકૃત સાયબર ક્રાઈમ ફરિયાદ પત્ર</h3>
              <p className="text-[11px] sm:text-xs text-emerald-200 truncate">
                સંદર્ભ આઈડી: {complaint.complaint_id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-emerald-700 p-1.5 rounded-full transition flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Actions */}
        <div className="bg-slate-100 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-slate-200 gap-2 flex-wrap flex-shrink-0">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setLangTab('gu')}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-bold transition ${
                langTab === 'gu' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
              }`}
            >
              ગુજરાતી ફરિયાદ
            </button>
            <button
              onClick={() => setLangTab('en')}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-bold transition ${
                langTab === 'en' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
              }`}
            >
              English Draft
            </button>
          </div>

          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold border border-slate-300 shadow-sm transition active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'કોપી થયું!' : 'કોપી'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold border border-slate-300 shadow-sm transition active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>પ્રિન્ટ</span>
            </button>
          </div>
        </div>

        {/* Complaint Text */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 font-mono text-xs sm:text-sm bg-slate-50 whitespace-pre-wrap leading-relaxed text-slate-800 border-b border-slate-200">
          {currentLetter}
        </div>

        {/* Instructions */}
        <div className="p-3 sm:p-4 bg-emerald-50 text-xs text-emerald-900 space-y-1 flex-shrink-0">
          <p className="font-bold">આગળ શું કરવું?</p>
          {complaint.submission_steps_gu.map((step, idx) => (
            <p key={idx} className="leading-snug">{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
