
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import SelectCIType from '@/components/set-my-ci/SelectCIType';
import SelectPackageManagers from '@/components/set-my-ci/SelectPackageManagers';
import CISnippetDisplay from '@/components/set-my-ci/snippet-display';
import ImplementationGuide from '@/components/set-my-ci/ImplementationGuide';

const SetMyCI = () => {
  const navigate = useNavigate();
  const [selectedCI, setSelectedCI] = useState<'github' | 'other' | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  
  // Handle going back to previous page
  const handleGoBack = () => {
    navigate('/home');
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 mt-16">
        <div className="animate-fadeIn">
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              className="mr-4 text-blue-700 border-blue-300" 
              onClick={handleGoBack}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to home
            </Button>
            <h1 className="text-3xl font-bold text-blue-900">
              Set My CI
            </h1>
          </div>

          <div className="space-y-8">
            <SelectCIType
              selectedCI={selectedCI}
              onSelectCI={handleCISelect}
              canProceed={true}
              onNextStep={() => {}}
            />

            {selectedCI && (
              <SelectPackageManagers
                selectedPackages={selectedPackages}
                onTogglePackage={handleTogglePackage}
                canProceed={true}
                onNextStep={() => {}}
                onPreviousStep={() => {}}
              />
            )}

            {selectedCI && selectedPackages.length > 0 && (
              <CISnippetDisplay
                selectedCI={selectedCI}
                selectedPackages={selectedPackages}
                onNextStep={() => {}}
                onPreviousStep={() => {}}
              />
            )}

            {selectedCI && selectedPackages.length > 0 && (
              <ImplementationGuide
                selectedCI={selectedCI}
                selectedPackages={selectedPackages}
                onPreviousStep={() => {}}
                onFinish={handleGoBack}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SetMyCI;
