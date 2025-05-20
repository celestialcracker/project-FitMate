/**
 * AddFoodModal Component
 * 
 * A modal component that allows users to search and add food items to a specific meal.
 * It provides a search interface for food items and displays detailed nutritional information
 * for the selected food item before adding it to the meal.
 */

import React, { useState } from 'react';
import { FoodItem, Meal } from '../types';
import { motion } from 'framer-motion';
import { X, Search } from 'lucide-react';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItems: FoodItem[];
  mealType: Meal['type'];
  onAddFood: (food: FoodItem, quantity: number, mealType: Meal['type']) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  foodItems,
  mealType,
  onAddFood,
}) => {
  // State management for search, selection, and quantity

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  /**
   * Handles the search input change and updates the search term
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handles adding the selected food to the meal
   * Calls the onAddFood callback and resets the modal state
   */
  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood, quantity, mealType);
      reset();
    }
  };

  /**
   * Resets the modal state to its initial values
   */
  const reset = () => {
    setSelectedFood(null);
    setQuantity(1);
    setSearchTerm('');
  };

  // Filter food items based on search term
  const filteredFoods = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  // Capitalize first letter of meal type for display
  const mealTitle = mealType.charAt(0).toUpperCase() + mealType.slice(1);

  return (
    // Modal backdrop with animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 p-4 sm:items-center"
      onClick={onClose}
    >
      {/* Modal content container with slide-up animation */}

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-5 dark:bg-gray-900 sm:rounded-2xl"
      >
        {/* Modal header with title and close button */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Food to {mealTitle}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Conditional rendering based on whether a food item is selected */}
        {selectedFood ? (
        // Selected food item view with nutritional information
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{selectedFood.name}</h3>
            
            <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="text-center">
                <p className="text-xs text-gray-500">Calories</p>
                <p className="font-semibold">{selectedFood.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="font-semibold">{selectedFood.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="font-semibold">{selectedFood.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Fat</p>
                <p className="font-semibold">{selectedFood.fat}g</p>
              </div>
            </div>

            <div>
              <label className="label" htmlFor="quantity">
                Quantity (serving: {selectedFood.serving})
              </label>
              <input
                id="quantity"
                type="number"
                min="0.5"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={reset}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddFood}
                className="btn btn-primary flex-1"
              >
                Add Food
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={handleSearch}
                className="input pl-10"
                autoFocus
              />
            </div>

            <div className="max-h-80 overflow-y-auto">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className="cursor-pointer rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <p className="font-medium">{food.name}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{food.calories} cal</span>
                      <span>{food.serving}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No food items found
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddFoodModal;
