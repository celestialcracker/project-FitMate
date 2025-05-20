/**
 * ProgressRing Component
 * 
 * A circular progress indicator component that displays progress as an animated ring.
 * Features:
 * - Animated progress ring using SVG
 * - Customizable size, stroke width, and colors
 * - Background circle for visual context
 * - Centered content support
 * - Smooth animations using Framer Motion
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props for the ProgressRing component
 * @property {number} progress - Progress value from 0 to 100
 * @property {number} size - Diameter of the ring in pixels
 * @property {number} strokeWidth - Width of the ring stroke in pixels
 * @property {string} color - Color of the progress ring
 * @property {string} [backgroundColor] - Color of the background ring (default: '#e5e7eb')
 * @property {React.ReactNode} [children] - Optional content to display in the center of the ring
 */
interface ProgressRingProps {
  progress: number;  // 0-100
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

/**
 * ProgressRing Component
 * 
 * Renders a circular progress indicator with an animated ring.
 * Uses SVG for rendering and Framer Motion for animations.
 * 
 * @param {ProgressRingProps} props - Component props
 * @returns {JSX.Element} Rendered progress ring
 */
const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor = '#e5e7eb',
  children,
}) => {
  // Calculate SVG circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle - provides visual context for progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle - animated ring showing current progress */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          className="progress-ring-circle"
        />
      </svg>
      
      {/* Center content container - allows displaying text or icons inside the ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
