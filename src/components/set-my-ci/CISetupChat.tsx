
import React from 'react';
import { useCISetupState } from './hooks/useCISetupState';
import ChatBox from './ChatBox';
import MessageRenderer from './MessageRenderer';
import { useMessagesState } from './hooks/useMessagesState';

const CISetupChat = () => {
  const {
    selectedCI,
    selectedPackages,
    currentStep,
    userMessages,
    handleCISelection,
    handlePackageSelection,
    handleChatMessage,
    handleContinueToStep3,
    handleContinueToStep4,
    handlePreviousStep,
    getSelectedPackagesText
  } = useCISetupState();
  
  const {
    messages,
    setupComplete
  } = useMessagesState({
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
  });

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
      <MessageRenderer messages={messages} />
      <ChatBox 
        onSendMessage={handleChatMessage} 
        placeholder={
          currentStep === 1 ? "Type which CI system you want to use..." :
          currentStep === 2 ? "Tell us which package managers you use..." :
          currentStep === 3 ? "Type 'continue' to proceed to implementation..." :
          "Type your message here..."
        }
        disabled={setupComplete}
      />
    </div>
  );
};

export default CISetupChat;
