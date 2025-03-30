
import React from 'react';
import { Github, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface SelectCITypeProps {
  selectedCI: 'github' | 'other' | null;
  onSelectCI: (ci: 'github' | 'other') => void;
  onNextStep: () => void;
  canProceed: boolean;
}

const SelectCIType: React.FC<SelectCITypeProps> = ({
  selectedCI,
  onSelectCI
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-gray-900">Step 1: Select CI System</h2>
      
      <Alert className="mb-3 bg-gray-50 border-gray-300 py-2">
        <Info className="h-4 w-4 text-gray-700" />
        <AlertTitle className="text-gray-800 font-medium text-sm">Streamline your CI pipeline with JFrog</AlertTitle>
        <AlertDescription className="text-gray-700 text-xs">
          Integrating JFrog with your CI system enhances security and improves artifact management.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedCI === 'github' 
              ? 'border-gray-600 bg-gray-100 ring-1 ring-gray-400/30 shadow-sm' 
              : 'border-gray-300'
          }`}
          onClick={() => onSelectCI('github')}
        >
          <Github className="h-8 w-8 mr-3 text-gray-700" />
          <div>
            <h3 className="font-medium text-base text-gray-800">GitHub Actions</h3>
            <p className="text-xs text-gray-600">
              Configure JFrog with GitHub Actions
            </p>
          </div>
        </div>
        
        <div 
          className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedCI === 'other' 
              ? 'border-gray-600 bg-gray-100 ring-1 ring-gray-400/30 shadow-sm' 
              : 'border-gray-300'
          }`}
          onClick={() => onSelectCI('other')}
        >
          <Code className="h-8 w-8 mr-3 text-gray-700" />
          <div>
            <h3 className="font-medium text-base text-gray-800">Other CI Systems</h3>
            <p className="text-xs text-gray-600">
              Circle CI, Jenkins, GitLab CI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCIType;
