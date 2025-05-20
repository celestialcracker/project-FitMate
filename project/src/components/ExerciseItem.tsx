/**
 * ExerciseItem Component
 * 
 * A component that displays an individual exercise item with its details and completion status.
 * Features:
 * - Exercise image or icon display
 * - Exercise name and details (sets/reps or duration)
 * - Interactive completion toggle button
 * - Visual feedback for completion status
 * - Smooth animations for state changes
 */

import React from 'react';
import { Dumbbell, Check } from 'lucide-react';
import { Exercise } from '../types';
import { toggleExerciseCompletion } from '../utils/dataUtils';
import { motion } from 'framer-motion';

/**
 * Props for the ExerciseItem component
 * @property {Exercise} exercise - The exercise data to display
 * @property {(exercise: Exercise) => void} onToggleComplete - Callback function when exercise completion is toggled
 */
interface ExerciseItemProps {
  exercise: Exercise;
  onToggleComplete: (exercise: Exercise) => void;
}

/**
 * ExerciseItem Component
 * 
 * Renders a single exercise item with completion toggle functionality.
 * Uses Framer Motion for smooth animations and transitions.
 * 
 * @param {ExerciseItemProps} props - Component props
 * @returns {JSX.Element} Rendered exercise item
 */
const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  onToggleComplete 
}) => {
  /**
   * Handles the exercise completion toggle
   * Updates both the backend state and local UI
   */
  const handleToggle = async () => {
    await toggleExerciseCompletion(exercise.id);
    onToggleComplete({ ...exercise, completed: !exercise.completed });
  };

  return (
    <motion.div 
      layout // Animate layout changes
      className={`card mb-4 overflow-hidden ${exercise.completed ? 'border-l-4 border-green-500' : ''}`}
    >
      <div className="flex items-center gap-4">
        {/* Exercise Image/Icon Container */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
          {exercise.image ? (
            // Display exercise image if available
            <img
              src={exercise.image}
              alt={exercise.name}
              className="h-full w-full object-cover"
            />
          ) : (
            // Fallback to dumbbell icon if no image
            <div className="flex h-full w-full items-center justify-center">
              <Dumbbell className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Exercise Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{exercise.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {/* Display exercise details based on available information */}
            {exercise.sets && exercise.reps ? (
              `${exercise.sets} sets × ${exercise.reps} reps`
            ) : exercise.duration ? (
              `${exercise.duration}`
            ) : (
              'Complete exercise'
            )}
          </p>
        </div>

        {/* Completion Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }} // Scale down on tap
          onClick={handleToggle}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            exercise.completed 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {exercise.completed ? (
            <Check className="h-6 w-6" />
          ) : (
            <span className="text-sm font-medium">Do</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExerciseItem;
