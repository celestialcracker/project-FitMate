/**
 * FitMate Application Entry Point
 * 
 * This file serves as the main entry point for the FitMate React application.
 * It handles:
 * - React application initialization
 * - Root DOM element mounting
 * - Strict Mode enforcement
 * - Global styles import
 * 
 * The application is bootstrapped using React 18's createRoot API for
 * improved concurrent rendering capabilities.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
