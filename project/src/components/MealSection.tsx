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

interface MealSectionProps {
  meal: Meal;
  onAddFood: (mealType: Meal['type']) => void;
}

const MealSection: React.FC<MealSectionProps> = ({ meal, onAddFood }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Capitalize first letter of meal type
  const mealTitle = meal.type.charAt(0).toUpperCase() + meal.type.slice(1);
  
  return (
    <div className="card mb-4">
      <div 
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-semibold">{mealTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {meal.items.length} items • {meal.totalCalories} calories
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddFood(meal.type);
            }}
            className="rounded-full bg-blue-100 p-1 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
          >
            <Plus className="h-5 w-5" />
          </button>
          
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : 
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          }
        </div>
      </div>
      
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
                  {meal.items.map((mealItem, index) => (
                    <div key={`${meal.id}-${index}`} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{mealItem.item.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {mealItem.item.calories} cal • P: {mealItem.item.protein}g • 
                          C: {mealItem.item.carbs}g • F: {mealItem.item.fat}g
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {mealItem.quantity} × {mealItem.item.serving}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-3 flex justify-between border-t pt-3 text-sm font-semibold dark:border-gray-700">
                    <span>Total</span>
                    <span>{meal.totalCalories} cal</span>
                  </div>
                </div>
              ) : (
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
