import React from 'react';
import { FinalReport } from '../types/assessment';

export const ReportDisplay = ({ report }: { report: FinalReport }) => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Your Report</h1>
    {report.escalation.isRequired && (
        <div style={{ border: '2px solid red', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
            <h3 style={{ color: 'red', marginTop: 0 }}>Important Note</h3>
            <p>{report.escalation.note}</p>
        </div>
    )}
    <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <p><strong>Score:</strong> {report.rawScore}</p>
      <p><strong>Interpretation:</strong> {report.interpretation} ({report.severity})</p>
    </div>
    <div style={{ marginTop: '1.5rem' }}>
        <h4>Summary</h4>
        <p>{report.personalizedSummary}</p>
    </div>
    <div style={{ marginTop: '1.5rem' }}>
        <h4>Recommendations</h4>
        <ul style={{ paddingLeft: '20px' }}>
            {report.personalizedRecommendations.map((rec, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{rec}</li>)}
        </ul>
    </div>
  </div>
);