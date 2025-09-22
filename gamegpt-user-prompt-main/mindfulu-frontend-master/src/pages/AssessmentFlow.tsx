import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
  'How often have you felt nervous, anxious, or on edge?',
  'How often have you had trouble relaxing?',
  'How often have you felt that you could not stop or control worrying?',
  'How often have you had trouble concentrating on tasks?'
];

const OPTIONS = [
  { label: 'Not at all', score: 0 },
  { label: 'Several days', score: 1 },
  { label: 'More than half the days', score: 2 },
  { label: 'Nearly every day', score: 3 }
];

export default function AssessmentFlow() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const navigate = useNavigate();

  const progress = useMemo(() => (current / QUESTIONS.length) * 100, [current]);

  const selectAnswer = (idx: number) => {
    setAnswers((prev) => prev.map((v, i) => (i === current ? idx : v)));
  };

  const next = () => {
    if (answers[current] == null) return;
    if (current < QUESTIONS.length - 1) setCurrent((c) => c + 1);
    else {
      const total = answers.reduce((sum, idx) => sum + (idx != null ? OPTIONS[idx].score : 0), 0);
      const percent = Math.round((total / (QUESTIONS.length * 3)) * 100);
      navigate(`/assessment-results?score=${percent}`);
    }
  };

  const prev = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <div className="bg-[var(--bg-cream)] text-[#1D2939] min-h-screen">
      <header className="flex items-center justify-between whitespace-nowrap px-10 py-5 bg-white shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 text-2xl font-bold text-[var(--brand-purple)]">
          <span className="material-symbols-outlined text-3xl">self_improvement</span>
          MindfulU
        </button>
        <nav className="hidden md:flex items-center gap-6 text-base font-medium text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-[var(--brand-purple)] transition-colors">Home</button>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Resources</a>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Community</a>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Support</a>
        </nav>
      </header>

      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mental Wellness Check-up</h1>
            <p className="mt-4 text-lg text-gray-600">A quick and private way to check in with yourself.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <p className="font-medium text-gray-700">Question {current + 1} of {QUESTIONS.length}</p>
                <p className="font-caveat text-xl text-gray-500">Your safe space</p>
              </div>
              <div className="progress"><div style={{width: `${progress}%`}} /></div>
            </div>

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">{QUESTIONS[current]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OPTIONS.map((opt, idx) => (
                <button
                  key={opt.label}
                  className={`py-3 px-4 rounded-lg border text-center transition-colors ${answers[current] === idx ? 'bg-[var(--brand-purple)] text-white border-transparent' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                  onClick={() => selectAnswer(idx)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <button onClick={prev} disabled={current === 0} className="py-3 px-6 text-base font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50">Previous</button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Your responses are confidential.</span>
              </div>
              <button onClick={next} className="py-3 px-8 text-base font-semibold text-white bg-[var(--brand-purple)] hover:bg-purple-700 rounded-lg shadow-md transition-all">{current === QUESTIONS.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
