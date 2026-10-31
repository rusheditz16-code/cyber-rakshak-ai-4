// Audio player instance
let currentAudio = null;

export const playAudio = (url, onStart, onEnded, onError) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(url);
  currentAudio = audio;

  audio.onplay = () => {
    if (onStart) onStart();
  };

  audio.onended = () => {
    if (onEnded) onEnded();
    currentAudio = null;
  };

  audio.onerror = (e) => {
    console.error("Audio playback error:", e);
    if (onError) onError(e);
    currentAudio = null;
  };

  audio.play().catch((err) => {
    console.warn("Autoplay was prevented:", err);
    if (onError) onError(err);
  });

  return audio;
};

export const stopAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

// Web Speech API Voice Recognition
export const createSpeechRecognizer = (lang = 'gu-IN', onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("Speech Recognition API not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};
