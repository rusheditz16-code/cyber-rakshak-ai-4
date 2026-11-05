import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ScamCheckerPage from './pages/ScamCheckerPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import GoldenHourPage from './pages/GoldenHourPage';
import AwarenessHubPage from './pages/AwarenessHubPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('check');

  return (
    <LanguageProvider>
      <div className="min-h-[100dvh] bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
        {/* Sticky Header with Emergency Banner */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content with Mobile Responsive Padding */}
        <main className="flex-1 pt-2 sm:pt-4 pb-16 sm:pb-20">
          {activeTab === 'check' && <ScamCheckerPage setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <VoiceAssistantPage />}
          {activeTab === 'emergency' && <GoldenHourPage />}
          {activeTab === 'awareness' && <AwarenessHubPage />}
          {activeTab === 'admin' && <AdminDashboardPage />}
        </main>

        {/* Global Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-6 sm:py-8 border-t border-slate-800 flex-shrink-0">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>બોટાદ સાયબર રક્ષક AI આસિસ્ટન્ટ</span>
              </div>
              <p className="mt-1 text-slate-400 text-[11px]">
                જિલ્લા વિકાસ અધિકારીની કચેરી (DDO) - બોટાદ • સાયબર સુરક્ષા & ડેટા પ્રાઇવસી પહેલ
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1 transition"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="tel:1930"
                className="text-red-400 font-bold hover:text-red-300 flex items-center gap-1 transition"
              >
                <PhoneCall className="w-3 h-3" />
                <span>રાષ્ટ્રીય હેલ્પલાઇન: ૧૯૩૦</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
