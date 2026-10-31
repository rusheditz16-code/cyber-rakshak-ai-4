import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export default function PrivacyNoticeBadge({ auditInfo }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs sm:text-sm text-emerald-900 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">
            ઝીરો-નોલેજ ડેટા પ્રાઇવસી: તમારો આધાર કે ફોન નંબર સેવ થતો નથી
          </span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-emerald-700 underline font-medium text-xs hover:text-emerald-900 ml-2"
        >
          {showDetails ? 'બંધ કરો' : 'વિગત જુઓ'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-2.5 pt-2 border-t border-emerald-200 text-xs space-y-1.5 text-emerald-800">
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ૧૨ આંકડાનો આધાર નંબર આપમેળે છુપાવવામાં આવે છે.
          </p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            મોબાઈલ નંબર અને OTP સુરક્ષિત રાખવામાં આવે છે.
          </p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            DPDP Act 2023 (ડેટા પ્રોટેક્શન એક્ટ) ના નિયમોનું પાલન કરે છે.
          </p>
          {auditInfo && auditInfo.is_sanitized && (
            <div className="bg-white p-2 rounded border border-emerald-300 font-mono text-[11px] mt-1">
              <span className="font-bold text-emerald-700">સુરક્ષિત કરેલ લખાણ: </span>
              {auditInfo.clean_text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
