import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/portrait.css';
import './styles/glass-slide.css';
import './styles/chat-header-motion.css';
import './styles/contribution.css';
import './styles/halloween.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
