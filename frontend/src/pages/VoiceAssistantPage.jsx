import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import VoiceMicButton from '../components/VoiceMicButton';
import AudioSpeaker from '../components/AudioSpeaker';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceAssistantPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text_gu: 'નમસ્તે! હું બોટાદ સાયબર રક્ષક આસિસ્ટન્ટ છું. તમે મને કોઈ પણ સાયબર ફ્રોડ, લાઈટ બિલ, બેંક KYC કે સરકારી સહાય યોજનાના મેસેજ વિશે બોલીને કે લખીને પૂછી શકો છો.',
      audio_url: null,
      actions: ["શું બેંક OTP માંગે?", "લાઈટ બિલ મેસેજ", "પીએમ કિસાન સહાય"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text_gu: text
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: 'gu', taluka: 'BOTAD_HQ' })
      });
      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text_gu: data.reply_gu,
        audio_url: data.audio_url,
        actions: data.suggested_actions
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text_gu: 'માફ કરશો, સર્વર સાથે સંપર્કમાં સમસ્યા આવી. કૃપા કરીને થોડીવાર પછી પ્રયાસ કરો.'
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Bot className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="font-bold text-lg">બોટાદ સાયબર વૉઇસ સહાયક</h2>
            <p className="text-xs text-emerald-200">
              ગુજરાતીમાં બોલીને સલાહ મેળવો (Voice AI Assistant)
            </p>
          </div>
        </div>
        <span className="text-xs bg-emerald-700/80 px-2.5 py-1 rounded-full text-emerald-100 font-semibold border border-emerald-500/30">
          સક્રિય
        </span>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 h-[500px] overflow-y-auto space-y-4 flex flex-col">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${
              m.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                m.sender === 'user' ? 'bg-emerald-700' : 'bg-slate-800'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl space-y-2 shadow-sm ${
                m.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {m.text_gu}
              </p>

              {m.audio_url && (
                <div className="pt-1">
                  <AudioSpeaker audioUrl={m.audio_url} label="સંભળાવો" />
                </div>
              )}

              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/50">
                  {m.actions.map((act, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(act)}
                      className="text-xs bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 font-bold px-2.5 py-1 rounded-full transition"
                    >
                      👉 {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="self-start flex items-center gap-2 text-slate-500 text-xs font-semibold p-2 bg-slate-50 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-100"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-200"></span>
            <span>જવાબ તૈયાર થઈ રહ્યો છે...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-200 flex items-center gap-2">
        <div className="scale-75 -my-4 -ml-2">
          <VoiceMicButton
            onTranscript={(txt) => {
              setInputText(txt);
              handleSendMessage(txt);
            }}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        </div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="અહીં ગુજરાતીમાં પ્રશ્ન લખો અથવા માઇક પર બોલો..."
          className="flex-1 p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || loading}
          className="bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-xl transition disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
