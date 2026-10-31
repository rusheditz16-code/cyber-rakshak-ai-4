import React, { useState, useEffect } from 'react';
import { Volume2, Pause } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/speechUtils';

export default function AudioSpeaker({ audioUrl, speechText, label = "સાંભળો" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopAudio();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (audioUrl) {
      playAudio(
        audioUrl,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => {
          // If server audio fails, fallback to browser speech synthesis
          fallbackSpeech();
        }
      );
    } else {
      fallbackSpeech();
    }
  };

  const fallbackSpeech = () => {
    const textToSpeak = speechText || label;
    if ('speechSynthesis' in window && textToSpeak) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'gu-IN';
      utterance.rate = 0.9; // natural rural speaking pace
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition shadow-sm ${
        isPlaying
          ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
      }`}
      title="Click to listen in spoken Gujarati"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-4">
            <span className="w-1 bg-white rounded soundwave-bar"></span>
            <span className="w-1 bg-white rounded soundwave-bar"></span>
            <span className="w-1 bg-white rounded soundwave-bar"></span>
            <span className="w-1 bg-white rounded soundwave-bar"></span>
          </div>
          <span>બંધ કરો</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
