/**
 * ProfileForm Component
 * 
 * A form component for managing user profile information and fitness goals.
 * Features:
 * - Editable user profile fields (name, age, weight, height)
 * - Fitness goal selection
 * - Daily targets for calories, protein, and water intake
 * - Form validation with min/max constraints
 * - Loading states and error handling
 * - Success feedback with auto-dismissing message
 * - Responsive grid layout
 */

import React, { useState } from 'react';
import { User } from '../types';
import { updateUserProfile } from '../utils/authUtils';

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name,
    age: user.age,
    weight: user.weight,
    height: user.height,
    goal: user.goal,
    dailyCalorieTarget: user.dailyCalorieTarget,
    dailyProteinTarget: user.dailyProteinTarget,
    dailyWaterTarget: user.dailyWaterTarget
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value ? Number(value) : '') : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const updatedUser = await updateUserProfile(formData);
      onUpdate(updatedUser);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError((err as Error).message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const goalOptions = [
    'Lose weight',
    'Gain muscle',
    'Maintain weight',
    'Improve fitness',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-red-500 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-green-500 dark:bg-green-900/20 dark:text-green-400">
          Profile updated successfully!
        </div>
      )}

      <div>
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name || ''}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age || ''}
            onChange={handleChange}
            className="input"
            min="13"
            max="100"
          />
        </div>

        <div>
          <label className="label" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            value={formData.weight || ''}
            onChange={handleChange}
            className="input"
            min="30"
            max="300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="height">
            Height (cm)
          </label>
          <input
            id="height"
            name="height"
            type="number"
            value={formData.height || ''}
            onChange={handleChange}
            className="input"
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className="label" htmlFor="goal">
            Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal || ''}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select a goal</option>
            {goalOptions.map(goal => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="label" htmlFor="dailyCalorieTarget">
            Calorie Target
          </label>
          <input
            id="dailyCalorieTarget"
            name="dailyCalorieTarget"
            type="number"
            value={formData.dailyCalorieTarget || ''}
            onChange={handleChange}
            className="input"
            min="1000"
            max="5000"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="dailyProteinTarget">
            Protein (g)
          </label>
          <input
            id="dailyProteinTarget"
            name="dailyProteinTarget"
            type="number"
            value={formData.dailyProteinTarget || ''}
            onChange={handleChange}
            className="input"
            min="0"
            max="400"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="dailyWaterTarget">
            Water (glasses)
          </label>
          <input
            id="dailyWaterTarget"
            name="dailyWaterTarget"
            type="number"
            value={formData.dailyWaterTarget || ''}
            onChange={handleChange}
            className="input"
            min="1"
            max="15"
            required
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? 'Updating...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ProfileForm;
