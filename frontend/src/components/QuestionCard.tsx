// /assessment_engine/frontend/components/QuestionCard.tsx

import React from 'react';
import { Question } from '../types/assessment';

interface Props {
  question: Question;
  onAnswer: (questionId: string, value: any) => void;
}

export const QuestionCard = ({ question, onAnswer }: Props) => (
  <div style={{ marginTop: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', minHeight: '3em' }}>{question.text}</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.5rem' }}>
      {question.answerOptions.map(option => (
        <button key={option.value} onClick={() => onAnswer(question.questionId, option.value)} style={{ padding: '12px', fontSize: '16px' }}>
          {option.text}
        </button>
      ))}
    </div>
  </div>
);