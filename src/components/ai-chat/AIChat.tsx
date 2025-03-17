
import React, { useState, useEffect, useRef } from 'react';
import { InitialChatScreen } from './InitialChatScreen';
import { ConversationScreen } from './ConversationScreen';
import { useMessageHandler } from './hooks/useMessageHandler';
import { useLocation } from 'react-router-dom';

interface AIChatProps {
  onChatStateChange?: (isChatActive: boolean) => void;
  initialInputValue?: string;
  clearInitialInputValue?: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ 
  onChatStateChange, 
  initialInputValue = '', 
  clearInitialInputValue 
}) => {
  const location = useLocation();
  const {
    messages,
    isProcessing,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSelectQuery,
    showCIConfig,
    repository,
    resetMessages
  } = useMessageHandler();
  
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
  const typingSpeed = 15; // milliseconds per character - faster than before
  const typingTimerRef = useRef<number | null>(null);
  const latestMessageRef = useRef<string | null>(null);

  // Check location state for reset flag
  useEffect(() => {
    if (location.state && location.state.resetChat) {
      console.log("AIChat detected reset state, clearing messages");
      resetMessages();
    }
  }, [location.state, resetMessages]);

  // Simulate typing effect for AI responses
  const simulateTypingResponse = (text: string) => {
    setIsAnimatingResponse(true);
    setDisplayedResponse('');
    
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedResponse(prev => prev + text.charAt(currentIndex));
        currentIndex++;
        typingTimerRef.current = window.setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsAnimatingResponse(false);
      }
    };
    
    typeNextCharacter();
  };

  // Clean up typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  // Listen for new bot messages to animate them
  useEffect(() => {
    const botMessages = messages.filter(m => m.role === 'bot');
    if (botMessages.length > 0) {
      const latestBotMessage = botMessages[botMessages.length - 1];
      
      // Only animate if this is a new message we haven't seen yet
      if (latestBotMessage.content !== latestMessageRef.current) {
        latestMessageRef.current = latestBotMessage.content;
        simulateTypingResponse(latestBotMessage.content);
      }
    }
  }, [messages]);

  // Listen for initial input value changes and send it immediately
  useEffect(() => {
    if (initialInputValue && initialInputValue.trim() !== '') {
      // Set the input value
      setInputValue(initialInputValue);
      // Send the message immediately
      handleSendMessage(initialInputValue);
      // Clear the initial value to prevent re-sending
      if (clearInitialInputValue) {
        clearInitialInputValue();
      }
    }
  }, [initialInputValue, clearInitialInputValue, setInputValue, handleSendMessage]);

  // Notify parent component about chat state changes
  useEffect(() => {
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

  // Create a modified messages array with the animated content for the last bot message
  const displayMessages = [...messages];
  if (isAnimatingResponse && displayMessages.length > 0) {
    // Find the last bot message
    for (let i = displayMessages.length - 1; i >= 0; i--) {
      if (displayMessages[i].role === 'bot') {
        // Replace its content with the currently animated content
        displayMessages[i] = {
          ...displayMessages[i],
          content: displayedResponse
        };
        break;
      }
    }
  }

  // Chat state (after user has sent at least one message)
  return (
    <ConversationScreen
      messages={displayMessages}
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
