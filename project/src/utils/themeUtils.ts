import { useEffect, useState } from 'react';
import { ThemeMode } from '../types';

// Check if the user prefers dark mode
const getInitialTheme = (): ThemeMode => {
  // Check localStorage
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as ThemeMode;
  }

  // Check user preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const useTheme = (): [ThemeMode, (theme: ThemeMode) => void] => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme());

  const updateTheme = (newTheme: ThemeMode) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

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