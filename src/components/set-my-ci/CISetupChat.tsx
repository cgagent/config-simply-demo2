
import React from 'react';
import { useCISetupState } from './hooks/useCISetupState';
import ChatBox from './ChatBox';
import MessageRenderer from './MessageRenderer';
import { useMessagesState } from './hooks/useMessagesState';

const CISetupChat = () => {
  // Use our core CI setup hooks
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
  
  // Use our refactored messages state hook
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

  // Get placeholder text based on current step
  const getPlaceholderText = () => {
    switch(currentStep) {
      case 1:
        return "Select a CI system or type your choice...";
      case 2:
        return "Tell us which package managers you use...";
      case 3:
        return "Type 'continue' to proceed to implementation...";
      default:
        return "Type your message here...";
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
      <MessageRenderer messages={messages} />
      <ChatBox 
        onSendMessage={handleChatMessage} 
        placeholder={getPlaceholderText()}
        disabled={setupComplete}
      />
    </div>
  );
};

export default CISetupChat;
