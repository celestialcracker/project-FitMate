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

const Dashboard: React.FC = () => {
  const user = getCurrentUser() as User;
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

  const handleWaterUpdate = (newAmount: number) => {
    setStats(prev => ({
      ...prev,
      waterIntake: newAmount
    }));
  };

  // Calculate calorie percentage
  const caloriePercentage = Math.min(
    100,
    Math.round((stats.caloriesConsumed / user.dailyCalorieTarget) * 100)
  );

  // Calculate workout percentage
  const workoutPercentage = Math.min(
    100,
    Math.round((stats.completedExercises / (dailyLog?.exercises.length || 1)) * 100)
  );

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
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome, {user.name.split(' ')[0]}</h1>
        <p className="text-blue-100">Let's crush today's goals!</p>
      </header>

      <main className="mx-auto max-w-md p-4">
        <section className="mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Macronutrients</h2>
          <div className="flex space-x-4">
            <MacroCard
              consumed={stats.proteinConsumed}
              target={user.dailyProteinTarget}
              label="Protein"
              unit="g"
              color="#4F46E5" // Indigo
            />
            
            <MacroCard
              consumed={stats.carbsConsumed}
              target={130} // Example target
              label="Carbs"
              unit="g"
              color="#F59E0B" // Amber
            />
            
            <MacroCard
              consumed={stats.fatConsumed}
              target={70} // Example target
              label="Fat"
              unit="g"
              color="#EC4899" // Pink
            />
          </div>
        </section>

        <section className="mb-8">
          <WaterTracker
            currentWater={stats.waterIntake}
            goalWater={user.dailyWaterTarget}
            onUpdate={handleWaterUpdate}
          />
        </section>

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
            
            <div className="mt-2 flex justify-between">
              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${workoutPercentage}%` }}
                  className="h-full rounded-full bg-green-500"
                />
              </div>
            </div>
            
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

      <NavBar />
    </div>
  );
};

export default Dashboard;