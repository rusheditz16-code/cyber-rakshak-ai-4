import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { createSpeechRecognizer } from '../utils/speechUtils';

export default function VoiceMicButton({ onTranscript, isListening, setIsListening }) {
  const [errorMsg, setErrorMsg] = useState('');

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer(
      'gu-IN',
      (transcript) => {
        setIsListening(false);
        if (onTranscript) onTranscript(transcript);
      },
      (error) => {
        setIsListening(false);
        setErrorMsg('માઇક્રોફોન ચાલુ નથી થઈ શક્યો. કૃપા કરીને ટાઈપ કરો.');
        setTimeout(() => setErrorMsg(''), 4000);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      try {
        recognizer.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      setErrorMsg('તમારા બ્રાઉઝરમાં વોઇસ રેકોર્ડિંગ સપોર્ટ નથી.');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggleListening}
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl border-4 ${
          isListening
            ? 'bg-red-500 border-red-300 text-white mic-recording-pulse scale-105'
            : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-400 text-white hover:scale-105'
        }`}
        title="Tap to speak in Gujarati"
      >
        {isListening ? (
          <>
            <MicOff className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            <span className="text-[11px] font-bold mt-1">બોલો...</span>
          </>
        ) : (
          <>
            <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-[11px] font-bold mt-1">અહીં બોલો</span>
          </>
        )}
      </button>

      {isListening && (
        <p className="text-red-700 font-semibold text-sm mt-2 animate-pulse">
          🎙️ સાંભળી રહ્યું છે... ગુજરાતીમાં બોલો
        </p>
      )}

      {errorMsg && (
        <p className="text-amber-700 text-xs mt-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
