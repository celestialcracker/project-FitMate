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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood, quantity, mealType);
      reset();
    }
  };

  const reset = () => {
    setSelectedFood(null);
    setQuantity(1);
    setSearchTerm('');
  };

  const filteredFoods = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const mealTitle = mealType.charAt(0).toUpperCase() + mealType.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 p-4 sm:items-center"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-5 dark:bg-gray-900 sm:rounded-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Food to {mealTitle}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {selectedFood ? (
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