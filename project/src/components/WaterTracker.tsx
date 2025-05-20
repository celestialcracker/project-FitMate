/**
 * WaterTracker Component
 * 
 * A component for tracking daily water intake with a visual water level indicator.
 * Features:
 * - Animated water level visualization
 * - Increment/decrement controls
 * - Progress tracking against daily goal
 * - Visual water wave effect
 * - Dark mode support
 * - Responsive design
 */

import React from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateWaterIntake } from '../utils/dataUtils';

/**
 * Props for the WaterTracker component
 * @property {number} currentWater - Current number of glasses consumed
 * @property {number} goalWater - Daily water intake goal in glasses
 * @property {(newAmount: number) => void} onUpdate - Callback function when water intake is updated
 */
interface WaterTrackerProps {
  currentWater: number;
  goalWater: number;
  onUpdate: (newAmount: number) => void;
}

/**
 * WaterTracker Component
 * 
 * Renders a water intake tracker with an animated water level indicator
 * and controls for updating the intake amount.
 * 
 * @param {WaterTrackerProps} props - Component props
 * @returns {JSX.Element} Rendered water tracker
 */
const WaterTracker: React.FC<WaterTrackerProps> = ({ 
  currentWater, 
  goalWater, 
  onUpdate 
}) => {
  /**
   * Increments water intake by one glass
   * Updates both local state and backend data
   */
  const handleIncrement = async () => {
    if (currentWater < 12) {  // Maximum limit of 12 glasses
      const newAmount = currentWater + 1;
      await updateWaterIntake(newAmount);
      onUpdate(newAmount);
    }
  };

  /**
   * Decrements water intake by one glass
   * Updates both local state and backend data
   */
  const handleDecrement = async () => {
    if (currentWater > 0) {  // Prevent negative values
      const newAmount = currentWater - 1;
      await updateWaterIntake(newAmount);
      onUpdate(newAmount);
    }
  };

  // Calculate progress percentage (capped at 100%)
  const percent = Math.min(100, (currentWater / goalWater) * 100);

  return (
    <div className="card">
      <h3 className="mb-4 text-lg font-semibold">Water Intake</h3>
      
      <div className="flex items-center justify-between">
        {/* Water Level Visualization */}
        <div className="relative h-32 w-20 overflow-hidden rounded-full bg-blue-50 dark:bg-gray-700">
          {/* Animated water level */}
          <motion.div 
            className="absolute bottom-0 w-full bg-blue-400"
            initial={{ height: 0 }}
            animate={{ height: `${percent}%` }}
            transition={{ duration: 0.5 }}
          >
            {/* Water wave effect */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-1 w-full bg-blue-200"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
            </div>
          </motion.div>
          {/* Water droplet icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplet className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        {/* Water Intake Controls and Stats */}
        <div className="ml-4 flex flex-col">
          {/* Current progress display */}
          <p className="text-3xl font-bold text-blue-500">
            {currentWater} <span className="text-lg font-normal text-gray-600 dark:text-gray-300">/ {goalWater}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">glasses</p>
          
          {/* Increment/Decrement buttons */}
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleDecrement}
              disabled={currentWater === 0}
              className="btn btn-outline p-2"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={handleIncrement}
              className="btn btn-primary p-2"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
