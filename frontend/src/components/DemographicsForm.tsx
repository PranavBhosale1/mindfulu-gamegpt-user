import React, { useState } from 'react';

interface Props {
  onSubmit: (age: number, gender: string, status: string) => void;
  isLoading: boolean;
  onBack: () => void;
}

export const DemographicsForm = ({ onSubmit, isLoading, onBack }: Props) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('Student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && gender && !isLoading) {
      onSubmit(parseInt(age), gender, status);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Tell us a bit about yourself</h1>
      <p>This helps us personalize the questions and recommendations for you.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Age *</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required min="15" max="100" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Gender *</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
            <option value="" disabled>Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Current Status *</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
            <option value="Student">Student</option>
            <option value="Working">Working Professional</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={onBack} style={{ padding: '10px 20px' }}>Back</button>
            <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', flexGrow: 1 }}>
              {isLoading ? 'Loading...' : 'Begin Assessment'}
            </button>
        </div>
      </form>
    </div>
  );
};