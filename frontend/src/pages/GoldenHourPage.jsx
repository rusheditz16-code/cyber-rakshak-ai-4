import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldAlert, CreditCard, MessageSquare, AlertCircle, FileText, CheckCircle } from 'lucide-react';
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
        setBanks(data);
        if (data.length > 0) setSelectedBank(data[0]);
      })
      .catch((err) => console.error("Error fetching banks:", err));
  }, []);

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
    if (cardDigits) {
      return syntax.replace("<Last 4 digits of Card>", cardDigits).replace("<Account Number>", cardDigits);
    }
    return syntax;
  };

  const handleCopySMS = () => {
    const cmd = getSmsCommand();
    navigator.clipboard.writeText(cmd);
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Golden Hour Hero Banner */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
        <span className="bg-red-900/80 text-amber-300 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full inline-block border border-red-400/40 animate-pulse">
          ⚡ 'ગોલ્ડન અવર' પ્રોટોકોલ (GOLDEN HOUR PROTOCOL)
        </span>
        <h2 className="text-2xl sm:text-4xl font-black">
          જો પૈસા કપાઈ ગયા હોય, તો પ્રથમ ૨ કલાક સૌથી મહત્વપૂર્ણ છે!
        </h2>
        <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          જો સાયબર છેતરપિંડી થયાના તરત પછી ફરિયાદ કરવામાં આવે, તો નેશનલ સાયબર સેલ સ્કેમરના ખાતામાં તે નાણાંને ફ્રીઝ (હોલ્ડ) કરી શકે છે અને પૈસા પાછા મળી શકે છે.
        </p>

        {/* 1-Tap 1930 Call Button */}
        <div className="pt-2">
          <a
            href="tel:1930"
            className="inline-flex items-center gap-3 bg-white hover:bg-amber-100 text-red-800 text-lg sm:text-xl font-black px-8 py-4 rounded-2xl shadow-2xl transition hover:scale-105"
          >
            <PhoneCall className="w-7 h-7 text-red-600 animate-bounce" />
            <span>હમણાં જ ૧૯૩૦ (1930) પર કોલ કરો</span>
          </a>
          <p className="text-xs text-red-200 mt-2 font-medium">
            (ટોલ-ફ્રી રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન)
          </p>
        </div>
      </div>

      {/* Instant Bank Card / Account Freeze */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <CreditCard className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-bold text-slate-900">
            તમારું બેંક એટીએમ કાર્ડ અને ખાતું તાત્કાલિક ફ્રીઝ કરો
          </h3>
        </div>

        {/* Bank Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {banks.map((b) => (
            <button
              key={b.bank_code}
              type="button"
              onClick={() => setSelectedBank(b)}
              className={`p-3 rounded-2xl text-left font-bold text-xs sm:text-sm border transition flex flex-col justify-between ${
                selectedBank?.bank_code === b.bank_code
                  ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-300'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span>{b.bank_name_gu}</span>
              {b.is_primary_rural_bank && (
                <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.5 rounded mt-2 self-start font-semibold">
                  ગ્રામીણ બેંક
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedBank && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase">
                  પસંદ કરેલ બેંક હેલ્પલાઇન:
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedBank.bank_name_gu}
                </h4>
              </div>
              <a
                href={`tel:${selectedBank.cyber_fraud_number || selectedBank.toll_free_helpline}`}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>બેંક હેલ્પલાઇન: {selectedBank.toll_free_helpline}</span>
              </a>
            </div>

            {/* SMS Freeze Code */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                કાર્ડના છેલ્લા ૪ આંકડા દાખલ કરો:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="દા.ત. 4821"
                  value={cardDigits}
                  onChange={(e) => setCardDigits(e.target.value)}
                  className="w-32 p-2 border border-slate-300 rounded-lg text-center font-mono font-bold text-lg"
                />
                <button
                  type="button"
                  onClick={handleCopySMS}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{copiedSMS ? 'SMS લખાણ કોપી થયું!' : 'SMS કમાન્ડ કોપી કરો'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-600 bg-slate-100 p-2.5 rounded font-mono">
                નંબર <span className="font-bold text-red-600">{selectedBank.sms_target_number}</span> પર મેસેજ મોકલો:{' '}
                <span className="font-bold text-slate-900">{getSmsCommand()}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              💡 <span className="font-bold">UPI સલાહ:</span> {selectedBank.upi_block_steps_gu}
            </p>
          </div>
        )}
      </div>

      {/* Guided Incident Complaint Form */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <FileText className="w-6 h-6 text-emerald-700" />
          <div>
            <h3 className="text-xl font-bold text-slate-900">
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
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
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
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                તાલુકો (Taluka):
              </label>
              <select
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold"
              >
                <option value="BOTAD_HQ">બોટાદ</option>
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
                placeholder="દા.ત. સમઢીયાળા / ઢસા"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
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
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-red-600"
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
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
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
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
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
