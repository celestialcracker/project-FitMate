/**
 * Progress Page Component
 * 
 * A page that visualizes and tracks the user's fitness progress over time.
 * Features:
 * - Weekly progress charts (calories, workouts, weight)
 * - Workout streak tracking
 * - Average calories burned calculation
 * - Daily targets completion visualization
 * - Responsive charts with tooltips
 * - Dark mode support
 * - Loading states
 */

import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { WeeklyProgress } from '../types';
import { getWeeklyProgress } from '../utils/dataUtils';
import NavBar from '../components/NavBar';
import { BarChart2, Award, TrendingUp } from 'lucide-react';

const Progress: React.FC = () => {
  const [progressData, setProgressData] = useState<WeeklyProgress[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeeklyProgress();
        setProgressData(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Format data for charts
  const formattedData = progressData.map(item => ({
    ...item,
    day: format(parseISO(item.date), 'EEE'),
    fullDate: format(parseISO(item.date), 'MMM d'),
  }));

  // Calculate streaks and averages
  const workoutDays = progressData.filter(day => day.workoutsCompleted > 0).length;
  const caloriesBurnedAvg = progressData.length > 0
    ? Math.round(progressData.reduce((sum, day) => sum + day.caloriesBurned, 0) / progressData.length)
    : 0;

  // Theme colors
  const chartColors = {
    calories: '#3B82F6',  // Blue
    workouts: '#10B981',  // Emerald
    water: '#06B6D4',     // Cyan
    target: '#F59E0B'     // Amber
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <BarChart2 className="mx-auto h-10 w-10 animate-pulse text-blue-500" />
          <p className="mt-4">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
        <h1 className="text-2xl font-bold">Your Progress</h1>
        <p className="text-purple-100">Tracking your fitness journey</p>
      </header>

      <main className="mx-auto max-w-md p-4">
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="mb-2 flex items-center">
                <Award className="mr-2 h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">Workout Streak</h3>
              </div>
              <p className="text-3xl font-bold text-orange-500">{workoutDays} days</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">this week</p>
            </div>
            
            <div className="card">
              <div className="mb-2 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Avg. Calories</h3>
              </div>
              <p className="text-3xl font-bold text-blue-500">{caloriesBurnedAvg}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">burned/day</p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Calories Burned</h2>
          <div className="card overflow-hidden">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} width={30} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    return [`${value} cal`, 'Calories burned'];
                  }}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.day === label);
                    return item ? item.fullDate : label;
                  }}
                />
                <Bar 
                  dataKey="caloriesBurned" 
                  fill={chartColors.calories} 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                  name="Calories"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Workouts Completed</h2>
          <div className="card overflow-hidden">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  width={30}
                  domain={[0, 'dataMax + 1']}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    return [`${value} workouts`, name];
                  }}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.day === label);
                    return item ? item.fullDate : label;
                  }}
                />
                <Bar 
                  dataKey="workoutsCompleted" 
                  fill={chartColors.workouts}
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                  name="Workouts"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        
        {progressData.some(data => data.weight) && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Weight Trend</h2>
            <div className="card overflow-hidden">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={30}
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => {
                      return [`${value.toFixed(1)} kg`, 'Weight'];
                    }}
                    labelFormatter={(label) => {
                      const item = formattedData.find(d => d.day === label);
                      return item ? item.fullDate : label;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-xl font-semibold">Daily Targets Met</h2>
          <div className="card overflow-hidden">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  width={30}
                  domain={[0, 1]}
                  ticks={[0, 1]}
                  tickFormatter={(value) => value === 1 ? 'Yes' : 'No'}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    return [value ? 'Target met' : 'Target missed', name];
                  }}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.day === label);
                    return item ? item.fullDate : label;
                  }}
                />
                <Bar 
                  dataKey="waterTarget" 
                  fill={chartColors.water}
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                  name="Water"
                />
                <Bar 
                  dataKey="macroTarget" 
                  fill={chartColors.target}
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                  name="Macros"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

      <NavBar />
    </div>
  );
};

export default Progress;
