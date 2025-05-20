/**
 * Mock Data Module
 * 
 * This module provides mock data for development and testing purposes.
 * It includes sample data for users, food items, exercises, meals, and daily logs.
 * The data is structured to mimic real application data and includes realistic
 * nutritional values, exercise routines, and progress tracking.
 * 
 * Features:
 * - Sample user profile with realistic fitness goals
 * - Common food items with accurate nutritional information
 * - Exercise routines with images and completion tracking
 * - Daily meal plans with calculated totals
 * - Weekly progress tracking with realistic variations
 * - Historical logs for the past week
 */

import { User, FoodItem, Exercise, Meal, DailyLog, WeeklyProgress } from '../types';
import { addDays, format, subDays } from 'date-fns';

/**
 * Sample user data for development and testing
 * Includes realistic profile information and fitness goals
 */
export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Jordan Lee',
    email: 'jordan@gmail.com',
    age: 28,
    weight: 75,
    height: 175,
    goal: 'Lose weight',
    dailyCalorieTarget: 2200,
    dailyProteinTarget: 140,
    dailyWaterTarget: 8,
    joinedDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Ava Smith',
    email: 'ava.smith@gmail.com',
    age: 32,
    weight: 68,
    height: 165,
    goal: 'Build muscle',
    dailyCalorieTarget: 2500,
    dailyProteinTarget: 160,
    dailyWaterTarget: 10,
    joinedDate: '2022-11-22'
  },
  {
    id: 3,
    name: 'Liam Johnson',
    email: 'liam.johnson@gmail.com',
    age: 40,
    weight: 85,
    height: 180,
    goal: 'Maintain weight',
    dailyCalorieTarget: 2300,
    dailyProteinTarget: 130,
    dailyWaterTarget: 9,
    joinedDate: '2023-06-03'
  },
  {
    id: 4,
    name: 'Sophia Nguyen',
    email: 'sophia.nguyen@gmail.com',
    age: 25,
    weight: 60,
    height: 160,
    goal: 'Increase stamina',
    dailyCalorieTarget: 2100,
    dailyProteinTarget: 120,
    dailyWaterTarget: 8,
    joinedDate: '2024-02-10'
  },
  {
    id: 5,
    name: 'Ethan Brown',
    email: 'ethan.brown@gmail.com',
    age: 29,
    weight: 90,
    height: 185,
    goal: 'Lose weight',
    dailyCalorieTarget: 2000,
    dailyProteinTarget: 150,
    dailyWaterTarget: 11,
    joinedDate: '2023-09-18'
  }
];

/**
 * Collection of common food items with nutritional information
 * Each item includes:
 * - Basic information (name, serving size)
 * - Macronutrient breakdown (protein, carbs, fat)
 * - Caloric content
 * Values are based on standard nutritional databases
 */
export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: 1,
    name: 'Oatmeal with Banana',
    calories: 350,
    protein: 10,
    carbs: 50,
    fat: 7,
    serving: '1 bowl'
  },
  {
    id: 2,
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    serving: '100g'
  },
  {
    id: 3,
    name: 'Brown Rice',
    calories: 215,
    protein: 4.5,
    carbs: 45,
    fat: 1.8,
    serving: '1 cup'
  },
  {
    id: 4,
    name: 'Broccoli',
    calories: 55,
    protein: 3.7,
    carbs: 11.2,
    fat: 0.6,
    serving: '1 cup'
  },
  {
    id: 5,
    name: 'Salmon Fillet',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 13,
    serving: '100g'
  },
  {
    id: 6,
    name: 'Greek Yogurt',
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.4,
    serving: '175g'
  },
  {
    id: 7,
    name: 'Scrambled Eggs',
    calories: 140,
    protein: 12,
    carbs: 1,
    fat: 10,
    serving: '2 eggs'
  },
  {
    id: 8,
    name: 'Avocado Toast',
    calories: 290,
    protein: 8,
    carbs: 30,
    fat: 15,
    serving: '1 slice'
  },
  {
    id: 9,
    name: 'Protein Shake',
    calories: 150,
    protein: 25,
    carbs: 5,
    fat: 2,
    serving: '1 scoop'
  },
  {
    id: 10,
    name: 'Almonds',
    calories: 162,
    protein: 6,
    carbs: 6,
    fat: 14,
    serving: '28g'
  }
];

/**
 * Sample exercise routines with realistic workout details
 * Each exercise includes:
 * - Exercise name and type
 * - Sets and reps (for strength exercises)
 * - Duration (for timed exercises)
 * - Completion status
 * - Exercise image URL
 */
export const MOCK_EXERCISES: Exercise[] = [
  {
    id: 1,
    name: 'Jumping Jacks',
    duration: '5 mins',
    completed: false,
    image: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Push-ups',
    sets: 3,
    reps: 15,
    completed: false,
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Squats',
    sets: 3,
    reps: 20,
    completed: false,
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Plank',
    duration: '60 secs',
    sets: 3,
    completed: false,
    image: 'https://images.pexels.com/photos/6456270/pexels-photo-6456270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Lunges',
    sets: 3,
    reps: 12,
    completed: false,
    image: 'https://images.pexels.com/photos/6456208/pexels-photo-6456208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    name: 'Burpees',
    sets: 3,
    reps: 10,
    completed: false,
    image: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 7,
    name: 'Mountain Climbers',
    duration: '45 secs',
    sets: 3,
    completed: false,
    image: 'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

/**
 * Generates a sample meal plan for the current day
 * Creates a balanced meal plan with:
 * - Breakfast, lunch, dinner, and snack
 * - Realistic food combinations
 * - Calculated nutritional totals
 * 
 * @returns {Meal[]} Array of meals with their items and nutritional totals
 */
const generateTodayMeals = (): Meal[] => {
  return [
    {
      id: 1,
      type: 'breakfast',
      items: [
        { item: MOCK_FOOD_ITEMS[0], quantity: 1 },
        { item: MOCK_FOOD_ITEMS[5], quantity: 1 }
      ],
      totalCalories: MOCK_FOOD_ITEMS[0].calories + MOCK_FOOD_ITEMS[5].calories,
      totalProtein: MOCK_FOOD_ITEMS[0].protein + MOCK_FOOD_ITEMS[5].protein,
      totalCarbs: MOCK_FOOD_ITEMS[0].carbs + MOCK_FOOD_ITEMS[5].carbs,
      totalFat: MOCK_FOOD_ITEMS[0].fat + MOCK_FOOD_ITEMS[5].fat
    },
    {
      id: 2,
      type: 'lunch',
      items: [
        { item: MOCK_FOOD_ITEMS[1], quantity: 1 },
        { item: MOCK_FOOD_ITEMS[2], quantity: 1 },
        { item: MOCK_FOOD_ITEMS[3], quantity: 1 }
      ],
      totalCalories: MOCK_FOOD_ITEMS[1].calories + MOCK_FOOD_ITEMS[2].calories + MOCK_FOOD_ITEMS[3].calories,
      totalProtein: MOCK_FOOD_ITEMS[1].protein + MOCK_FOOD_ITEMS[2].protein + MOCK_FOOD_ITEMS[3].protein,
      totalCarbs: MOCK_FOOD_ITEMS[1].carbs + MOCK_FOOD_ITEMS[2].carbs + MOCK_FOOD_ITEMS[3].carbs,
      totalFat: MOCK_FOOD_ITEMS[1].fat + MOCK_FOOD_ITEMS[2].fat + MOCK_FOOD_ITEMS[3].fat
    },
    {
      id: 3,
      type: 'dinner',
      items: [
        { item: MOCK_FOOD_ITEMS[4], quantity: 1 },
        { item: MOCK_FOOD_ITEMS[3], quantity: 1 }
      ],
      totalCalories: MOCK_FOOD_ITEMS[4].calories + MOCK_FOOD_ITEMS[3].calories,
      totalProtein: MOCK_FOOD_ITEMS[4].protein + MOCK_FOOD_ITEMS[3].protein,
      totalCarbs: MOCK_FOOD_ITEMS[4].carbs + MOCK_FOOD_ITEMS[3].carbs,
      totalFat: MOCK_FOOD_ITEMS[4].fat + MOCK_FOOD_ITEMS[3].fat
    },
    {
      id: 4,
      type: 'snack',
      items: [
        { item: MOCK_FOOD_ITEMS[9], quantity: 1 }
      ],
      totalCalories: MOCK_FOOD_ITEMS[9].calories,
      totalProtein: MOCK_FOOD_ITEMS[9].protein,
      totalCarbs: MOCK_FOOD_ITEMS[9].carbs,
      totalFat: MOCK_FOOD_ITEMS[9].fat
    }
  ];
};

/**
 * Today's daily log entry
 * Includes:
 * - Current date
 * - Generated meal plan
 * - Exercise routine
 * - Water intake
 * - Current weight
 */
export const MOCK_TODAY_LOG: DailyLog = {
  date: format(new Date(), 'yyyy-MM-dd'),
  meals: generateTodayMeals(),
  exercises: [...MOCK_EXERCISES],
  waterIntake: 5,
  weight: 75
};

/**
 * Weekly progress data for the past 7 days
 * Each day includes:
 * - Weight tracking with small variations
 * - Calories burned during workouts
 * - Number of completed workouts
 * - Achievement of water and macro targets
 * Data includes realistic fluctuations to simulate real progress
 */
export const MOCK_WEEKLY_PROGRESS: WeeklyProgress[] = Array.from({ length: 7 }).map((_, index) => {
  const date = format(subDays(new Date(), 6 - index), 'yyyy-MM-dd');
  return {
    date,
    weight: 75 - (Math.random() * 0.5),
    caloriesBurned: 300 + Math.floor(Math.random() * 200),
    workoutsCompleted: Math.floor(Math.random() * 3) + 1,
    waterTarget: Math.random() > 0.3,
    macroTarget: Math.random() > 0.4
  };
});

/**
 * Historical daily logs for the past week
 * Each log includes:
 * - Date-specific meal plans
 * - Exercise routines
 * - Water intake with random variations
 * - Weight tracking
 * Used for displaying progress and historical data
 */
export const MOCK_PREVIOUS_LOGS: DailyLog[] = Array.from({ length: 6 }).map((_, index) => {
  const date = format(subDays(new Date(), 6 - index), 'yyyy-MM-dd');
  const waterIntake = Math.floor(Math.random() * 5) + 3;
  
  // Simplified logs for previous days
  return {
    date,
    meals: generateTodayMeals().map(meal => ({
      ...meal,
      id: meal.id + (index * 10)
    })),
    exercises: MOCK_EXERCISES.map(exercise => ({
      ...exercise,
      completed: Math.random() > 0.3
    })),
    waterIntake,
    weight: 75 + ((Math.random() - 0.5) * 1)
  };
});

// Combine today's log with previous logs
export const MOCK_ALL_LOGS: DailyLog[] = [
  MOCK_TODAY_LOG,
  ...MOCK_PREVIOUS_LOGS
];
