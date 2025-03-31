
import React from 'react';
import { Button } from '@/components/ui/button';

interface CIToolSelectionProps {
  onSelectCI: (ciTool: string) => void;
}

const CIToolSelection: React.FC<CIToolSelectionProps> = ({ onSelectCI }) => {
  return (
    <div className="flex gap-2 mb-4 mt-2">
      <Button 
        variant="outline"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => onSelectCI("Github Actions")}
      >
        Github Actions
      </Button>
      <Button 
        variant="outline"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => onSelectCI("Other CI")}
      >
        Other CI
      </Button>
    </div>
  );
};

export default CIToolSelection;
