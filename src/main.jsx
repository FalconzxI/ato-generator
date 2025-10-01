import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assicurati che punti al tuo componente principale

// QUESTA RIGA CARICA TUTTI GLI STILI E LI RENDE DISPONIBILI ALL'APP
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);