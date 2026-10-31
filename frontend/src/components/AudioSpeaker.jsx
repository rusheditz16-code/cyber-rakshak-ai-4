import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/speechUtils';

export default function AudioSpeaker({ audioUrl, label = "સાંભળો" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  if (!audioUrl) return null;

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      playAudio(
        audioUrl,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <button
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
