import React from 'react';
import ProgressRing from './ProgressRing';

interface MacroCardProps {
  consumed: number;
  target: number;
  label: string;
  color: string;
  unit: string;
}

const MacroCard: React.FC<MacroCardProps> = ({ 
  consumed, 
  target, 
  label, 
  color, 
  unit 
}) => {
  const percentage = Math.min(100, Math.round((consumed / target) * 100));
  
  return (
    <div className="card flex-1">
      <div className="flex flex-col items-center">
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