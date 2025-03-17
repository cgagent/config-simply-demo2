
import React, { useState, useEffect, useRef } from 'react';
import { InitialChatScreen } from './InitialChatScreen';
import { ConversationScreen } from './ConversationScreen';
import { useMessageHandler } from './hooks/useMessageHandler';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  const [isTyping, setIsTyping] = useState(false);
  const [displayedInput, setDisplayedInput] = useState('');
  const [fullInput, setFullInput] = useState('');
  const typingSpeed = 50; // milliseconds per character
  const typingTimerRef = useRef<number | null>(null);

  // Simulate typing effect
  const simulateTyping = (text: string) => {
    setIsTyping(true);
    setFullInput(text);
    setDisplayedInput('');
    
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedInput(prev => prev + text.charAt(currentIndex));
        currentIndex++;
        typingTimerRef.current = window.setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsTyping(false);
        // Send the message after typing animation completes
        handleSendMessage(text);
        // Clear the initial value to prevent re-sending
        if (clearInitialInputValue) {
          clearInitialInputValue();
        }
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

  // Listen for initial input value changes
  useEffect(() => {
    if (initialInputValue && initialInputValue.trim() !== '') {
      // Set the input value immediately for display
      setInputValue(initialInputValue);
      // Start typing animation
      simulateTyping(initialInputValue);
    }
  }, [initialInputValue, clearInitialInputValue]);

  // Notify parent component about chat state changes
  useEffect(() => {
    if (onChatStateChange) {
      onChatStateChange(messages.length > 0);
    }
  }, [messages.length, onChatStateChange]);

  // Function to handle going back to home view
  const handleBackToHome = () => {
    if (onChatStateChange) {
      onChatStateChange(false);
    }
  };

  // Initial state (no messages yet)
  if (messages.length === 0) {
    return (
      <InitialChatScreen
        isProcessing={isProcessing || isTyping}
        inputValue={isTyping ? displayedInput : inputValue}
        setInputValue={isTyping ? () => {} : setInputValue}
        onSendMessage={isTyping ? () => {} : handleSendMessage}
        onSelectQuery={handleSelectQuery}
      />
    );
  }

  // Chat state (after user has sent at least one message)
  return (
    <>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button 
                  onClick={handleBackToHome}
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Back to Home
                </button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ConversationScreen
        messages={messages}
        isProcessing={isProcessing || isTyping}
        inputValue={isTyping ? displayedInput : inputValue}
        setInputValue={isTyping ? () => {} : setInputValue}
        onSendMessage={isTyping ? () => {} : handleSendMessage}
        onSelectQuery={handleSelectQuery}
        showCIConfig={showCIConfig}
        repository={repository}
      />
    </>
  );
};
