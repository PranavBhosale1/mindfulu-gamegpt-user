import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--bg-cream)] min-h-screen">
      <div className="flex">
        <aside className="w-80 bg-white p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[var(--brand-purple)] rounded"></div>
              <h1 className="text-gray-800 text-2xl font-bold">MindfulU</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--brand-purple)] text-white font-semibold">Overview</button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-[var(--brand-purple)] transition-colors">Assessment Trends</button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-[var(--brand-purple)] transition-colors">Resource Engagement</button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-[var(--brand-purple)] transition-colors">User Demographics</button>
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-[var(--brand-purple)] transition-colors">Back to App</button>
          </div>
        </aside>
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-8">
            <header>
              <h2 className="text-4xl font-bold text-gray-800">Overview</h2>
              <p className="text-gray-500 mt-1">Welcome to the MindfulU Admin Dashboard.</p>
            </header>
            <section>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow transition-transform hover:scale-105">
                  <h4 className="text-gray-600 font-medium text-lg">Total Active Students</h4>
                  <p className="text-4xl font-bold text-[var(--brand-purple)] mt-2">1,250</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow transition-transform hover:scale-105">
                  <h4 className="text-gray-600 font-medium text-lg">Assessments Completed</h4>
                  <p className="text-4xl font-bold text-[var(--brand-pink)] mt-2">320</p>
                  <p className="text-sm text-gray-500 mt-1">This month</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow transition-transform hover:scale-105">
                  <h4 className="text-gray-600 font-medium text-lg">Average Stress Score</h4>
                  <p className="text-4xl font-bold text-[var(--brand-yellow)] mt-2">6.2</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
