import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Users, AlertTriangle, Send, PlusCircle, Radio, CheckCircle, MapPin } from 'lucide-react';
import { FALLBACK_METRICS } from '../utils/apiClient';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(FALLBACK_METRICS);
  const [loading, setLoading] = useState(false);

  // Broadcast Advisory State
  const [broadcastTaluka, setBroadcastTaluka] = useState('ALL');
  const [advisoryTitle, setAdvisoryTitle] = useState('');
  const [advisoryMsg, setAdvisoryMsg] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState('');

  // New Scam Signature Form State
  const [showPatternModal, setShowPatternModal] = useState(false);
  const [patternName, setPatternName] = useState('');
  const [patternCategory, setPatternCategory] = useState('SUBSIDY_FRAUD');
  const [patternKeywords, setPatternKeywords] = useState('');
  const [patternWarning, setPatternWarning] = useState('');

  const fetchMetrics = () => {
    fetch('/api/admin/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading metrics:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!advisoryTitle || !advisoryMsg) return;

    try {
      const res = await fetch('/api/admin/broadcast-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_taluka: broadcastTaluka,
          title_gu: advisoryTitle,
          message_gu: advisoryMsg,
          severity: 'HIGH'
        })
      });
      if (res.ok) {
        setBroadcastSuccess('સંદેશ સમગ્ર ગ્રામ પંચાયતો અને e-Gram કેન્દ્રો પર સફળતાપૂર્વક મોકલવામાં આવ્યો!');
        setAdvisoryTitle('');
        setAdvisoryMsg('');
        fetchMetrics();
        setTimeout(() => setBroadcastSuccess(''), 4000);
      }
    } catch (e) {
      alert("એડવાઈઝરી મોકલવામાં ક્ષતિ આવી.");
    }
  };

  const handleAddPattern = async (e) => {
    e.preventDefault();
    try {
      const kwList = patternKeywords.split(',').map((s) => s.trim()).filter(Boolean);
      const res = await fetch('/api/admin/patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: patternCategory,
          name_gu: patternName,
          name_en: patternName,
          risk_level: "HIGH",
          keywords_gu: kwList,
          keywords_en: kwList,
          description_gu: patternWarning,
          warning_gu: patternWarning,
          action_plan_gu: "૧. કોઈ પણ લિંક ખોલવી નહીં.\n૨. નજીકના e-Gram કેન્દ્ર પર સંપર્ક કરવો.",
          severity_score: 95
        })
      });
      if (res.ok) {
        alert("નવી સ્કેમ પેટર્ન સમગ્ર બોટાદ જિલ્લામાં તાત્કાલિક સક્રિય થઈ ગઈ છે!");
        setShowPatternModal(false);
        setPatternName('');
        setPatternKeywords('');
        setPatternWarning('');
        fetchMetrics();
      }
    } catch (err) {
      alert("પેટર્ન ઉમેરવામાં ક્ષતિ આવી.");
    }
  };

  if (loading || !metrics) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-slate-500">
        ડેશબોર્ડ ડેટા લોડ થઈ રહ્યો છે...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            DDO BOTAD CYBER COMMAND CENTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
            જિલ્લા સાયબર ક્રાઈમ અને જોખમ મોનિટરિંગ
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            જિલ્લા વિકાસ અધિકારીની કચેરી - બોટાદ • ૪ તાલુકા, ૧૯૧ ગ્રામ પંચાયતો
          </p>
        </div>

        <button
          onClick={() => setShowPatternModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>નવી સ્કેમ પેટર્ન ઉમેરો</span>
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
            <Users className="w-4 h-4" />
            <span>નાગરિકો સુરક્ષિત</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {metrics.total_villagers_reached.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">પાયલોટ તબક્કામાં આવરી લેવાયેલ</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
            <Shield className="w-4 h-4" />
            <span>અંદાજિત નાણાં બચાવ્યા</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2">
            ₹{(metrics.estimated_money_saved_inr / 100000).toFixed(1)} લાખ
          </div>
          <p className="text-[11px] text-slate-500 mt-1">ગોલ્ડન અવર ફ્રીઝિંગ દ્વારા</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>હાઈ-રિસ્ક એલર્ટ</span>
          </div>
          <div className="text-2xl font-black text-red-600 mt-2">
            {metrics.high_risk_alerts_active}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">ચાલુ સપ્તાહે નોંધાયેલ</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>ગોલ્ડન અવર સફળતા દર</span>
          </div>
          <div className="text-2xl font-black text-blue-700 mt-2">
            {metrics.golden_hour_success_rate}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">૧૯૩૦ સમયસર રિપોર્ટિંગ</p>
        </div>
      </div>

      {/* Taluka Threat Breakdown */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <span>બોટાદ જિલ્લા તાલુકાવાર સાયબર થ્રેટ વિશ્લેષણ</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.taluka_breakdown.map((t) => (
            <div
              key={t.taluka_id}
              className={`p-4 rounded-2xl border space-y-3 ${
                t.risk_index === 'HIGH'
                  ? 'bg-red-50/50 border-red-200'
                  : t.risk_index === 'MEDIUM'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-slate-900">
                  {t.taluka_name_gu}
                </h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.risk_index === 'HIGH'
                      ? 'bg-red-200 text-red-800'
                      : t.risk_index === 'MEDIUM'
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-emerald-200 text-emerald-800'
                  }`}
                >
                  {t.risk_index === 'HIGH' ? 'જોખમ વધુ' : t.risk_index === 'MEDIUM' ? 'સાધારણ' : 'ઓછું'}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-600">
                <p>ગ્રામ પંચાયતો: <span className="font-bold text-slate-800">{t.gram_panchayats_count}</span></p>
                <p>આ મહિને સ્કેમ રિપોર્ટ: <span className="font-bold text-slate-800">{t.scam_reports_this_month}</span></p>
                <p>મુખ્ય ફ્રોડ: <span className="font-bold text-red-700">{t.top_scam_category}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Broadcast Center */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <Radio className="w-6 h-6 text-emerald-700" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              ગ્રામ પંચાયત & e-Gram એડવાઈઝરી બ્રોડકાસ્ટ સેન્ટર
            </h3>
            <p className="text-xs text-slate-500">
              અહીંથી એક ક્લિકમાં તમામ ગ્રામ પંચાયતોના વોટ્સએપ ગ્રુપ અને નોટિસ બોર્ડ પર ચેતવણી મોકલી શકાય છે.
            </p>
          </div>
        </div>

        {broadcastSuccess && (
          <div className="p-3 bg-emerald-100 text-emerald-900 text-xs sm:text-sm rounded-xl font-bold border border-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{broadcastSuccess}</span>
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ટાર્ગેટ તાલુકો:
              </label>
              <select
                value={broadcastTaluka}
                onChange={(e) => setBroadcastTaluka(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="ALL">સમગ્ર બોટાદ જિલ્લો (All Talukas)</option>
                <option value="BOTAD_HQ">બોટાદ</option>
                <option value="GADHADA">ગઢડા</option>
                <option value="BARWALA">બરવાળા</option>
                <option value="RANPUR">રાણપુર</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ચેતવણી વિષય (Advisory Title):
              </label>
              <input
                type="text"
                placeholder="દા.ત. સાવધાન: બોટાદ જિલ્લામાં લાઈટ બિલ કપાઈ જવાના નકલી SMS થી ચેતો"
                value={advisoryTitle}
                onChange={(e) => setAdvisoryTitle(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              સંદેશ (Message in Gujarati):
            </label>
            <textarea
              rows={3}
              placeholder="ગ્રામજનો માટે સરળ ભાષામાં ચેતવણી સંદેશ..."
              value={advisoryMsg}
              onChange={(e) => setAdvisoryMsg(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow transition"
          >
            <Send className="w-4 h-4" />
            <span>તમામ ગ્રામ પંચાયતોમાં ચેતવણી મોકલો (Broadcast Alert)</span>
          </button>
        </form>

        {/* Recent Broadcasts */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">
            તાજેતરની પ્રસિદ્ધ થયેલી ચેતવણીઓ:
          </span>
          <div className="space-y-2">
            {metrics.recent_advisories.map((adv) => (
              <div key={adv.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{adv.title_gu}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{adv.created_at}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{adv.message_gu}</p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  ✓ {adv.broadcast_status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Modal */}
      {showPatternModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900">
              નવી સ્કેમ પેટર્ન ઉમેરો (Dynamic Scam Signature)
            </h3>
            <form onSubmit={handleAddPattern} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  સ્કેમનું નામ (ગુજરાતીમાં):
                </label>
                <input
                  type="text"
                  placeholder="દા.ત. નકલી ટ્રેક્ટર સબસીડી લિંક"
                  value={patternName}
                  onChange={(e) => setPatternName(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  કીવર્ડ્સ (અલ્પવિરામથી અલગ કરો):
                </label>
                <input
                  type="text"
                  placeholder="ટ્રેક્ટર સહાય, સબસીડી, tractor-sahay.xyz"
                  value={patternKeywords}
                  onChange={(e) => setPatternKeywords(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ચેતવણી અને સાવચેતી લખાણ:
                </label>
                <textarea
                  rows={3}
                  placeholder="આ યોજના નકલી છે..."
                  value={patternWarning}
                  onChange={(e) => setPatternWarning(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPatternModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
                >
                  પેટર્ન એક્ટિવ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
