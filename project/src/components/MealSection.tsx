/**
 * MealSection Component
 * 
 * A collapsible section component that displays a meal's details and food items.
 * Features:
 * - Expandable/collapsible meal details
 * - Add food button for each meal type
 * - List of food items with nutritional information
 * - Total calories calculation
 * - Smooth animations for expanding/collapsing
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Meal } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the MealSection component
 * @property {Meal} meal - The meal data to display
 * @property {(mealType: Meal['type']) => void} onAddFood - Callback function when adding food to the meal
 */
interface MealSectionProps {
  meal: Meal;
  onAddFood: (mealType: Meal['type']) => void;
}

/**
 * MealSection Component
 * 
 * Renders a collapsible section for a meal (breakfast, lunch, dinner, or snack).
 * Shows meal summary when collapsed and detailed food items when expanded.
 * 
 * @param {MealSectionProps} props - Component props
 * @returns {JSX.Element} Rendered meal section
 */
const MealSection: React.FC<MealSectionProps> = ({ meal, onAddFood }) => {
  // State for controlling section expansion
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format meal type for display (capitalize first letter)
  const mealTitle = meal.type.charAt(0).toUpperCase() + meal.type.slice(1);
  
  return (
    <div className="card mb-4">
      {/* Meal Header - Clickable to expand/collapse */}
      <div 
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Meal Title and Summary */}
        <div>
          <h3 className="text-lg font-semibold">{mealTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {meal.items.length} items • {meal.totalCalories} calories
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Add Food Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent section expansion when clicking add
              onAddFood(meal.type);
            }}
            className="rounded-full bg-blue-100 p-1 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
          >
            <Plus className="h-5 w-5" />
          </button>
          
          {/* Expand/Collapse Icon */}
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : 
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          }
        </div>
      </div>
      
      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t pt-4 dark:border-gray-700">
              {meal.items.length > 0 ? (
                <div className="space-y-3">
                  {/* List of Food Items */}
                  {meal.items.map((mealItem, index) => (
                    <div key={`${meal.id}-${index}`} className="flex items-center justify-between">
                      {/* Food Item Details */}
                      <div>
                        <p className="font-medium">{mealItem.item.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {mealItem.item.calories} cal • P: {mealItem.item.protein}g • 
                          C: {mealItem.item.carbs}g • F: {mealItem.item.fat}g
                        </p>
                      </div>
                      {/* Food Item Quantity */}
                      <div className="text-sm font-medium">
                        {mealItem.quantity} × {mealItem.item.serving}
                      </div>
                    </div>
                  ))}
                  
                  {/* Meal Total */}
                  <div className="mt-3 flex justify-between border-t pt-3 text-sm font-semibold dark:border-gray-700">
                    <span>Total</span>
                    <span>{meal.totalCalories} cal</span>
                  </div>
                </div>
              ) : (
                // Empty State
                <p className="text-center text-sm text-gray-500">
                  No food items added yet
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealSection;
