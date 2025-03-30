
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    label: string;
    number: number;
  }>;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8 border-r pr-6">
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-gray-300'
              }`}>
                {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <span className="ml-3 text-sm font-medium">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="ml-5 w-0.5 h-10 bg-gray-200">
                <div 
                  className={`h-full ${currentStep > step.number ? 'bg-primary' : 'bg-gray-200'}`} 
                  style={{ height: currentStep > step.number ? '100%' : '0%' }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
