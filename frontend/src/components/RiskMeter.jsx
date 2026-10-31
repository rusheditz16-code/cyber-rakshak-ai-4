import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function RiskMeter({ riskLevel, riskColor, confidenceScore }) {
  if (riskLevel === 'HIGH' || riskColor === 'RED') {
    return (
      <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 flex items-center justify-between text-red-900 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white p-2.5 rounded-full">
            <AlertOctagon className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-red-700">
                🔴 જોખમી (સાયબર સ્કેમ)
              </span>
              <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {confidenceScore}% મેચ
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-red-800 mt-0.5">
              આ મેસેજ અથવા કોલ ૧૦૦% છેતરપિંડી છે. કોઈ લિંક ન ખોલો!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (riskLevel === 'MEDIUM' || riskColor === 'AMBER') {
    return (
      <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-4 flex items-center justify-between text-amber-900 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-white p-2.5 rounded-full">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-amber-800">
                🟡 સાવચેત રહો (શંકાસ્પદ)
              </span>
              <span className="bg-amber-200 text-amber-900 text-xs px-2 py-0.5 rounded-full font-bold">
                {confidenceScore}% શંકા
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
              આ મેસેજમાં અસામાન્ય ઉતાવળ જણાય છે. ચકાસણી વગર કોઈ પગલું ન ભરો.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex items-center justify-between text-emerald-900 shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600 text-white p-2.5 rounded-full">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-emerald-700">
              🟢 સુરક્ષિત (કોઈ સ્કેમ નથી મળ્યો)
            </span>
            <span className="bg-emerald-200 text-emerald-900 text-xs px-2 py-0.5 rounded-full font-bold">
              સલામત
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5">
            કોઈ જાણીતી છેતરપિંડી જોવા મળી નથી. છતાં ક્યારેય કોઈને OTP ન આપવો.
          </p>
        </div>
      </div>
    </div>
  );
}
