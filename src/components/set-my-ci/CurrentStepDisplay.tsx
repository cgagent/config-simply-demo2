
import React from 'react';
import { Button } from '@/components/ui/button';
import SelectCIType from './SelectCIType';
import SelectPackageManagers from './SelectPackageManagers';
import ImplementationGuide from './ImplementationGuide';

interface CurrentStepDisplayProps {
  currentStep: number;
  selectedCI: 'github' | 'other' | null;
  selectedPackages: string[];
  onSelectCI: (ci: 'github' | 'other') => void;
  onTogglePackage: (packageType: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onFinish?: () => void;
}

const CurrentStepDisplay: React.FC<CurrentStepDisplayProps> = ({
  currentStep,
  selectedCI,
  selectedPackages,
  onSelectCI,
  onTogglePackage,
  onNextStep,
  onPreviousStep,
  onFinish
}) => {
  return (
    <div className="border border-blue-700/30 rounded-md overflow-hidden">
      {currentStep === 1 && (
        <SelectCIType
          selectedCI={selectedCI}
          onSelectCI={onSelectCI}
          onNextStep={() => {}}
          canProceed={!!selectedCI}
        />
      )}
      
      {currentStep === 2 && (
        <SelectPackageManagers
          selectedPackages={selectedPackages}
          onTogglePackage={onTogglePackage}
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          canProceed={selectedPackages.length > 0}
        />
      )}

      {currentStep === 3 && selectedCI && (
        <ImplementationGuide
          selectedCI={selectedCI}
          selectedPackages={selectedPackages}
          onPreviousStep={onPreviousStep}
          onFinish={onFinish || (() => {})}
        />
      )}

      {currentStep === 2 && selectedPackages.length > 0 && (
        <div className="mt-3 flex justify-between p-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onPreviousStep}
            className="text-blue-300"
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={onNextStep}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurrentStepDisplay;
