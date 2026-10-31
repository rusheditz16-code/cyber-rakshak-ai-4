import React, { useState, useEffect } from 'react';
import { BookOpen, ShieldCheck, HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';

export default function AwarenessHubPage() {
  const [content, setContent] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    fetch('/api/awareness/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error fetching awareness content:", err));
  }, []);

  const handleSelectOption = (qId, optionIdx, correctIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500">
        માહિતી લોડ થઈ રહી છે...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-2">
        <span className="bg-emerald-700 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          સુરક્ષિત ગામડું, સમૃદ્ધ બોટાદ
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          સાયબર સુરક્ષા જાગૃતિ કેન્દ્ર (Cyber Awareness Hub)
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
          સરળ ગુજરાતીમાં ૪ સોનેરી નિયમો, ગ્રામીણ વાર્તાઓ અને ક્વિઝ દ્વારા સાયબર સ્કેમથી બચવાના ઉપાયો શીખો.
        </p>
      </div>

      {/* 4 Golden Cyber Rules */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <span>સાયબર સુરક્ષાના ૪ સોનેરી નિયમો</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.golden_rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-400 transition"
            >
              <h4 className="font-extrabold text-base text-emerald-900">
                {rule.title_gu}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {rule.desc_gu}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rural Audio Stories / Case Studies */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-700" />
          <span>વાસ્તવિક ગ્રામીણ વાર્તાઓ (બોધપાઠ)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.audio_stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {story.character}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 mt-2">
                  {story.title_gu}
                </h4>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{story.script_gu}"
                </p>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
                💡 બોધપાઠ: {story.moral_gu}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Safety Quiz */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <Award className="w-6 h-6 text-amber-600" />
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              સાયબર સુરક્ષા ક્વિઝ (તમારી જાગૃતિ ચકાસો)
            </h3>
            <p className="text-xs text-slate-500">
              સાચો જવાબ આપીને સાયબર રક્ષક બનો
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {content.quiz_questions.map((q, qIndex) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correct_index;

            return (
              <div key={q.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <p className="font-bold text-sm text-slate-900">
                  પ્રશ્ન {qIndex + 1}: {q.question_gu}
                </p>

                <div className="space-y-2">
                  {q.options_gu.map((opt, optIndex) => {
                    let btnStyle = "bg-white border-slate-300 text-slate-700 hover:bg-slate-100";
                    if (hasAnswered) {
                      if (optIndex === q.correct_index) {
                        btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400";
                      } else if (optIndex === chosen) {
                        btnStyle = "bg-red-100 border-red-500 text-red-950 font-bold";
                      } else {
                        btnStyle = "bg-white border-slate-200 text-slate-400";
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(q.id, optIndex, q.correct_index)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && optIndex === q.correct_index && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        )}
                        {hasAnswered && optIndex === chosen && optIndex !== q.correct_index && (
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                    {q.explanation_gu}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
