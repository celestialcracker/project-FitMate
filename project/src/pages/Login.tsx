/**
 * Login Page Component
 * 
 * A page that handles user authentication and login functionality.
 * Features:
 * - Email and password authentication
 * - Form validation
 * - Loading states
 * - Error handling
 * - Animated transitions
 * - Dark mode support
 * - Responsive design
 * - Navigation to registration
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock } from 'lucide-react';
import { login } from '../utils/authUtils';
import { motion } from 'framer-motion';

/**
 * Login Component
 * 
 * Renders a login form with email and password fields.
 * Handles form submission, authentication, and navigation.
 * 
 * @returns {JSX.Element} Rendered login page
 */
const Login: React.FC = () => {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  /**
   * Handles form submission and authentication
   * Attempts to log in the user and navigates to dashboard on success
   * Displays error message on failure
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      {/* Animated Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow dark:bg-gray-800"
      >
        {/* Header Section */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Dumbbell className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <h1 className="mb-1 text-2xl font-bold">Welcome to FitMate</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-500 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input Field */}
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full py-2.5"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
