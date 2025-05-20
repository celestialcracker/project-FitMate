/**
 * Nutrition Page Component
 * 
 * A page that manages and displays the user's daily nutrition tracking.
 * Features:
 * - Daily calorie and macro tracking
 * - Meal management (breakfast, lunch, dinner, snacks)
 * - Food item addition to meals
 * - Real-time stats updates
 * - Progress visualization
 * - Responsive design with dark mode support
 * - Loading states
 */

import React, { useState, useEffect } from 'react';
import { Meal, FoodItem, DailyLog } from '../types';
import { getTodayLog, getFoodItems, addMeal, calculateTodayStats } from '../utils/dataUtils';
import { getCurrentUser } from '../utils/authUtils';
import MealSection from '../components/MealSection';
import AddFoodModal from '../components/AddFoodModal';
import NavBar from '../components/NavBar';
import { User, Utensils } from 'lucide-react';

/**
 * Nutrition Component
 * 
 * Renders the nutrition tracking interface with meal sections and macro statistics.
 * Manages meal data, food items, and daily nutrition statistics.
 * 
 * @returns {JSX.Element} Rendered nutrition page
 */
const Nutrition: React.FC = () => {
  // State management for nutrition data and UI
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<Meal['type']>('breakfast');
  const [loading, setLoading] = useState(true);
  const [todayStats, setTodayStats] = useState({
    caloriesConsumed: 0,
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatConsumed: 0
  });
  
  const user = getCurrentUser();
  
  /**
   * Fetch initial nutrition data on component mount
   * Loads today's log, available food items, and calculates stats
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [log, foods] = await Promise.all([
          getTodayLog(),
          getFoodItems()
        ]);
        
        setDailyLog(log);
        setFoodItems(foods);
        
        const stats = await calculateTodayStats();
        setTodayStats({
          caloriesConsumed: stats.caloriesConsumed,
          proteinConsumed: stats.proteinConsumed,
          carbsConsumed: stats.carbsConsumed,
          fatConsumed: stats.fatConsumed
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  /**
   * Opens the add food modal for a specific meal type
   * @param {Meal['type']} mealType - Type of meal to add food to
   */
  const handleOpenAddFood = (mealType: Meal['type']) => {
    setSelectedMealType(mealType);
    setShowAddFoodModal(true);
  };
  
  /**
   * Adds a food item to a meal and updates nutrition stats
   * Handles both existing and new meals
   * 
   * @param {FoodItem} food - Food item to add
   * @param {number} quantity - Quantity of the food item
   * @param {Meal['type']} mealType - Type of meal to add to
   */
  const handleAddFood = async (food: FoodItem, quantity: number, mealType: Meal['type']) => {
    if (!dailyLog) return;
    
    // Find existing meal or create new one
    const existingMeal = dailyLog.meals.find(meal => meal.type === mealType);
    
    if (existingMeal) {
      // Add to existing meal
      const updatedItems = [
        ...existingMeal.items,
        { item: food, quantity }
      ];
      
      // Calculate updated meal totals
      const updatedMeal: Meal = {
        ...existingMeal,
        items: updatedItems,
        totalCalories: updatedItems.reduce((sum, { item, quantity }) => sum + (item.calories * quantity), 0),
        totalProtein: updatedItems.reduce((sum, { item, quantity }) => sum + (item.protein * quantity), 0),
        totalCarbs: updatedItems.reduce((sum, { item, quantity }) => sum + (item.carbs * quantity), 0),
        totalFat: updatedItems.reduce((sum, { item, quantity }) => sum + (item.fat * quantity), 0)
      };
      
      // Update meals list
      const updatedMeals = dailyLog.meals.map(meal => 
        meal.id === existingMeal.id ? updatedMeal : meal
      );
      
      setDailyLog({
        ...dailyLog,
        meals: updatedMeals
      });
    } else {
      // Create new meal with initial food item
      const newMeal: Omit<Meal, 'id'> = {
        type: mealType,
        items: [{ item: food, quantity }],
        totalCalories: food.calories * quantity,
        totalProtein: food.protein * quantity,
        totalCarbs: food.carbs * quantity,
        totalFat: food.fat * quantity
      };
      
      const addedMeal = await addMeal(newMeal);
      
      setDailyLog({
        ...dailyLog,
        meals: [...dailyLog.meals, addedMeal]
      });
    }
    
    // Update daily statistics
    const stats = await calculateTodayStats();
    setTodayStats({
      caloriesConsumed: stats.caloriesConsumed,
      proteinConsumed: stats.proteinConsumed,
      carbsConsumed: stats.carbsConsumed,
      fatConsumed: stats.fatConsumed
    });
    
    setShowAddFoodModal(false);
  };
  
  // Available meal types
  const mealTypes: Meal['type'][] = ['breakfast', 'lunch', 'dinner', 'snack'];

  /**
   * Gets or creates meal sections for each meal type
   * Ensures all meal types are represented in the UI
   * 
   * @returns {Meal[]} Array of meals for all meal types
   */
  const getMealsByType = () => {
    return mealTypes.map(type => {
      const existingMeal = dailyLog?.meals.find(meal => meal.type === type);
      
      if (existingMeal) {
        return existingMeal;
      }
      
      // Create empty meal placeholder for types without entries
      return {
        id: 0, // Temporary ID for empty meals
        type,
        items: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0
      };
    });
  };
  
  // Loading state UI
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Utensils className="mx-auto h-10 w-10 animate-pulse text-blue-500" />
          <p className="mt-4">Loading your nutrition data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
      {/* Header with Calorie Progress */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-300 p-6 text-white">
        <h1 className="text-2xl font-bold">Nutrition</h1>
        <div className="mt-2 flex justify-between">
          {/* Daily Goal */}
          <div>
            <span className="block text-sm">Daily goal</span>
            <span className="text-lg font-semibold">{user?.dailyCalorieTarget} cal</span>
          </div>
          {/* Calories Consumed */}
          <div>
            <span className="block text-sm">Consumed</span>
            <span className="text-lg font-semibold">{todayStats.caloriesConsumed} cal</span>
          </div>
          {/* Calories Remaining */}
          <div>
            <span className="block text-sm">Remaining</span>
            <span className="text-lg font-semibold">
              {(user?.dailyCalorieTarget || 0) - todayStats.caloriesConsumed} cal
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white bg-opacity-25">
          <div 
            className="h-full rounded-full bg-white"
            style={{ 
              width: `${Math.min(100, (todayStats.caloriesConsumed / (user?.dailyCalorieTarget || 1)) * 100)}%` 
            }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-md p-4">
        {/* Meal Sections */}
        {getMealsByType().map((meal) => (
          <MealSection 
            key={`${meal.type}-${meal.id}`}
            meal={meal} 
            onAddFood={handleOpenAddFood}
          />
        ))}
        
        {/* Daily Macros Summary */}
        <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h3 className="mb-2 font-semibold">Daily Macros</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Protein */}
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{todayStats.proteinConsumed}g</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Protein</p>
            </div>
            {/* Carbs */}
            <div className="text-center">
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{todayStats.carbsConsumed}g</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Carbs</p>
            </div>
            {/* Fat */}
            <div className="text-center">
              <p className="text-xl font-bold text-pink-600 dark:text-pink-400">{todayStats.fatConsumed}g</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Fat</p>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <NavBar />

      {/* Add Food Modal */}
      {showAddFoodModal && (
        <AddFoodModal
          isOpen={showAddFoodModal}
          onClose={() => setShowAddFoodModal(false)}
          foodItems={foodItems}
          mealType={selectedMealType}
          onAddFood={handleAddFood}
        />
      )}
    </div>
  );
};

export default Nutrition;
