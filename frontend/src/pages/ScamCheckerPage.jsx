import React, { useState } from 'react';
import { Send, Sparkles, RefreshCw, AlertCircle, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import VoiceMicButton from '../components/VoiceMicButton';
import RiskMeter from '../components/RiskMeter';
import AudioSpeaker from '../components/AudioSpeaker';
import PrivacyNoticeBadge from '../components/PrivacyNoticeBadge';
import ComplaintModal from '../components/ComplaintModal';
import { useLanguage } from '../context/LanguageContext';

export default function ScamCheckerPage({ setActiveTab }) {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [taluka, setTaluka] = useState('BOTAD_HQ');
  const [hasLostMoney, setHasLostMoney] = useState(false);
  const [lostAmount, setLostAmount] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [generatedComplaint, setGeneratedComplaint] = useState(null);

  const sampleScams = [
    {
      title: "⚡ વીજળી બિલ (PGVCL)",
      text: "પ્રિય ગ્રાહક, તમારું વીજળી બિલ બાકી હોવાથી આજે રાત્રે 9:30 વાગ્યે વીજ જોડાણ કાપી નાખવામાં આવશે. તાત્કાલિક અમારા અધિકારી શ્રી વર્મા (મો. 9876543210) નો સંપર્ક કરો અથવા PGVCL-Update.apk ડાઉનલોડ કરો."
    },
    {
      title: "🌾 પીએમ કિસાન ૨૦૦૦",
      text: "ખેડૂત મિત્રો માટે ખુશખબર! પીએમ કિસાન યોજનાનો ૧૬મો હપ્તો ₹૨૦૦૦ જમા થઈ ગયો છે. તમારા ખાતામાં પૈસા મેળવવા માટે નીચેની લિંક પર ક્લિક કરી આધાર નંબર નાખો: pmkisan-subsidy.xyz"
    },
    {
      title: "🏦 બેંક KYC બ્લોક કોલ",
      text: "નમસ્તે, હું સ્ટેટ બેંક મેનેજર બોલું છું. તમારું KYC અપડેટ નથી જેથી ૨૪ કલાકમાં એટીએમ કાર્ડ અને ખાતું બ્લોક થશે. ખાતું ચાલુ રાખવા માટે હમણાં જ આવેલા ૬ આંકડાનો OTP આપો."
    },
    {
      title: "🎁 ૨૫ લાખની લોટરી",
      text: "મુબારક હો! તમે કૌન બનેગા કરોડપતિમાં ₹૨૫ લાખની લોટરી જીતી ગયા છો. ઇનામ લેવા માટે મેનેજર સાથે વોટ્સએપ પર વાત કરો અને પ્રોસેસિંગ ફી ₹૫,૦૦૦ જમા કરો."
    }
  ];

  const handleCheck = async () => {
    if (!inputText.trim()) {
      setError('કૃપા કરીને પહેલા મેસેજ લખો અથવા બોલીને જણાવો.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/check-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          source_type: 'SMS',
          taluka: taluka,
          has_lost_money: hasLostMoney,
          lost_amount: hasLostMoney && lostAmount ? parseFloat(lostAmount) : 0
        })
      });

      if (!response.ok) {
        throw new Error('સર્વર સાથે સંપર્ક થઈ શક્યો નથી.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('ચકાસણી દરમિયાન ક્ષતિ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateComplaintFromCheck = async () => {
    try {
      const res = await fetch('/api/emergency/generate-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizen_name: "અનામી નાગરિક (બોટાદ)",
          contact_number: "",
          taluka: taluka,
          village: "",
          incident_type: result?.scam_name_gu || "ઓનલાઇન નાણાકીય છેતરપિંડી",
          description: inputText,
          amount_lost: hasLostMoney && lostAmount ? parseFloat(lostAmount) : 0,
          bank_name: "",
          transaction_ref: ""
        })
      });
      const data = await res.json();
      setGeneratedComplaint(data);
    } catch (e) {
      alert("ફરિયાદ પત્ર તૈયાર કરવામાં ક્ષતિ આવી.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Intro Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="bg-emerald-600/80 text-emerald-100 text-xs sm:text-sm font-bold px-3 py-1 rounded-full inline-block mb-3 border border-emerald-400/30">
            🛡️ બોટાદ જિલ્લા સાયબર સુરક્ષા કવચ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            શંકાસ્પદ મેસેજ કે કોલની સાચી ચકાસણી
          </h2>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base leading-relaxed">
            લાઈટ બિલ, પીએમ કિસાન, બેંક KYC કે લોટરીનો કોઈ પણ મેસેજ આવ્યો હોય તો અહીં બોલીને કે પેસ્ટ કરીને તરત સાચું-ખોટું જાણો.
          </p>
        </div>
      </div>

      {/* Main Input Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
        {/* Voice Input Section */}
        <div className="text-center py-2">
          <VoiceMicButton
            onTranscript={(txt) => setInputText((prev) => (prev ? prev + ' ' + txt : txt))}
            isListening={isListening}
            setIsListening={setIsListening}
          />
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            (મોટા લીલા બટન પર દબાવીને તમારા શબ્દોમાં બોલો)
          </p>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">
            અથવા મેસેજ / લિંક / કોલની વિગત અહીં લખો:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-sm sm:text-base resize-none shadow-inner"
            placeholder="દા.ત. મને PGVCL લાઈટ બિલ કાપી નાખવાનો મેસેજ આવ્યો છે, શું આ સાચો છે?"
          />
        </div>

        {/* Sample Quick Prompts */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('quick_samples_title')}
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleScams.map((scam, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(scam.text)}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full font-semibold transition"
              >
                {scam.title}
              </button>
            ))}
          </div>
        </div>

        {/* District Taluka & Money Loss Flags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              તમારો તાલુકો પસંદ કરો:
            </label>
            <select
              value={taluka}
              onChange={(e) => setTaluka(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700"
            >
              <option value="BOTAD_HQ">બોટાદ (Botad)</option>
              <option value="GADHADA">ગઢડા (Gadhada)</option>
              <option value="BARWALA">બરવાળા (Barwala)</option>
              <option value="RANPUR">રાણપુર (Ranpur)</option>
            </select>
          </div>

          <div className="bg-red-50 p-3 rounded-xl border border-red-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLostMoney}
                onChange={(e) => setHasLostMoney(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500"
              />
              <span className="text-xs sm:text-sm font-bold text-red-800">
                શું તમારા ખાતામાંથી પૈસા કપાઈ ગયા છે?
              </span>
            </label>

            {hasLostMoney && (
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="કેટલા રૂપિયા કપાયા? (દા.ત. 15000)"
                  value={lostAmount}
                  onChange={(e) => setLostAmount(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-red-300 rounded-lg text-red-900 font-bold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {error && (
          <div className="p-3 bg-red-100 text-red-800 text-xs sm:text-sm rounded-xl font-medium border border-red-200">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleCheck}
            disabled={loading}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-base sm:text-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>ચકાસી રહ્યું છે...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>ચકાસણી કરો (Verify Scam)</span>
              </>
            )}
          </button>

          {inputText && (
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
              }}
              className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-sm font-semibold transition"
            >
              સાફ કરો
            </button>
          )}
        </div>
      </div>

      {/* Analysis Result Card */}
      {result && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                ચકાસણી પરિણામ (Detection Verdict)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {result.scam_name_gu}
              </h3>
            </div>
            {result.audio_url && (
              <AudioSpeaker audioUrl={result.audio_url} label="ઓડિયો સાંભળો (Voice Advice)" />
            )}
          </div>

          {/* Risk Traffic Light Meter */}
          <RiskMeter
            riskLevel={result.risk_level}
            riskColor={result.risk_color}
            confidenceScore={result.confidence_score}
          />

          {/* Warning & Advice */}
          <div className="space-y-3">
            <div className="bg-red-50/60 p-4 rounded-2xl border border-red-200 text-red-950">
              <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                મુખ્ય ચેતવણી:
              </h4>
              <p className="mt-1 text-sm font-medium leading-relaxed">
                {result.warning_gu}
              </p>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-emerald-950">
              <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                તમારે શું કરવું જોઈએ? (Action Steps):
              </h4>
              <p className="mt-1 text-sm font-medium leading-relaxed whitespace-pre-line">
                {result.action_plan_gu}
              </p>
            </div>
          </div>

          {/* Golden Hour Action Banner */}
          {result.golden_hour_triggered && (
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-black text-lg flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-amber-300 animate-pulse" />
                  ગોલ્ડન અવર સક્રિય! (પહેલા ૨ કલાકમાં પગલું ભરો)
                </h4>
                <p className="text-xs sm:text-sm text-red-100 mt-1">
                  તરત ૧૯૩૦ ડાયલ કરો અથવા તમારું બેંક કાર્ડ ફ્રીઝ કરો.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('emergency')}
                  className="bg-white text-red-700 font-extrabold px-4 py-2 rounded-xl text-xs sm:text-sm shadow hover:bg-red-50 transition"
                >
                  કાર્ડ ફ્રીઝ કરો
                </button>
                <button
                  onClick={handleGenerateComplaintFromCheck}
                  className="bg-amber-400 text-amber-950 font-extrabold px-4 py-2 rounded-xl text-xs sm:text-sm shadow hover:bg-amber-300 transition"
                >
                  ફરિયાદ પત્ર ડાઉનલોડ
                </button>
              </div>
            </div>
          )}

          {/* Privacy Notice Badge */}
          <PrivacyNoticeBadge auditInfo={result.privacy_audit} />
        </div>
      )}

      {/* Complaint Generator Modal */}
      {generatedComplaint && (
        <ComplaintModal
          complaint={generatedComplaint}
          onClose={() => setGeneratedComplaint(null)}
        />
      )}
    </div>
  );
}
