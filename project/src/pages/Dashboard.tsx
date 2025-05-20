/**
 * Dashboard Page Component
 * 
 * The main dashboard page that displays the user's daily fitness overview.
 * Features:
 * - Daily calorie and workout progress tracking
 * - Macronutrient consumption monitoring
 * - Water intake tracking
 * - Today's exercise plan summary
 * - Responsive design with dark mode support
 * - Animated progress indicators
 * - Real-time data updates
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../utils/authUtils';
import { DailyLog, User } from '../types';
import { calculateTodayStats, getTodayLog } from '../utils/dataUtils';
import ProgressRing from '../components/ProgressRing';
import WaterTracker from '../components/WaterTracker';
import MacroCard from '../components/MacroCard';
import NavBar from '../components/NavBar';
import { Dumbbell } from 'lucide-react';

/**
 * Dashboard Component
 * 
 * Renders the main dashboard with user's daily fitness metrics and goals.
 * Manages state for daily log, statistics, and loading status.
 * 
 * @returns {JSX.Element} Rendered dashboard page
 */
const Dashboard: React.FC = () => {
  // Get current user data
  const user = getCurrentUser() as User;
  
  // State for daily log and statistics
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [stats, setStats] = useState({
    caloriesConsumed: 0,
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatConsumed: 0,
    waterIntake: 0,
    completedExercises: 0
  });
  const [loading, setLoading] = useState(true);

  /**
   * Fetch daily log and calculate statistics on component mount
   * Updates state with fetched data and calculated stats
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get today's log
        const log = await getTodayLog();
        setDailyLog(log);
        
        // Calculate stats
        const todayStats = await calculateTodayStats();
        setStats(todayStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  /**
   * Updates water intake in stats when changed
   * @param {number} newAmount - New water intake amount
   */
  const handleWaterUpdate = (newAmount: number) => {
    setStats(prev => ({
      ...prev,
      waterIntake: newAmount
    }));
  };

  // Calculate progress percentages
  const caloriePercentage = Math.min(
    100,
    Math.round((stats.caloriesConsumed / user.dailyCalorieTarget) * 100)
  );

  const workoutPercentage = Math.min(
    100,
    Math.round((stats.completedExercises / (dailyLog?.exercises.length || 1)) * 100)
  );

  // Loading state UI
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Dumbbell className="mx-auto h-10 w-10 animate-pulse text-blue-500" />
          <p className="mt-4">Loading your fitness data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome, {user.name.split(' ')[0]}</h1>
        <p className="text-blue-100">Let's crush today's goals!</p>
      </header>

      <main className="mx-auto max-w-md p-4">
        {/* Progress Overview Section */}
        <section className="mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* Calories Progress Card */}
            <div className="card flex-1">
              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={caloriePercentage} 
                  size={100} 
                  strokeWidth={10} 
                  color="#3B82F6"
                >
                  <div className="text-center">
                    <span className="block text-sm text-gray-600 dark:text-gray-400">Calories</span>
                    <span className="text-xl font-bold">{caloriePercentage}%</span>
                  </div>
                </ProgressRing>
                
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>{stats.caloriesConsumed}</strong> / {user.dailyCalorieTarget} cal
                </p>
              </div>
            </div>
            
            {/* Workout Progress Card */}
            <div className="card flex-1">
              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={workoutPercentage} 
                  size={100} 
                  strokeWidth={10} 
                  color="#10B981"
                >
                  <div className="text-center">
                    <span className="block text-sm text-gray-600 dark:text-gray-400">Workout</span>
                    <span className="text-xl font-bold">{stats.completedExercises}/{dailyLog?.exercises.length}</span>
                  </div>
                </ProgressRing>
                
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  exercises completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Macronutrients Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Macronutrients</h2>
          <div className="flex space-x-4">
            {/* Protein Card */}
            <MacroCard
              consumed={stats.proteinConsumed}
              target={user.dailyProteinTarget}
              label="Protein"
              unit="g"
              color="#4F46E5" // Indigo
            />
            
            {/* Carbs Card */}
            <MacroCard
              consumed={stats.carbsConsumed}
              target={130} // Example target
              label="Carbs"
              unit="g"
              color="#F59E0B" // Amber
            />
            
            {/* Fat Card */}
            <MacroCard
              consumed={stats.fatConsumed}
              target={70} // Example target
              label="Fat"
              unit="g"
              color="#EC4899" // Pink
            />
          </div>
        </section>

        {/* Water Tracker Section */}
        <section className="mb-8">
          <WaterTracker
            currentWater={stats.waterIntake}
            goalWater={user.dailyWaterTarget}
            onUpdate={handleWaterUpdate}
          />
        </section>

        {/* Today's Plan Section */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Today's Plan</h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="card"
          >
            <h3 className="font-medium">Exercises to Complete</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stats.completedExercises} of {dailyLog?.exercises.length} completed
            </p>
            
            {/* Progress Bar */}
            <div className="mt-2 flex justify-between">
              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${workoutPercentage}%` }}
                  className="h-full rounded-full bg-green-500"
                />
              </div>
            </div>
            
            {/* Workout Navigation Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {/* Navigate to exercises */}}
              className="mt-4 w-full rounded-lg bg-green-50 py-2 text-center font-medium text-green-600
                dark:bg-green-900/20 dark:text-green-400"
            >
              Go to Workout
            </motion.button>
          </motion.div>
        </section>
      </main>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default Dashboard;
