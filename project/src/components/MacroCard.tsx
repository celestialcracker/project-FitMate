/**
 * MacroCard Component
 * 
 * A component that displays a macronutrient (protein, carbs, fat) or calorie tracking card.
 * Features:
 * - Circular progress indicator showing consumption vs target
 * - Visual representation of progress using a progress ring
 * - Displays consumed and target values with units
 * - Customizable colors for different macro types
 */

import React from 'react';
import ProgressRing from './ProgressRing';

/**
 * Props for the MacroCard component
 * @property {number} consumed - Amount of the macro/calories consumed
 * @property {number} target - Target amount for the macro/calories
 * @property {string} label - Label for the macro (e.g., "Protein", "Carbs")
 * @property {string} color - Color for the progress ring (hex or tailwind color)
 * @property {string} unit - Unit of measurement (e.g., "g", "kcal")
 */
interface MacroCardProps {
  consumed: number;
  target: number;
  label: string;
  color: string;
  unit: string;
}

/**
 * MacroCard Component
 * 
 * Renders a card showing progress towards a macronutrient or calorie target.
 * Uses a circular progress indicator to visualize the progress.
 * 
 * @param {MacroCardProps} props - Component props
 * @returns {JSX.Element} Rendered macro card
 */
const MacroCard: React.FC<MacroCardProps> = ({ 
  consumed, 
  target, 
  label, 
  color, 
  unit 
}) => {
  // Calculate percentage, capped at 100%
  const percentage = Math.min(100, Math.round((consumed / target) * 100));
  
  return (
    <div className="card flex-1">
      <div className="flex flex-col items-center">
        {/* Progress Ring with Percentage */}
        <ProgressRing 
          progress={percentage} 
          size={80} 
          strokeWidth={8} 
          color={color}
        >
          <div className="text-center">
            <span className="text-xl font-bold">{percentage}%</span>
          </div>
        </ProgressRing>
        
        {/* Macro Label and Values */}
        <h4 className="mt-2 text-sm font-semibold">{label}</h4>
        <p className="text-xs">
          <span className="font-medium">{consumed}{unit}</span>
          <span className="ml-1 text-gray-500">/ {target}{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default MacroCard;
