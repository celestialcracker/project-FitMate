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

export type AuthUser = User & {
  token: string;
};

export type Exercise = {
  id: number;
  name: string;
  duration?: string;
  reps?: number;
  sets?: number;
  completed: boolean;
  image?: string;
};

export type FoodItem = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
};

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

export type DailyLog = {
  date: string;
  meals: Meal[];
  exercises: Exercise[];
  waterIntake: number;
  weight?: number;
};

export type WeeklyProgress = {
  date: string;
  weight?: number;
  caloriesBurned: number;
  workoutsCompleted: number;
  waterTarget: boolean;
  macroTarget: boolean;
};

export type ThemeMode = 'light' | 'dark';