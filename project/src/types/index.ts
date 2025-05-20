/**
 * Type definitions for the FitMate application
 * 
 * This file contains all the core type definitions used throughout the application.
 * These types define the structure of user data, exercises, meals, and progress tracking.
 */

/**
 * User profile information
 * @property {number} id - Unique identifier for the user
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {number} [age] - User's age (optional)
 * @property {number} [weight] - User's weight in kg (optional)
 * @property {number} [height] - User's height in cm (optional)
 * @property {string} [goal] - User's fitness goal (optional)
 * @property {number} dailyCalorieTarget - Daily calorie intake target
 * @property {number} dailyProteinTarget - Daily protein intake target in grams
 * @property {number} dailyWaterTarget - Daily water intake target in ml
 * @property {string} joinedDate - Date when user joined the application
 */
export type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: string;
  dailyCalorieTarget: number;
  dailyProteinTarget: number;
  dailyWaterTarget: number;
  joinedDate: string;
};

/**
 * Authenticated user type
 * Extends User type with authentication token
 * @property {string} token - JWT authentication token
 */
export type AuthUser = User & {
  token: string;
};

/**
 * Exercise/workout information
 * @property {number} id - Unique identifier for the exercise
 * @property {string} name - Name of the exercise
 * @property {string} [duration] - Duration of the exercise (optional)
 * @property {number} [reps] - Number of repetitions (optional)
 * @property {number} [sets] - Number of sets (optional)
 * @property {boolean} completed - Whether the exercise has been completed
 * @property {string} [image] - URL to exercise demonstration image (optional)
 */
export type Exercise = {
  id: number;
  name: string;
  duration?: string;
  reps?: number;
  sets?: number;
  completed: boolean;
  image?: string;
};

/**
 * Food item nutritional information
 * @property {number} id - Unique identifier for the food item
 * @property {string} name - Name of the food item
 * @property {number} calories - Calories per serving
 * @property {number} protein - Protein content in grams per serving
 * @property {number} carbs - Carbohydrate content in grams per serving
 * @property {number} fat - Fat content in grams per serving
 * @property {string} serving - Serving size description
 */
export type FoodItem = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
};

/**
 * Meal information including food items and nutritional totals
 * @property {number} id - Unique identifier for the meal
 * @property {('breakfast'|'lunch'|'dinner'|'snack')} type - Type of meal
 * @property {Array<{item: FoodItem, quantity: number}>} items - List of food items in the meal
 * @property {number} totalCalories - Total calories in the meal
 * @property {number} totalProtein - Total protein in grams
 * @property {number} totalCarbs - Total carbohydrates in grams
 * @property {number} totalFat - Total fat in grams
 */
export type Meal = {
  id: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: {
    item: FoodItem;
    quantity: number;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
};

/**
 * Daily activity and nutrition log
 * @property {string} date - Date of the log entry
 * @property {Meal[]} meals - List of meals consumed
 * @property {Exercise[]} exercises - List of exercises performed
 * @property {number} waterIntake - Water intake in ml
 * @property {number} [weight] - Weight recorded for the day (optional)
 */
export type DailyLog = {
  date: string;
  meals: Meal[];
  exercises: Exercise[];
  waterIntake: number;
  weight?: number;
};

/**
 * Weekly progress tracking data
 * @property {string} date - Date of the progress entry
 * @property {number} [weight] - Weight recorded for the week (optional)
 * @property {number} caloriesBurned - Total calories burned in the week
 * @property {number} workoutsCompleted - Number of workouts completed
 * @property {boolean} waterTarget - Whether water intake target was met
 * @property {boolean} macroTarget - Whether macronutrient targets were met
 */
export type WeeklyProgress = {
  date: string;
  weight?: number;
  caloriesBurned: number;
  workoutsCompleted: number;
  waterTarget: boolean;
  macroTarget: boolean;
};

/**
 * Application theme mode
 * Can be either 'light' or 'dark'
 */
export type ThemeMode = 'light' | 'dark';
