import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TrybeTunesProvider from './context/TrybeTunesProvider'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TrybeTunesProvider>
      <App />
    </TrybeTunesProvider>
  </BrowserRouter>
);
