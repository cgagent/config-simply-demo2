import React from 'react';
import { Button } from '@/components/ui/button';
import { ChatOption } from '@/components/shared/types';
import { cn } from '@/lib/utils';

interface SelectableOptionsProps {
  options: ChatOption[];
  onSelectOption: (option: ChatOption) => void;
  className?: string;
}

export const SelectableOptions: React.FC<SelectableOptionsProps> = ({
  options,
  onSelectOption,
  className
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          size="sm"
          className="bg-blue-950/30 border-blue-800/30 hover:bg-blue-900/50 hover:text-blue-100"
          onClick={() => onSelectOption(option)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}; 