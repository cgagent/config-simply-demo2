
import { useEffect, useRef } from 'react';

interface UseAutoSendMessageProps {
  shouldSendMessage: boolean;
  inputValue: string;
  isProcessing: boolean;
  clearShouldSendMessage?: () => void;
  handleSendMessage: (content: string) => void;
}

export const useAutoSendMessage = ({
  shouldSendMessage,
  inputValue,
  isProcessing,
  clearShouldSendMessage,
  handleSendMessage
}: UseAutoSendMessageProps) => {
  const hasSentRef = useRef(false);
  
  useEffect(() => {
    // Reset the flag when input value changes
    hasSentRef.current = false;
  }, [inputValue]);
  
  useEffect(() => {
    const sendMessageIfNeeded = () => {
      if (shouldSendMessage && 
          inputValue.trim() !== '' && 
          !isProcessing && 
          !hasSentRef.current) {
        
        console.log("Auto-sending message:", inputValue);
        hasSentRef.current = true;
        
        // Add a slight delay to ensure UI is ready
        setTimeout(() => {
          handleSendMessage(inputValue);
          
          // Only clear the flag after successfully sending
          if (clearShouldSendMessage) {
            setTimeout(() => {
              clearShouldSendMessage();
            }, 100);
          }
        }, 200);
      }
    };
    
    // Execute with a short delay to allow for state updates
    const timeoutId = setTimeout(sendMessageIfNeeded, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldSendMessage, inputValue, isProcessing, clearShouldSendMessage, handleSendMessage]);
};
