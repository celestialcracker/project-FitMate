/**
 * Authentication Utilities
 * 
 * This module provides authentication-related functionality including:
 * - User login and registration
 * - Session management
 * - User profile updates
 * 
 * Note: This is a mock implementation that simulates API calls and uses localStorage
 * for persistence. In a production environment, this would be replaced with actual
 * API calls to a backend service.
 */

import { User, AuthUser } from '../types';
import { MOCK_USERS } from '../data/mockData';

// In-memory storage for users and current authenticated user
let users: User[] = [...MOCK_USERS];
let authUser: AuthUser | null = null;

/**
 * Loads the authentication state from localStorage
 * Called on module initialization to restore any existing session
 */
const loadAuthState = (): void => {
  try {
    const storedUser = localStorage.getItem('fitmate_user');
    if (storedUser) {
      authUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Failed to load auth state', error);
  }
};

// Initialize auth state on module load
loadAuthState();

/**
 * Authenticates a user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<AuthUser>} Promise resolving to authenticated user data
 * @throws {Error} If credentials are invalid
 */
export const login = (email: string, password: string): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    // Simulate API call with timeout
    setTimeout(() => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && password === password
      );
      
      if (user) {
        const authUserData: AuthUser = {
          ...user,
          token: `mock-token-${user.id}-${Date.now()}`
        };
        
        // Persist to localStorage
        localStorage.setItem('fitmate_user', JSON.stringify(authUserData));
        authUser = authUserData;
        resolve(authUserData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

/**
 * Registers a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<AuthUser>} Promise resolving to authenticated user data
 * @throws {Error} If email is already in use
 */
export const register = (
  name: string, 
  email: string, 
  password: string
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    // Simulate API call with timeout
    setTimeout(() => {
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingUser) {
        reject(new Error('Email already in use'));
        return;
      }
      
      // Create new user with default targets
      const newUser: User = {
        id: users.length + 1,
        name,
        email,
        dailyCalorieTarget: 2200,
        dailyProteinTarget: 140,
        dailyWaterTarget: 8,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      users = [...users, newUser];
      
      const authUserData: AuthUser = {
        ...newUser,
        token: `mock-token-${newUser.id}-${Date.now()}`
      };
      
      // Persist to localStorage
      localStorage.setItem('fitmate_user', JSON.stringify(authUserData));
      authUser = authUserData;
      resolve(authUserData);
    }, 500);
  });
};

/**
 * Logs out the current user
 * Clears the authentication state from memory and localStorage
 * @returns {Promise<void>} Promise that resolves when logout is complete
 */
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('fitmate_user');
      authUser = null;
      resolve();
    }, 300);
  });
};

/**
 * Gets the currently authenticated user
 * @returns {AuthUser | null} The authenticated user or null if not logged in
 */
export const getCurrentUser = (): AuthUser | null => {
  return authUser;
};

/**
 * Updates the current user's profile information
 * @param {Partial<Omit<User, 'id' | 'email'>>} updatedData - Object containing updated user data
 * @returns {Promise<AuthUser>} Promise resolving to updated user data
 * @throws {Error} If no user is authenticated
 */
export const updateUserProfile = (
  updatedData: Partial<Omit<User, 'id' | 'email'>>
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    if (!authUser) {
      reject(new Error('No authenticated user'));
      return;
    }

    setTimeout(() => {
      // Update user in the users array
      users = users.map(user => 
        user.id === authUser?.id ? { ...user, ...updatedData } : user
      );
      
      // Update authenticated user data
      const updatedAuthUser: AuthUser = {
        ...authUser,
        ...updatedData
      };
      
      // Persist changes to localStorage
      localStorage.setItem('fitmate_user', JSON.stringify(updatedAuthUser));
      authUser = updatedAuthUser;
      resolve(updatedAuthUser);
    }, 500);
  });
};
