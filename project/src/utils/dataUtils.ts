/**
 * Data Management Utilities
 * 
 * This module provides functions for managing application data including:
 * - Daily activity and nutrition logs
 * - Food items and meals
 * - Exercise tracking
 * - Progress statistics
 * 
 * Note: This is a mock implementation that uses localStorage for data persistence.
 * In a production environment, this would be replaced with actual API calls to a backend service.
 */

import { format } from 'date-fns';
import { DailyLog, Exercise, FoodItem, Meal, WeeklyProgress } from '../types';
import { MOCK_ALL_LOGS, MOCK_EXERCISES, MOCK_FOOD_ITEMS, MOCK_WEEKLY_PROGRESS } from '../data/mockData';

// Local storage keys for different data types
const LOGS_STORAGE_KEY = 'fitmate_logs';
const FOOD_STORAGE_KEY = 'fitmate_foods';
const EXERCISES_STORAGE_KEY = 'fitmate_exercises';

/**
 * Initializes the application data in localStorage if not already present
 * Uses mock data as initial values
 */
const initializeData = () => {
  if (!localStorage.getItem(LOGS_STORAGE_KEY)) {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(MOCK_ALL_LOGS));
  }
  
  if (!localStorage.getItem(FOOD_STORAGE_KEY)) {
    localStorage.setItem(FOOD_STORAGE_KEY, JSON.stringify(MOCK_FOOD_ITEMS));
  }
  
  if (!localStorage.getItem(EXERCISES_STORAGE_KEY)) {
    localStorage.setItem(EXERCISES_STORAGE_KEY, JSON.stringify(MOCK_EXERCISES));
  }
};

// Initialize data on module load
initializeData();

/**
 * Retrieves or creates today's activity and nutrition log
 * @returns {Promise<DailyLog>} Promise resolving to today's log data
 */
export const getTodayLog = (): Promise<DailyLog> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      let todayLog = logs.find(log => log.date === today);
      
      if (!todayLog) {
        // Create new log entry for today if none exists
        todayLog = {
          date: today,
          meals: [],
          exercises: JSON.parse(localStorage.getItem(EXERCISES_STORAGE_KEY) || '[]'),
          waterIntake: 0,
        };
        
        // Save the new log to storage
        localStorage.setItem(
          LOGS_STORAGE_KEY, 
          JSON.stringify([...logs, todayLog])
        );
      }
      
      resolve(todayLog);
    }, 300);
  });
};

/**
 * Retrieves weekly progress data
 * @returns {Promise<WeeklyProgress[]>} Promise resolving to array of weekly progress entries
 */
export const getWeeklyProgress = (): Promise<WeeklyProgress[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_WEEKLY_PROGRESS);
    }, 300);
  });
};

/**
 * Retrieves all available food items
 * @returns {Promise<FoodItem[]>} Promise resolving to array of food items
 */
export const getFoodItems = (): Promise<FoodItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foods = JSON.parse(localStorage.getItem(FOOD_STORAGE_KEY) || '[]');
      resolve(foods);
    }, 300);
  });
};

/**
 * Adds a new meal to today's log
 * @param {Omit<Meal, 'id'>} meal - Meal data without ID
 * @returns {Promise<Meal>} Promise resolving to the created meal with ID
 */
export const addMeal = (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      const newMeal: Meal = {
        ...meal,
        id: Date.now()
      };
      
      todayLog.meals = [...todayLog.meals, newMeal];
      
      // Update storage with new meal
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(newMeal);
    }, 500);
  });
};

/**
 * Updates today's water intake
 * @param {number} amount - New water intake amount in ml
 * @returns {Promise<number>} Promise resolving to the updated water intake
 */
export const updateWaterIntake = (amount: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      todayLog.waterIntake = amount;
      
      // Update storage with new water intake
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(amount);
    }, 300);
  });
};

/**
 * Toggles the completion status of an exercise
 * @param {number} exerciseId - ID of the exercise to toggle
 * @returns {Promise<Exercise[]>} Promise resolving to updated array of exercises
 */
export const toggleExerciseCompletion = (exerciseId: number): Promise<Exercise[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      
      // Toggle completion status of the specified exercise
      todayLog.exercises = todayLog.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      );
      
      // Update storage with new exercise status
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(todayLog.exercises);
    }, 300);
  });
};

/**
 * Calculates today's nutrition and activity statistics
 * @returns {Promise<{
 *   caloriesConsumed: number,
 *   proteinConsumed: number,
 *   carbsConsumed: number,
 *   fatConsumed: number,
 *   waterIntake: number,
 *   completedExercises: number
 * }>} Promise resolving to today's statistics
 */
export const calculateTodayStats = async () => {
  const todayLog = await getTodayLog();
  
  // Calculate totals from all meals
  return todayLog.meals.reduce(
    (acc, meal) => {
      acc.caloriesConsumed += meal.totalCalories;
      acc.proteinConsumed += meal.totalProtein;
      acc.carbsConsumed += meal.totalCarbs;
      acc.fatConsumed += meal.totalFat;
      return acc;
    },
    {
      caloriesConsumed: 0,
      proteinConsumed: 0,
      carbsConsumed: 0,
      fatConsumed: 0,
      waterIntake: todayLog.waterIntake,
      completedExercises: todayLog.exercises.filter(ex => ex.completed).length
    }
  );
};
