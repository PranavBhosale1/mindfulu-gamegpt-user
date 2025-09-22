import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AssessmentResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const raw = parseInt(params.get('score') || '0', 10);
  const score = Math.max(0, Math.min(100, isNaN(raw) ? 0 : raw));
  const [progress, setProgress] = useState(0);

  const label = useMemo(() => (score < 34 ? 'low stress' : score < 67 ? 'mild stress' : 'elevated stress'), [score]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="bg-[var(--bg-cream)] min-h-screen">
      <header className="flex items-center justify-between whitespace-nowrap px-10 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 text-2xl font-bold text-[var(--brand-purple)]">
          <span className="material-symbols-outlined text-4xl">self_improvement</span>
          <h1 className="font-bold text-2xl" style={{fontFamily:'Poppins, sans-serif'}}>MindfulU</h1>
        </div>
        <nav className="flex items-center gap-8 text-gray-600">
          <button onClick={() => navigate('/')} className="text-base font-medium hover:text-[var(--brand-purple)] transition-colors">Home</button>
          <button onClick={() => navigate('/dashboard')} className="text-base font-medium hover:text-[var(--brand-purple)] transition-colors">Dashboard</button>
        </nav>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Your Stress Assessment Results</h2>
          <div className="mb-12 text-center">
            <p className="text-2xl font-semibold text-gray-800">Your score suggests you may be experiencing <span className="font-caveat text-3xl text-[var(--brand-purple)]">{label}</span></p>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-600">Your Stress Level</span>
              <span className="text-lg font-bold text-[var(--brand-purple)]">{score}%</span>
            </div>
            <div className="score"><div style={{ width: `${progress}%` }} /></div>
            <p className="text-sm text-gray-500 mt-3 text-center">This indicates that you're managing well, but there might be areas where you could benefit from additional support. Remember, it's okay to seek help and explore strategies to enhance your well-being.</p>
          </div>

          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Clear, Actionable Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { color: 'var(--brand-teal)', icon: 'spa', title: 'Explore Relaxation Techniques', cta: 'Learn More' },
              { color: 'var(--brand-yellow)', icon: 'groups', title: 'Connect with a Counselor', cta: 'Book a Session' },
              { color: 'var(--brand-pink)', icon: 'auto_stories', title: 'Access Self-Help Resources', cta: 'View Resources' },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="p-4 rounded-full mb-4" style={{ background: card.color }}>
                    <span className="material-symbols-outlined text-4xl text-white">{card.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h4>
                  <p className="text-gray-600 mb-4">Discover curated items to help you move forward.</p>
                  <button className="mt-auto inline-block text-white font-semibold py-2 px-6 rounded-full" style={{ background: card.color }}>{card.cta}</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">lock</span>
              Your report is private and will not be shared with anyone at the university. You are in full control.
            </p>
          </div>

          <div className="mt-10 text-center">
            <button onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-full bg-[var(--brand-purple)] text-white font-semibold shadow-md hover:bg-purple-700">Back to Dashboard</button>
          </div>
        </div>
      </main>
    </div>
  );
}
