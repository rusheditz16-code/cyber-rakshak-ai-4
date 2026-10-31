import React from 'react';
import { ShieldCheck, PhoneCall, Globe, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top Emergency SOS Strip */}
      <div className="bg-red-700 px-4 py-1.5 text-xs sm:text-sm font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>સાયબર ફ્રોડ થાય તો તાત્કાલિક ગોલ્ડન અવરમાં ૧૯૩૦ ડાયલ કરો</span>
        </div>
        <a
          href="tel:1930"
          className="bg-white text-red-700 font-bold px-3 py-0.5 rounded-full flex items-center gap-1 text-xs hover:bg-amber-100 transition shadow"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>1930 SOS</span>
        </a>
      </div>

      {/* Main Brand & Actions */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('check')}>
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {t('app_title')}
              </h1>
              <span className="bg-emerald-600/80 text-emerald-100 text-[11px] px-2 py-0.5 rounded-full font-medium border border-emerald-400/30">
                બોટાદ
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium">
              {t('app_subtitle')}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-emerald-50 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition border border-emerald-600 shadow-sm"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-emerald-900/60 border-t border-emerald-700/50 px-4">
        <div className="max-w-6xl mx-auto flex overflow-x-auto no-scrollbar space-x-1 sm:space-x-2 py-1.5">
          <button
            onClick={() => setActiveTab('check')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'check'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            🔍 {t('nav_check')}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'chat'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            🎙️ {t('nav_chat')}
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'emergency'
                ? 'bg-red-600 text-white shadow'
                : 'text-red-200 hover:bg-red-900/50'
            }`}
          >
            🚨 {t('nav_emergency')}
          </button>
          <button
            onClick={() => setActiveTab('awareness')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'awareness'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            📚 {t('nav_awareness')}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            🏛️ {t('nav_admin')}
          </button>
        </div>
      </div>
    </header>
  );
}
