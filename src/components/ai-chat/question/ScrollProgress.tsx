import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  progress: number; // 0 to 100
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  progress,
  className 
}) => {
  return (
    <div 
      className={cn(
        "h-1 w-full bg-primary/10 rounded-full overflow-hidden",
        className
      )}
    >
      <motion.div
        className="h-full bg-primary/50 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}; 