import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: { background: '#2D1B0E', color: '#fcd34d', border: '1px solid #92400e' },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
