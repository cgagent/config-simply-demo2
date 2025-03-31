
import React, { useRef, useEffect, useState } from 'react';
import { useCISetupState } from './hooks/useCISetupState';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import CompletionStep from './steps/CompletionStep';

const CISetupChat = () => {
  const {
    selectedCI,
    selectedPackages,
    currentStep,
    handleCISelection,
    handlePackageSelection,
    handleContinueToStep3,
    handleContinueToStep4,
    handlePreviousStep,
    getSelectedPackagesText
  } = useCISetupState();
  
  const [messages, setMessages] = useState<Array<{ id: number, component: React.ReactNode }>>([
    { id: 1, component: <StepOne onSelectCI={handleCISelection} selectedCI={selectedCI} /> }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [setupComplete, setSetupComplete] = useState(false);

  // Update messages when steps change
  useEffect(() => {
    // Effect for handling Step 2
    if (currentStep === 2 && selectedCI) {
      const ciName = selectedCI === 'github' ? 'GitHub Actions' : 'Other CI Systems';
      
      // Check if step 2 is already in the messages
      const step2Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepTwo;
      });
      
      if (!step2Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            component: (
              <StepTwo 
                ciName={ciName} 
                onPackageSelection={handlePackageSelection} 
                selectedPackages={selectedPackages} 
                onContinue={handleContinueToStep3} 
              />
            )
          }
        ]);
      } else {
        // Update the existing Step 2 component with new props
        setMessages(prev => 
          prev.map(msg => {
            const comp = msg.component as React.ReactElement;
            if (comp.type === StepTwo) {
              return {
                ...msg,
                component: (
                  <StepTwo 
                    ciName={ciName} 
                    onPackageSelection={handlePackageSelection} 
                    selectedPackages={selectedPackages} 
                    onContinue={handleContinueToStep3} 
                  />
                )
              };
            }
            return msg;
          })
        );
      }
    } 
    // Effect for handling Step 3
    else if (currentStep === 3) {
      const step3Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepThree;
      });
      
      if (!step3Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            component: (
              <StepThree 
                packagesText={getSelectedPackagesText()} 
                selectedCI={selectedCI} 
                selectedPackages={selectedPackages} 
                onNextStep={handleContinueToStep4}
                onPreviousStep={handlePreviousStep}
              />
            )
          }
        ]);
      }
    } 
    // Effect for handling Step 4
    else if (currentStep === 4) {
      const step4Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepFour;
      });
      
      if (!step4Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            component: (
              <StepFour 
                onComplete={() => {
                  setSetupComplete(true);
                  setMessages(prevMessages => [
                    ...prevMessages,
                    { id: Date.now(), component: <CompletionStep /> }
                  ]);
                }} 
              />
            )
          }
        ]);
      }
    }
  }, [currentStep, selectedCI, selectedPackages, handlePackageSelection, handleContinueToStep3, handleContinueToStep4, handlePreviousStep, getSelectedPackagesText]);

  // Force rerender Step 2 when selectedPackages changes
  useEffect(() => {
    if (currentStep === 2) {
      setMessages(prev => 
        prev.map(msg => {
          const comp = msg.component as React.ReactElement;
          if (comp.type === StepTwo) {
            const ciName = selectedCI === 'github' ? 'GitHub Actions' : 'Other CI Systems';
            return {
              ...msg,
              component: (
                <StepTwo 
                  key={selectedPackages.join(',')} // Add key to force rerender
                  ciName={ciName} 
                  onPackageSelection={handlePackageSelection} 
                  selectedPackages={selectedPackages} 
                  onContinue={handleContinueToStep3} 
                />
              )
            };
          }
          return msg;
        })
      );
    }
  }, [selectedPackages, currentStep, selectedCI, handlePackageSelection, handleContinueToStep3]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-y-auto h-[500px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>{message.component}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default CISetupChat;
