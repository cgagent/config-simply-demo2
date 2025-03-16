
import React, { useState } from 'react';
import { InitialChatScreen } from './InitialChatScreen';
import { ConversationScreen } from './ConversationScreen';
import { useMessageHandler } from './hooks/useMessageHandler';

interface AIChatProps {
  onChatStateChange?: (isChatActive: boolean) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onChatStateChange }) => {
  const {
    messages,
    isProcessing,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSelectQuery,
    showCIConfig,
    repository
  } = useMessageHandler();

  // Notify parent component about chat state changes
  React.useEffect(() => {
    if (onChatStateChange) {
      onChatStateChange(messages.length > 0);
    }
  }, [messages.length, onChatStateChange]);

  // Initial state (no messages yet)
  if (messages.length === 0) {
    return (
      <InitialChatScreen
        isProcessing={isProcessing}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onSelectQuery={handleSelectQuery}
      />
    );
  }

  // Chat state (after user has sent at least one message)
  return (
    <ConversationScreen
      messages={messages}
      isProcessing={isProcessing}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onSendMessage={handleSendMessage}
      onSelectQuery={handleSelectQuery}
      showCIConfig={showCIConfig}
      repository={repository}
    />
  );
};
