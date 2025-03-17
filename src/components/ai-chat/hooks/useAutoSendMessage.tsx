
import { useEffect } from 'react';

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
  // Handle the shouldSendMessage flag
  useEffect(() => {
    if (shouldSendMessage && inputValue && !isProcessing && clearShouldSendMessage) {
      console.log("Auto-sending message:", inputValue);
      handleSendMessage(inputValue);
      clearShouldSendMessage();
    }
  }, [shouldSendMessage, inputValue, isProcessing, handleSendMessage, clearShouldSendMessage]);
};
