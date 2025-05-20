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

interface ExerciseItemProps {
  exercise: Exercise;
  onToggleComplete: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  onToggleComplete 
}) => {
  const handleToggle = async () => {
    await toggleExerciseCompletion(exercise.id);
    onToggleComplete({ ...exercise, completed: !exercise.completed });
  };

  return (
    <motion.div 
      layout
      className={`card mb-4 overflow-hidden ${exercise.completed ? 'border-l-4 border-green-500' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
          {exercise.image ? (
            <img
              src={exercise.image}
              alt={exercise.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Dumbbell className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{exercise.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {exercise.sets && exercise.reps ? (
              `${exercise.sets} sets × ${exercise.reps} reps`
            ) : exercise.duration ? (
              `${exercise.duration}`
            ) : (
              'Complete exercise'
            )}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
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
