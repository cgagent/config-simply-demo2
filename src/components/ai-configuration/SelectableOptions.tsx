
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { ChatOption } from './types';

interface SelectableOptionsProps {
  options: ChatOption[];
  onSelectOption: (option: ChatOption) => void;
}

export const SelectableOptions: React.FC<SelectableOptionsProps> = ({
  options,
  onSelectOption
}) => {
  if (!options || options.length === 0) return null;
  
  return (
    <div className="flex flex-nowrap gap-2 mt-2 w-full overflow-x-auto pb-2">
      {options.map((option) => {
        const customClass = "text-xs rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center whitespace-nowrap";
        
        return (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            className={customClass}
            onClick={() => onSelectOption(option)}
          >
            {option.label}
        
          </Button>
        );
      })}
    </div>
  );
};
