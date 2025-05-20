/**
 * Navbar Component
 * 
 * A responsive bottom navigation bar that provides navigation between main app sections.
 * Features:
 * - Fixed position at bottom of screen
 * - Responsive design (adjusts padding for different screen sizes)
 * - Active state indication with animated underline
 * - Dark mode support
 * - Icon and label for each navigation item
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, BarChart2, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Navigation item configuration type
 * @property {string} path - Route path for the navigation item
 * @property {React.ComponentType} icon - Icon component to display
 * @property {string} label - Display label for the navigation item
 */
type NavItem = {
  path: string;
  icon: React.ComponentType;
  label: string;
};

/**
 * Navbar Component
 * 
 * Renders a bottom navigation bar with animated active state indicators.
 * Uses React Router for navigation and Framer Motion for animations.
 * 
 * @returns {JSX.Element} Rendered navigation bar
 */
const NavBar: React.FC = () => {
  // Get current location for active state management
  const location = useLocation();
  
  // Navigation items configuration
  const navItems: NavItem[] = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/exercises', icon: Dumbbell, label: 'Exercises' },
    { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
    { path: '/progress', icon: BarChart2, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    // Fixed bottom navigation bar with responsive padding
    <nav className="fixed bottom-0 z-10 w-full border-t border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-gray-900 sm:py-3">
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          // Check if current route matches this nav item
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'nav-link-active' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <div className="relative flex flex-col items-center">
                {/* Animated underline indicator for active item */}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -top-3 h-1 w-10 rounded-full bg-blue-500"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                {/* Navigation item icon and label */}
                <item.icon className="mb-1 h-5 w-5" />
                <span>{item.label}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
