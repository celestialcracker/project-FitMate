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

// Mock users storage
let users: User[] = [...MOCK_USERS];
let authUser: AuthUser | null = null;

// Check if we have a stored user in localStorage
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

// Initialize auth state
loadAuthState();

// Login function
export const login = (email: string, password: string): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && password === password
      );
      
      if (user) {
        const authUserData: AuthUser = {
          ...user,
          token: `mock-token-${user.id}-${Date.now()}`
        };
        
        // Store in localStorage
        localStorage.setItem('fitmate_user', JSON.stringify(authUserData));
        authUser = authUserData;
        resolve(authUserData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

// Register function
export const register = (
  name: string, 
  email: string, 
  password: string
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingUser) {
        reject(new Error('Email already in use'));
        return;
      }
      
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
      
      // Store in localStorage
      localStorage.setItem('fitmate_user', JSON.stringify(authUserData));
      authUser = authUserData;
      resolve(authUserData);
    }, 500);
  });
};

// Logout function
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('fitmate_user');
      authUser = null;
      resolve();
    }, 300);
  });
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  return authUser;
};

// Update user profile
export const updateUserProfile = (
  updatedData: Partial<Omit<User, 'id' | 'email'>>
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    if (!authUser) {
      reject(new Error('No authenticated user'));
      return;
    }

    setTimeout(() => {
      // Update user in the array
      users = users.map(user => 
        user.id === authUser?.id ? { ...user, ...updatedData } : user
      );
      
      // Update auth user
      const updatedAuthUser: AuthUser = {
        ...authUser,
        ...updatedData
      };
      
      localStorage.setItem('fitmate_user', JSON.stringify(updatedAuthUser));
      authUser = updatedAuthUser;
      resolve(updatedAuthUser);
    }, 500);
  });
};
