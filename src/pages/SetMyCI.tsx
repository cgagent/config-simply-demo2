
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StepIndicator from '@/components/ci-configuration/StepIndicator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import SelectCIType from '@/components/set-my-ci/SelectCIType';
import SelectPackageManagers from '@/components/set-my-ci/SelectPackageManagers';
import CISnippetDisplay from '@/components/set-my-ci/snippet-display';
import ImplementationGuide from '@/components/set-my-ci/ImplementationGuide';

const SetMyCI = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCI, setSelectedCI] = useState<'github' | 'other' | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  
  // Define steps
  const steps = [
    { number: 1, label: 'Select CI System' },
    { number: 2, label: 'Package Managers' },
    { number: 3, label: 'Configuration Snippet' },
    { number: 4, label: 'Implementation Guide' }
  ];

  // Handle going back to previous page
  const handleGoBack = () => {
    navigate('/home');
  };

  // Move to next step
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Move to previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle CI selection
  const handleCISelect = (ci: 'github' | 'other') => {
    setSelectedCI(ci);
  };

  // Toggle package manager selection
  const handleTogglePackage = (packageType: string) => {
    if (selectedPackages.includes(packageType)) {
      setSelectedPackages(selectedPackages.filter(p => p !== packageType));
    } else {
      setSelectedPackages([...selectedPackages, packageType]);
    }
  };

  // Check if user can proceed to next step
  const canProceed = () => {
    if (currentStep === 1) return selectedCI !== null;
    if (currentStep === 2) return selectedPackages.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 mt-16">
        <div className="animate-fadeIn">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-4" 
              onClick={handleGoBack}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to home
            </Button>
            <h1 className="text-2xl font-bold">
              Set My CI
            </h1>
          </div>

          {/* Layout with steps on the left and content on the right */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Step indicator on the left */}
            <div className="md:w-64 flex-shrink-0">
              <StepIndicator currentStep={currentStep} steps={steps} />
            </div>

            {/* Step Content on the right */}
            <div className="flex-1">
              {currentStep === 1 && (
                <SelectCIType
                  selectedCI={selectedCI}
                  onSelectCI={handleCISelect}
                  onNextStep={handleNextStep}
                  canProceed={canProceed()}
                />
              )}

              {currentStep === 2 && (
                <SelectPackageManagers
                  selectedPackages={selectedPackages}
                  onTogglePackage={handleTogglePackage}
                  onNextStep={handleNextStep}
                  onPreviousStep={handlePreviousStep}
                  canProceed={canProceed()}
                />
              )}

              {currentStep === 3 && (
                <CISnippetDisplay
                  selectedCI={selectedCI || 'github'}
                  selectedPackages={selectedPackages}
                  onNextStep={handleNextStep}
                  onPreviousStep={handlePreviousStep}
                />
              )}

              {currentStep === 4 && (
                <ImplementationGuide
                  selectedCI={selectedCI || 'github'}
                  selectedPackages={selectedPackages}
                  onPreviousStep={handlePreviousStep}
                  onFinish={handleGoBack}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SetMyCI;
