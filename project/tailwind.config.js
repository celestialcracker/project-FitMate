/**
 * Tailwind CSS Configuration File
 * 
 * This file configures Tailwind CSS, a utility-first CSS framework.
 * It defines which files Tailwind should scan for classes and any customizations
 * to the default theme.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
