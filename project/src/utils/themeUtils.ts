/**
 * Theme Management Utilities
 * 
 * This module provides functionality for managing the application's theme (light/dark mode).
 * It includes a custom hook for theme management and utilities for detecting user preferences.
 */

import { useEffect, useState } from 'react';
import { ThemeMode } from '../types';

/**
 * Determines the initial theme based on user preferences and stored settings
 * Checks in the following order:
 * 1. Previously stored theme in localStorage
 * 2. User's system preference for dark mode
 * 3. Defaults to light mode if no preference is found
 * 
 * @returns {ThemeMode} The initial theme to use
 */
const getInitialTheme = (): ThemeMode => {
  // Check for previously stored theme preference
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as ThemeMode;
  }

  // Check user's system preference for dark mode
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Custom hook for managing the application theme
 * Provides the current theme and a function to update it
 * 
 * @returns {[ThemeMode, (theme: ThemeMode) => void]} Tuple containing:
 *   - Current theme
 *   - Function to update the theme
 * 
 * @example
 * const [theme, setTheme] = useTheme();
 * // Use theme to conditionally style components
 * // Use setTheme to toggle between light and dark modes
 */
export const useTheme = (): [ThemeMode, (theme: ThemeMode) => void] => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme());

  /**
   * Updates the theme and persists it to localStorage
   * @param {ThemeMode} newTheme - The new theme to apply
   */
  const updateTheme = (newTheme: ThemeMode) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  // Update document class when theme changes
  useEffect(() => {
    // Add or remove the dark class from the document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return [theme, updateTheme];
};
