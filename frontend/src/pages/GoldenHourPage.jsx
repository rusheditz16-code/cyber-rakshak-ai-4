import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldAlert, CreditCard, MessageSquare, AlertCircle, FileText, CheckCircle, Send, Check } from 'lucide-react';
import ComplaintModal from '../components/ComplaintModal';
import { FALLBACK_BANKS } from '../utils/apiClient';

export default function GoldenHourPage() {
  const [banks, setBanks] = useState(FALLBACK_BANKS);
  const [selectedBank, setSelectedBank] = useState(FALLBACK_BANKS[0]);
  const [cardDigits, setCardDigits] = useState('');
  const [copiedSMS, setCopiedSMS] = useState(false);

  // Complaint Form State
  const [citizenName, setCitizenName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [taluka, setTaluka] = useState('BOTAD_HQ');
  const [village, setVillage] = useState('');
  const [amountLost, setAmountLost] = useState('');
  const [suspectPhone, setSuspectPhone] = useState('');
  const [incidentType, setIncidentType] = useState('બેંક ખાતામાંથી અજાણ્યા ઉપાડ (UPI/AePS)');
  const [description, setDescription] = useState('');
  const [generatedComplaint, setGeneratedComplaint] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/emergency/banks')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBanks(data);
          setSelectedBank(data[0]);
        }
      })
      .catch((err) => console.warn("Using fallback bank directory:", err));
  }, []);

  // Task 2: Strictly enforce 4 numeric digits in local component state only
  const handleCardDigitsChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDigits(digitsOnly);
  };

  const handleGenerateComplaint = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/emergency/generate-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizen_name: citizenName || "અનામી નાગરિક",
          contact_number: contactNo,
          taluka: taluka,
          village: village,
          incident_type: incidentType,
          description: description || "ખાતામાંથી અનધિકૃત નાણાં કપાયેલ છે.",
          suspect_phone: suspectPhone,
          amount_lost: amountLost ? parseFloat(amountLost) : 0,
          bank_name: selectedBank ? selectedBank.bank_name_en : "",
          transaction_ref: ""
        })
      });
      const data = await res.json();
      setGeneratedComplaint(data);
    } catch (err) {
      alert("ફરિયાદ પત્ર તૈયાર કરવામાં ક્ષતિ આવી.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSmsCommand = () => {
    if (!selectedBank) return "";
    const syntax = selectedBank.sms_block_syntax;
    if (syntax.includes("<Last 4 digits>")) {
      return syntax.replace("<Last 4 digits>", cardDigits.length === 4 ? cardDigits : (cardDigits ? cardDigits.padEnd(4, 'X') : "XXXX"));
    }
    if (syntax.includes("<Last 4 digits of Card>")) {
      return syntax.replace("<Last 4 digits of Card>", cardDigits.length === 4 ? cardDigits : (cardDigits ? cardDigits.padEnd(4, 'X') : "XXXX"));
    }
    if (syntax.includes("<Account Number>")) {
      return syntax.replace("<Account Number>", cardDigits || "XXXX");
    }
    return syntax;
  };

  const handleCopySMS = () => {
    const cmd = getSmsCommand();
    navigator.clipboard.writeText(cmd);
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 3000);
  };

  const generatedSmsText = getSmsCommand();
  const smsBody = encodeURIComponent(generatedSmsText);
  const smsHref = selectedBank ? `sms:${selectedBank.sms_target_number}?&body=${smsBody}` : '#';
  const needsCardDigits = selectedBank?.sms_block_syntax?.includes("<Last 4 digits>") || selectedBank?.sms_block_syntax?.includes("<Card Number>");

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5 sm:space-y-6">
      {/* Golden Hour Hero Banner */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white rounded-3xl p-5 sm:p-8 shadow-xl text-center space-y-4">
        <span className="bg-red-900/80 text-amber-300 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full inline-block border border-red-400/40 animate-pulse">
          ⚡ 'ગોલ્ડન અવર' પ્રોટોકોલ (GOLDEN HOUR PROTOCOL)
        </span>
        <h2 className="text-xl sm:text-4xl font-black leading-snug">
          જો પૈસા કપાઈ ગયા હોય, તો પ્રથમ ૨ કલાક સૌથી મહત્વપૂર્ણ છે!
        </h2>
        <p className="text-red-100 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
          જો સાયબર છેતરપિંડી થયાના તરત પછી ફરિયાદ કરવામાં આવે, તો નેશનલ સાયબર સેલ સ્કેમરના ખાતામાં તે નાણાંને ફ્રીઝ (હોલ્ડ) કરી શકે છે અને પૈસા પાછા મળી શકે છે.
        </p>

        {/* 1-Tap 1930 Call Button */}
        <div className="pt-2">
          <a
            href="tel:1930"
            className="inline-flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-amber-100 text-red-800 text-base sm:text-xl font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-2xl transition hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 animate-bounce" />
            <span>હમણાં જ ૧૯૩૦ (1930) પર કોલ કરો</span>
          </a>
          <p className="text-[11px] sm:text-xs text-red-200 mt-2 font-medium">
            (ટોલ-ફ્રી રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન • ૨૪x૭ ઉપલબ્ધ)
          </p>
        </div>
      </div>

      {/* Instant Bank Card / Account Freeze */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <CreditCard className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              તમારું બેંક એટીએમ કાર્ડ અને ખાતું તાત્કાલિક ફ્રીઝ કરો
            </h3>
            <p className="text-xs text-slate-500">
              તમારી બેંક પસંદ કરો અને સીધા કોલ અથવા એસએમએસથી કાર્ડ બંધ કરો
            </p>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {banks.map((b) => {
            const isSelected = selectedBank?.bank_code === b.bank_code;
            const isGramin = b.category_tag_gu === "ગ્રામીણ બેંક" || b.is_primary_rural_bank;
            return (
              <button
                key={b.bank_code}
                type="button"
                onClick={() => setSelectedBank(b)}
                className={`p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-300 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className="leading-snug">{b.bank_name_gu}</span>
                <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      isGramin
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-blue-100 text-blue-900 border-blue-200'
                    }`}
                  >
                    {b.category_tag_gu || (isGramin ? "ગ્રામીણ બેંક" : "જાહેર ક્ષેત્રની બેંક")}
                  </span>
                  {b.app_name && (
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                      {b.app_name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedBank && (
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
            {/* Bank Header & Quick Call */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  પસંદ કરેલ બેંક:
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {selectedBank.bank_name_gu}
                </h4>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedBank.category_tag_gu || "બેંક"}
                  </span>
                  {selectedBank.app_name && (
                    <span className="text-xs text-slate-600 font-medium">
                      સત્તાવાર એપ: <strong className="text-slate-800">{selectedBank.app_name}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Task 2: Active tel: link buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${selectedBank.toll_free_helpline}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow transition active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>ટોલ-ફ્રી: {selectedBank.toll_free_helpline}</span>
                </a>
                {selectedBank.alternate_helpline && (
                  <a
                    href={`tel:${selectedBank.alternate_helpline}`}
                    className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow transition active:scale-95"
                    title="વૈકલ્પિક નંબર"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>વૈકલ્પિક: {selectedBank.alternate_helpline}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Task 2: SMS Freeze Section with Input Restrictions & Direct SMS Button */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {needsCardDigits ? "કાર્ડના છેલ્લા ૪ આંકડા દાખલ કરો:" : "કાર્ડ બ્લોક SMS કમાન્ડ:"}
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  નંબર: <strong className="text-red-700 font-mono text-xs sm:text-sm">{selectedBank.sms_target_number}</strong>
                </span>
              </div>

              {needsCardDigits ? (
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      placeholder="દા.ત. 4821"
                      value={cardDigits}
                      onChange={handleCardDigitsChange}
                      className="w-32 p-2.5 border-2 border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-xl text-center font-mono font-bold text-lg tracking-widest text-slate-900 bg-white"
                      aria-label="Last 4 digits of ATM card"
                    />

                    {cardDigits.length === 4 ? (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ૪ આંકડા દાખલ થયા
                      </span>
                    ) : (
                      <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                        તમારા કાર્ડના છેલ્લા ૪ અંક લખો
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                    <span>ડેટા પ્રાઇવસી: આ ૪ આંકડા ફક્ત SMS ડ્રાફ્ટ માટે જ વપરાય છે, સર્વર કે સ્ટોરેજમાં સેવ થતા નથી.</span>
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
                  ✓ સૌરાષ્ટ્ર ગ્રામીણ બેંકમાં સીધું <strong className="font-mono font-bold">BLOCK ALL</strong> મોકલવાથી તમામ કાર્ડ સેવાઓ તરત બંધ થઈ જાય છે.
                </div>
              )}

              {/* Action Buttons: Direct SMS Link + Copy Command */}
              <div className="flex flex-wrap gap-2 pt-1">
                {/* Task 2: Cross-platform sms: link button */}
                <a
                  href={smsHref}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>સીધો SMS મોકલો (Open SMS)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySMS}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition active:scale-95"
                >
                  {copiedSMS ? <Check className="w-4 h-4 text-emerald-400" /> : <MessageSquare className="w-4 h-4" />}
                  <span>{copiedSMS ? 'SMS લખાણ કોપી થયું!' : 'SMS કમાન્ડ કોપી કરો'}</span>
                </button>
              </div>

              {/* Formatted Preview */}
              <div className="text-xs text-slate-700 bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1 font-mono">
                <div>
                  પ્રાપ્તકર્તા: <span className="font-bold text-red-700">{selectedBank.sms_target_number}</span>
                </div>
                <div>
                  મેસેજ ટેક્સ્ટ: <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300 inline-block">{generatedSmsText}</span>
                </div>
              </div>
            </div>

            {/* Official App & Netbanking Tips */}
            <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-blue-900">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>સત્તાવાર એપ / UPI સલાહ:</span>
              </p>
              <p className="leading-relaxed pl-5 text-slate-700">
                {selectedBank.upi_block_steps_gu}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guided Incident Complaint Form */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <FileText className="w-6 h-6 text-emerald-700 flex-shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              e-Gram કેન્દ્ર / પોલીસ માટે ફરિયાદ અરજી તૈયાર કરો
            </h3>
            <p className="text-xs text-slate-500">
              આ ફોર્મ ભરવાથી ૧ મિનિટમાં અધિકૃત ફરિયાદ પત્ર તૈયાર થશે જે તમે પ્રિન્ટ કે સેવ કરી શકો છો.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateComplaint} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                નાગરિકનું નામ (Citizen Name):
              </label>
              <input
                type="text"
                placeholder="દા.ત. રમણભાઈ પટેલ"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                મોબાઈલ નંબર (Contact No):
              </label>
              <input
                type="text"
                placeholder="દા.ત. 9876543210"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                તાલુકો (Taluka):
              </label>
              <select
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold bg-white"
              >
                <option value="BOTAD_HQ">બોટાદ (મુખ્ય મથક)</option>
                <option value="GADHADA">ગઢડા</option>
                <option value="BARWALA">બરવાળા</option>
                <option value="RANPUR">રાણપુર</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ગામનું નામ (Village):
              </label>
              <input
                type="text"
                placeholder="દા.ત. સમઢીયાળા / ઢસા / તુર્કખા"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ગુમાવેલ રકમ (Amount Lost in ₹):
              </label>
              <input
                type="number"
                placeholder="દા.ત. 35000"
                value={amountLost}
                onChange={(e) => setAmountLost(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                સ્કેમરનો ફોન નંબર અથવા લિંક:
              </label>
              <input
                type="text"
                placeholder="દા.ત. 98xxxxxx અથવા લિંક"
                value={suspectPhone}
                onChange={(e) => setSuspectPhone(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              બનાવનું ટૂંકું વર્ણન (Incident Description):
            </label>
            <textarea
              rows={3}
              placeholder="દા.ત. મને લાઈટ બિલ કપાઈ જવાનો ફોન આવ્યો હતો અને એપ ડાઉનલોડ કરાવી ખાતામાંથી ૩૫ હજાર ઉપાડી લીધા..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 active:scale-98"
          >
            <FileText className="w-5 h-5" />
            <span>અધિકૃત ફરિયાદ પત્ર જનરેટ કરો (Generate Letter)</span>
          </button>
        </form>
      </div>

      {generatedComplaint && (
        <ComplaintModal
          complaint={generatedComplaint}
          onClose={() => setGeneratedComplaint(null)}
        />
      )}
    </div>
  );
}
