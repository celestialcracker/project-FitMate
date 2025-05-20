/**
 * Exercises Page Component
 * 
 * A page that displays and manages the user's daily exercise routine.
 * Features:
 * - List of daily exercises with completion status
 * - Exercise filtering (All/To Do/Done)
 * - Progress tracking with visual indicator
 * - Animated exercise items
 * - Responsive design with dark mode support
 * - Real-time completion updates
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Exercise } from '../types';
import { getTodayLog } from '../utils/dataUtils';
import ExerciseItem from '../components/ExerciseItem';
import NavBar from '../components/NavBar';
import { Dumbbell } from 'lucide-react';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const todayLog = await getTodayLog();
        setExercises(todayLog.exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExercises();
  }, []);
  
  const handleToggleComplete = (updatedExercise: Exercise) => {
    setExercises(prev => 
      prev.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
    );
  };
  
  const filteredExercises = exercises.filter(exercise => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return exercise.completed;
    if (activeFilter === 'incomplete') return !exercise.completed;
    return true;
  });
  
  const completedCount = exercises.filter(ex => ex.completed).length;
  const progress = exercises.length > 0 
    ? Math.round((completedCount / exercises.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Dumbbell className="mx-auto h-10 w-10 animate-pulse text-blue-500" />
          <p className="mt-4">Loading your exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-6 text-white">
        <h1 className="text-2xl font-bold">Daily Workout</h1>
        <div className="mt-2">
          <div className="flex items-center">
            <div className="mr-3">
              <span className="text-lg font-semibold">{progress}%</span>
            </div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white bg-opacity-25">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-white"
              />
            </div>
            <div className="ml-3 text-sm">
              <span>{completedCount}/{exercises.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md p-4">
        <div className="mb-6 flex">
          <button
            className={`flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 py-2 font-medium 
              ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`flex-1 border border-gray-300 px-4 py-2 font-medium
              ${activeFilter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700'}`}
            onClick={() => setActiveFilter('incomplete')}
          >
            To Do
          </button>
          <button
            className={`flex-1 rounded-r-lg border border-l-0 border-gray-300 px-4 py-2 font-medium
              ${activeFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700'}`}
            onClick={() => setActiveFilter('completed')}
          >
            Done
          </button>
        </div>

        <AnimatePresence>
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExerciseItem
                  exercise={exercise}
                  onToggleComplete={handleToggleComplete}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400">
                {activeFilter === 'all' 
                  ? 'No exercises scheduled for today' 
                  : activeFilter === 'completed'
                    ? 'No completed exercises yet'
                    : 'All exercises completed!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NavBar />
    </div>
  );
};

export default Exercises;
