import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[var(--bg-cream)]">
      <header className="flex items-center justify-between whitespace-nowrap px-10 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-zinc-800">
          <svg className="h-8 w-8 text-[var(--brand-purple)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <h2 className="text-zinc-800 text-2xl font-bold leading-tight tracking-[-0.015em]">MindfulU</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-zinc-600 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-[var(--brand-purple)] transition-colors">Home</button>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Resources</a>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Community</a>
          <a className="hover:text-[var(--brand-purple)] transition-colors" href="#">Support</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage:'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCxfP0sTfzcNtdgDGIEt3SKyRQFbiYXN2064tSeG16g-yhrvXtZEgCq3JwPXJ_sSE68heq0sDqwhCawPh5Q7fwVJLHewQT5yIi0Bi1ZqrzhfrcQ_gj1LN_SS6SCorM6j4ZtIIAPSKdqDpuLsjSLjvG97BRENgVkLV2yr3BGFkzwFVdd_nDP1Wbp-3H8tWh9yMGBKwC6-0gDXOFsvsggf-SmIY5l-9hVIdMQa2F5KsJ4F0E0GqtyLSiG0ba-jbwOMaQ3Ff2dOjyi6CA)'}} />
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-zinc-800 text-4xl md:text-5xl font-bold leading-tight">Hello Sarah, <span className="font-caveat text-[var(--brand-pink)]">how are you feeling today?</span></h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <button onClick={() => navigate('/assessment')} className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left">
              <h3 className="text-2xl font-bold text-zinc-800 mb-2">Take a Check-up</h3>
              <p className="text-zinc-500">Your privacy is our priority. Assess your well-being with our confidential check-up.</p>
            </button>
            <a className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" href="#">
              <h3 className="text-2xl font-bold text-zinc-800 mb-2">Interactive Activities</h3>
              <p className="text-zinc-500">Engage in fun and helpful exercises designed to boost your mood and reduce stress.</p>
            </a>
            <a className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" href="#">
              <h3 className="text-2xl font-bold text-zinc-800 mb-2">Talk to your AI Guide</h3>
              <p className="text-zinc-500">Have anonymous and secure conversations with your AI companion anytime, anywhere.</p>
            </a>
            <a className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" href="#">
              <h3 className="text-2xl font-bold text-zinc-800 mb-2">Connect with a Professional</h3>
              <p className="text-zinc-500">Book a confidential session with a licensed professional at your convenience.</p>
            </a>
          </div>

          <h2 className="text-3xl font-bold text-zinc-800 mb-8 text-center">Recommended For You</h2>
          <div className="space-y-6">
            {[1,2,3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="md:w-1/3 w-full h-48 md:h-full bg-gray-200" />
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-zinc-800 mb-2">Resource #{i}</h3>
                  <p className="text-zinc-500 mb-4">A helpful item to support your journey.</p>
                  <button className="flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-[var(--brand-teal)] text-white font-semibold hover:bg-teal-500 transition-colors">Start</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
