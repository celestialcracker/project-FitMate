import { format } from 'date-fns';
import { DailyLog, Exercise, FoodItem, Meal, WeeklyProgress } from '../types';
import { MOCK_ALL_LOGS, MOCK_EXERCISES, MOCK_FOOD_ITEMS, MOCK_WEEKLY_PROGRESS } from '../data/mockData';

// Local storage keys
const LOGS_STORAGE_KEY = 'fitmate_logs';
const FOOD_STORAGE_KEY = 'fitmate_foods';
const EXERCISES_STORAGE_KEY = 'fitmate_exercises';

// Initialize data in localStorage if not present
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

// Initialize on load
initializeData();

// Get today's log
export const getTodayLog = (): Promise<DailyLog> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      let todayLog = logs.find(log => log.date === today);
      
      if (!todayLog) {
        // If no log exists for today, create one
        todayLog = {
          date: today,
          meals: [],
          exercises: JSON.parse(localStorage.getItem(EXERCISES_STORAGE_KEY) || '[]'),
          waterIntake: 0,
        };
        
        // Save the new log
        localStorage.setItem(
          LOGS_STORAGE_KEY, 
          JSON.stringify([...logs, todayLog])
        );
      }
      
      resolve(todayLog);
    }, 300);
  });
};

// Get weekly progress data
export const getWeeklyProgress = (): Promise<WeeklyProgress[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_WEEKLY_PROGRESS);
    }, 300);
  });
};

// Get all food items
export const getFoodItems = (): Promise<FoodItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foods = JSON.parse(localStorage.getItem(FOOD_STORAGE_KEY) || '[]');
      resolve(foods);
    }, 300);
  });
};

// Add meal to today's log
export const addMeal = (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      const newMeal: Meal = {
        ...meal,
        id: Date.now()
      };
      
      todayLog.meals = [...todayLog.meals, newMeal];
      
      // Update storage
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(newMeal);
    }, 500);
  });
};

// Update water intake for today
export const updateWaterIntake = (amount: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      todayLog.waterIntake = amount;
      
      // Update storage
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(amount);
    }, 300);
  });
};

// Toggle exercise completion
export const toggleExerciseCompletion = (exerciseId: number): Promise<Exercise[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todayLog = await getTodayLog();
      
      todayLog.exercises = todayLog.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      );
      
      // Update storage
      const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]') as DailyLog[];
      const updatedLogs = logs.map(log => 
        log.date === todayLog.date ? todayLog : log
      );
      
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      resolve(todayLog.exercises);
    }, 300);
  });
};

// Calculate total calories and macros consumed today
export const calculateTodayStats = async () => {
  const todayLog = await getTodayLog();
  
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