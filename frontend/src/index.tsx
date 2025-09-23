import React from 'react';
import ReactDOM from 'react-dom/client';
import { AssessmentPage } from './AssessmentPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AssessmentPage />
  </React.StrictMode>
);