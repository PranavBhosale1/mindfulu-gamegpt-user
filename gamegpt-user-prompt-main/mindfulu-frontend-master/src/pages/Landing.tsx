import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-cream)]">
      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="size-9 bg-[var(--brand-purple)] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h2 className="font-extrabold text-2xl tracking-tight text-[var(--text-dark)]">MindfulU</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigate('/dashboard')} className="text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-colors">For Students</button>
            <a className="text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-colors" href="#">For Universities</a>
            <a className="text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="hidden sm:inline text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)]">Sign In</button>
            <button onClick={() => navigate('/assessment')} className="px-5 py-2.5 rounded-full text-sm font-bold bg-[var(--brand-purple)] text-white shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">Get Early Access</button>
          </div>
        </header>

        <main className="relative mt-8">
          <section className="relative text-center pt-8 pb-16">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter text-[var(--text-dark)]">
              A <span className="text-[var(--brand-purple)]">Private Space</span> for your<br className="hidden sm:block" />
              <span className="text-[var(--brand-pink)]">Well-being</span>
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-[var(--text-medium)] leading-relaxed">
              Navigating higher education in India can be tough. MindfulU provides a secure and anonymous platform for students to manage stress, access resources, and connect with support, prioritizing your mental health journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/assessment')} className="px-8 py-3.5 rounded-full text-base font-bold bg-[var(--brand-purple)] text-white shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">Request Access</button>
              <a href="#learn-more" className="px-8 py-3.5 rounded-full text-base font-bold bg-white text-[var(--text-dark)] shadow-md hover:bg-gray-50 transition-colors w-full sm:w-auto">Learn More</a>
            </div>
          </section>

          <section id="learn-more" className="py-16">
            <div className="text-center">
              <h2 className="font-extrabold text-3xl sm:text-4xl text-[var(--text-dark)]">Your Personal Toolkit for Well-being</h2>
              <p className="font-caveat text-4xl sm:text-5xl text-[var(--brand-yellow)] -mt-2">Always Here for You</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { emoji: '🤫', title: 'Confidential Check-ups', text: 'Regularly assess your mental state with our private, guided check-in tools.' },
                { emoji: '🤖', title: '24/7 AI Guide', text: 'Get instant, supportive guidance from our AI companion, anytime you need to talk.' },
                { emoji: '🧘‍♀️', title: 'Interactive Activities', text: 'Engage with mindfulness exercises, journaling prompts, and mood-boosting activities.' },
                { emoji: '🔗', title: 'Seamlessly Connect', text: 'Optionally connect with university counselors or peer support networks, securely.' },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="mx-auto bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] size-16 rounded-2xl flex items-center justify-center"><span className="text-4xl">{c.emoji}</span></div>
                  <h3 className="font-bold text-xl text-[var(--text-dark)] mt-5">{c.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-medium)]">{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-pink-500 my-16 rounded-3xl text-center text-white py-16 px-8">
            <h2 className="font-extrabold text-3xl sm:text-4xl">Ready to prioritize your well-being?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/80 leading-relaxed">
              Join the waitlist to be among the first to experience a new standard in student mental health support.
            </p>
            <div className="mt-8 flex justify-center">
              <button onClick={() => navigate('/assessment')} className="px-8 py-4 rounded-full text-base font-bold bg-white text-[var(--brand-purple)] shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300">Get Early Access</button>
            </div>
          </section>
        </main>

        <footer className="mt-16 py-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-1 md:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="size-9 bg-[var(--brand-purple)] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h2 className="font-extrabold text-2xl tracking-tight text-[var(--text-dark)]">MindfulU</h2>
              </div>
              <p className="mt-4 text-sm text-[var(--text-medium)]">A private space for students to navigate life's challenges.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[var(--text-dark)]">Product</h4>
              <ul className="mt-4 space-y-3">
                <li><button onClick={() => navigate('/dashboard')} className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]">For Students</button></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">For Universities</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Pricing</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[var(--text-dark)]">Company</h4>
              <ul className="mt-4 space-y-3">
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">About Us</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Careers</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Blog</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[var(--text-dark)]">Legal</h4>
              <ul className="mt-4 space-y-3">
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Privacy Policy</a></li>
                <li><a className="text-sm text-[var(--text-medium)] hover:text-[var(--text-dark)]" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-[var(--text-medium)]">© 2024 MindfulU. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
