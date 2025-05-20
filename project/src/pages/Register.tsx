/**
 * Register Page Component
 * 
 * A page that handles new user registration and account creation.
 * Features:
 * - User registration form with validation
 * - Password confirmation
 * - Form error handling
 * - Loading states
 * - Animated transitions
 * - Dark mode support
 * - Responsive design
 * - Navigation to login
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock, User } from 'lucide-react';
import { register } from '../utils/authUtils';
import { motion } from 'framer-motion';

/**
 * Register Component
 * 
 * Renders a registration form with user information fields.
 * Handles form submission, validation, and account creation.
 * 
 * @returns {JSX.Element} Rendered registration page
 */
const Register: React.FC = () => {
  // Form state management
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  /**
   * Handles form submission and user registration
   * Validates password match and creates new account
   * Navigates to dashboard on success
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      {/* Animated Registration Card */}
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
          <h1 className="mb-1 text-2xl font-bold">Create an Account</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start your fitness journey with FitMate
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-500 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input Field */}
          <div>
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

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

          {/* Password Fields Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Password Input */}
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
                  minLength={6}
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                minLength={6}
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
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
