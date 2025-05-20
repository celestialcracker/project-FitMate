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

// React core imports
import { StrictMode } from 'react';  // Enables additional development checks and warnings
import { createRoot } from 'react-dom/client';  // React 18's root API for concurrent rendering

// Application imports
import App from './App.tsx';  // Main application component
import './index.css';  // Global styles and Tailwind CSS

// Get the root DOM element
const rootElement = document.getElementById('root');

// Ensure root element exists
if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is a div with id="root" in your index.html');
}

// Create and render the root React component
createRoot(rootElement).render(
  // StrictMode helps identify potential problems in the application
  // It enables additional development checks and warnings
  <StrictMode>
    <App />
  </StrictMode>
);
