
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
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Step 1: Select CI System</h2>
      
      <Alert className="mb-6 bg-gray-50 border-gray-300">
        <Info className="h-5 w-5 text-gray-700" />
        <AlertTitle className="text-gray-800 font-semibold">Streamline your CI pipeline with JFrog</AlertTitle>
        <AlertDescription className="text-gray-700">
          Integrating JFrog with your CI system enhances security, improves artifact management, 
          and provides better visibility into your build process. Select your CI system below to 
          get started with the integration.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div 
          className={`flex items-center border-2 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedCI === 'github' 
              ? 'border-gray-600 bg-gray-100 ring-2 ring-gray-400/30 shadow-lg' 
              : 'border-gray-300'
          }`}
          onClick={() => onSelectCI('github')}
        >
          <Github className="h-14 w-14 mr-6 text-gray-700" />
          <div>
            <h3 className="font-semibold text-xl text-gray-800">GitHub Actions</h3>
            <p className="text-base text-gray-600 mt-2">
              Configure JFrog with GitHub Actions workflows
            </p>
          </div>
        </div>
        
        <div 
          className={`flex items-center border-2 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedCI === 'other' 
              ? 'border-gray-600 bg-gray-100 ring-2 ring-gray-400/30 shadow-lg' 
              : 'border-gray-300'
          }`}
          onClick={() => onSelectCI('other')}
        >
          <Code className="h-14 w-14 mr-6 text-gray-700" />
          <div>
            <h3 className="font-semibold text-xl text-gray-800">Other CI Systems</h3>
            <p className="text-base text-gray-600 mt-2">
              Circle CI, Jenkins, GitLab CI, and others
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCIType;
