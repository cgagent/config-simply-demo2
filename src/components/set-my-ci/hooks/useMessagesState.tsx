
import { useState, useEffect } from 'react';
import StepOne from '../steps/StepOne';
import StepTwo from '../steps/StepTwo';
import StepThree from '../steps/StepThree';
import StepFour from '../steps/StepFour';
import CompletionStep from '../steps/CompletionStep';
import { ChatMessage } from '../ChatMessage';
import { CIType } from './useCISetupState';

interface UseMessagesStateProps {
  currentStep: number;
  selectedCI: CIType;
  selectedPackages: string[];
  userMessages: Array<{
    id: string;
    text: string;
    type: 'user' | 'system';
    timestamp: Date;
  }>;
  handleCISelection: (ciType: string) => void;
  handlePackageSelection: (packageType: string) => void;
  handleContinueToStep3: () => void;
  handleContinueToStep4: () => void;
  handlePreviousStep: () => void;
  getSelectedPackagesText: () => string;
}

export function useMessagesState({
  currentStep,
  selectedCI,
  selectedPackages,
  userMessages,
  handleCISelection,
  handlePackageSelection,
  handleContinueToStep3,
  handleContinueToStep4,
  handlePreviousStep,
  getSelectedPackagesText
}: UseMessagesStateProps) {
  const [messages, setMessages] = useState<Array<{ id: string, component: React.ReactNode }>>([
    { id: 'step-1-initial', component: <StepOne onSelectCI={handleCISelection} selectedCI={selectedCI} /> }
  ]);
  
  const [setupComplete, setSetupComplete] = useState(false);
  // Track which user messages have been processed
  const [processedMessageIds, setProcessedMessageIds] = useState<Set<string>>(new Set());

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
            id: `step-2-${Date.now()}`, 
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
            id: `step-3-${Date.now()}`, 
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
            id: `step-4-${Date.now()}`, 
            component: (
              <StepFour 
                onComplete={() => {
                  setSetupComplete(true);
                  setMessages(prevMessages => [
                    ...prevMessages,
                    { id: `completion-${Date.now()}`, component: <CompletionStep /> }
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
                  key={`step2-${selectedPackages.join(',')}`} // Add key to force rerender
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

  // Add user messages to the chat - fixed to avoid duplicates
  useEffect(() => {
    if (userMessages.length > 0) {
      // Process only unprocessed messages to avoid duplicates
      userMessages.forEach(message => {
        if (!processedMessageIds.has(message.id)) {
          // Add this message to the processed set
          setProcessedMessageIds(prev => {
            const newSet = new Set(prev);
            newSet.add(message.id);
            return newSet;
          });
          
          // Add the message to the chat
          setMessages(prev => [
            ...prev,
            {
              id: `user-msg-${message.id}`,
              component: (
                <ChatMessage 
                  type="system" 
                  content={message.text}
                  isUser={true}
                />
              )
            }
          ]);
        }
      });
    }
  }, [userMessages, processedMessageIds]);

  return {
    messages,
    setupComplete,
    setMessages,
    setSetupComplete
  };
}
