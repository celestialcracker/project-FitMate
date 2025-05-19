import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, BarChart2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/exercises', icon: Dumbbell, label: 'Exercises' },
    { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
    { path: '/progress', icon: BarChart2, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 z-10 w-full border-t border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-gray-900 sm:py-3">
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'nav-link-active' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -top-3 h-1 w-10 rounded-full bg-blue-500"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
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