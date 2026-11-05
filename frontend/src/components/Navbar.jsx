import React from 'react';
import { ShieldCheck, PhoneCall, Globe, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-40 w-full">
      {/* Top Emergency SOS Strip */}
      <div className="bg-red-700 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 border-b border-red-800/40">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-bounce flex-shrink-0" />
          <span className="truncate text-[11px] sm:text-xs md:text-sm">
            સાયબર ફ્રોડ થાય તો તાત્કાલિક ગોલ્ડન અવરમાં ૧૯૩૦ ડાયલ કરો
          </span>
        </div>
        <a
          href="tel:1930"
          className="bg-white text-red-700 font-extrabold px-2.5 sm:px-3 py-0.5 rounded-full flex items-center gap-1 text-[11px] sm:text-xs hover:bg-amber-100 transition shadow-sm flex-shrink-0 active:scale-95"
          title="Direct Call to Cybercrime Helpline"
        >
          <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>1930 SOS</span>
        </a>
      </div>

      {/* Main Brand & Actions */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0" 
          onClick={() => setActiveTab('check')}
          role="button"
          tabIndex={0}
        >
          <div className="bg-white/10 p-1.5 sm:p-2 rounded-xl backdrop-blur-sm border border-emerald-500/30 flex-shrink-0">
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white truncate">
                {t('app_title')}
              </h1>
              <span className="bg-emerald-600/90 text-emerald-100 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold border border-emerald-400/30 flex-shrink-0">
                બોટાદ
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-emerald-200 font-medium truncate">
              {t('app_subtitle')}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 sm:gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-emerald-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition border border-emerald-600/70 shadow-sm active:scale-95"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Mobile Optimized Horizontal Scroll) */}
      <nav className="bg-emerald-900/70 border-t border-emerald-700/50 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto flex overflow-x-auto no-scrollbar space-x-1 sm:space-x-2 py-1 sm:py-1.5 touch-pan-x">
          <button
            onClick={() => setActiveTab('check')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'check'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-800/80'
            }`}
          >
            <span>🔍</span>
            <span>{t('nav_check')}</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'chat'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-800/80'
            }`}
          >
            <span>🎙️</span>
            <span>{t('nav_chat')}</span>
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-black whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'emergency'
                ? 'bg-red-600 text-white shadow-sm ring-1 ring-red-400'
                : 'text-red-200 hover:bg-red-900/50'
            }`}
          >
            <span>🚨</span>
            <span>{t('nav_emergency')}</span>
          </button>
          <button
            onClick={() => setActiveTab('awareness')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'awareness'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-800/80'
            }`}
          >
            <span>📚</span>
            <span>{t('nav_awareness')}</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-800/80'
            }`}
          >
            <span>🏛️</span>
            <span>{t('nav_admin')}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
