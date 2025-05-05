import React from 'react';
import { ChatOption } from '@/components/shared/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SelectableOptionsProps {
  options: ChatOption[];
  onSelectOption: (option: ChatOption) => void;
}

export const SelectableOptions: React.FC<SelectableOptionsProps> = ({ options, onSelectOption }) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onSelectOption(option)}
          className={cn(
            "px-3 py-1.5 rounded text-sm font-medium",
            "bg-blue-900/30 text-blue-300 hover:bg-blue-800/40",
            "border border-blue-800/30",
            "transition-colors duration-200"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {option.label}
        </motion.button>
      ))}
    </motion.div>
  );
};
