
import { useState, useCallback, useEffect } from 'react';

export type CIType = 'github' | 'other' | null;

export interface UseCISetupStateProps {
  initialStep?: number;
  initialCI?: CIType;
  initialPackages?: string[];
}

export function useCISetupState({
  initialStep = 1,
  initialCI = null,
  initialPackages = []
}: UseCISetupStateProps = {}) {
  const [selectedCI, setSelectedCI] = useState<CIType>(initialCI);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(initialPackages);
  const [currentStep, setCurrentStep] = useState(initialStep);

  // Function to handle CI selection
  const handleCISelection = useCallback((ciType: string) => {
    setSelectedCI(ciType as CIType);
    setCurrentStep(2);
  }, []);

  // Function to handle package manager selection
  const handlePackageSelection = useCallback((packageType: string) => {
    console.log('Package selection toggled in hook:', packageType);
    setSelectedPackages(prevSelected => {
      // Create a new array to ensure React detects the state change
      if (prevSelected.includes(packageType)) {
        // Remove if already selected
        return prevSelected.filter(p => p !== packageType);
      } else {
        // Add if not already selected
        return [...prevSelected, packageType];
      }
    });
  }, []);

  // Debug effect to track package selection changes
  useEffect(() => {
    console.log('Selected packages updated:', selectedPackages);
  }, [selectedPackages]);

  // Function to continue to step 3
  const handleContinueToStep3 = useCallback(() => {
    setCurrentStep(3);
  }, []);

  // Function to continue to step 4 (completion)
  const handleContinueToStep4 = useCallback(() => {
    setCurrentStep(4);
  }, []);

  // Add a function to go to previous step
  const handlePreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  // Format selected packages as text
  const getSelectedPackagesText = useCallback(() => {
    return selectedPackages.join(', ');
  }, [selectedPackages]);

  // Check if we can proceed to next step
  const canProceedToNextStep = useCallback((step: number) => {
    switch (step) {
      case 1:
        return selectedCI !== null;
      case 2:
        return selectedPackages.length > 0;
      default:
        return true;
    }
  }, [selectedCI, selectedPackages]);

  return {
    selectedCI,
    selectedPackages,
    currentStep,
    handleCISelection,
    handlePackageSelection,
    handleContinueToStep3,
    handleContinueToStep4,
    handlePreviousStep,
    getSelectedPackagesText,
    canProceedToNextStep
  };
}
