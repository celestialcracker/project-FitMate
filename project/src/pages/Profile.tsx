import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Calendar, 
  LogOut, 
  Moon, 
  Sun, 
  Award 
} from 'lucide-react';
import { getCurrentUser, logout } from '../utils/authUtils';
import { useTheme } from '../utils/themeUtils';
import ProfileForm from '../components/ProfileForm';
import NavBar from '../components/NavBar';
import { User } from '../types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser() as User);
  const [theme, setTheme] = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const calculateMembershipDuration = () => {
    if (!user.joinedDate) return 'N/A';
    
    const joined = new Date(user.joinedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-gray-700 to-gray-600 p-6 text-white">
        <div className="flex items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-800">
            <UserIcon className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-200">{user.email}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md p-4">
        {isEditing ? (
          <section className="card mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
            
            <ProfileForm 
              user={user} 
              onUpdate={(updatedUser) => {
                setUser(updatedUser);
                setIsEditing(false);
              }}
            />
          </section>
        ) : (
          <section className="card mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                  <p className="font-medium">{user.age || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <p className="font-medium">{user.weight ? `${user.weight} kg` : 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                  <p className="font-medium">{user.height ? `${user.height} cm` : 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Goal</p>
                  <p className="font-medium">{user.goal || 'Not set'}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Targets</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-center dark:bg-blue-900/20">
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {user.dailyCalorieTarget}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Calories</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-center dark:bg-blue-900/20">
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {user.dailyProteinTarget}g
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Protein</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-center dark:bg-blue-900/20">
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {user.dailyWaterTarget}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Glasses</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="card mb-6">
          <h2 className="mb-4 text-lg font-semibold">Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member for</p>
                <p className="font-medium">{calculateMembershipDuration()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                <p className="font-medium">
                  {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <button 
            onClick={toggleTheme} 
            className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow dark:bg-gray-800"
          >
            <div className="flex items-center">
              {theme === 'dark' ? (
                <Moon className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Sun className="mr-3 h-5 w-5 text-amber-600 dark:text-amber-400" />
              )}
              <span>
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </span>
            </div>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="flex w-full items-center rounded-lg bg-white p-4 text-red-600 shadow hover:bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/10"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log Out</span>
          </button>
        </section>
      </main>

      <NavBar />
    </div>
  );
};

export default Profile;