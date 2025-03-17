
import { useState, useEffect, useRef } from 'react';

interface UseInitialInputProps {
  initialInputValue: string;
  clearInitialInputValue?: () => void;
  setInputValue: (value: string) => void;
  isProcessing: boolean;
}

export const useInitialInput = ({
  initialInputValue,
  clearInitialInputValue,
  setInputValue,
  isProcessing
}: UseInitialInputProps) => {
  const [hasInitialInput, setHasInitialInput] = useState(false);
  const previousInputRef = useRef('');
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // If we get a new initial input value that's different from what we've seen before
    if (initialInputValue && initialInputValue !== previousInputRef.current) {
      console.log("Processing new initial input value:", initialInputValue);
      previousInputRef.current = initialInputValue;
      
      // Clear any existing timeout
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
      
      // Set the input value with a brief delay
      setInputValue(initialInputValue);
      setHasInitialInput(true);
      
      // Set a timeout to clear the initial input value after it has been processed
      if (clearInitialInputValue) {
        processingTimeoutRef.current = setTimeout(() => {
          clearInitialInputValue();
          processingTimeoutRef.current = null;
        }, 500);
      }
    }
    
    // If we don't have an initial input value anymore, update our state accordingly
    if (!initialInputValue && hasInitialInput && !isProcessing) {
      previousInputRef.current = '';
      setHasInitialInput(false);
    }
  }, [initialInputValue, clearInitialInputValue, setInputValue, hasInitialInput, isProcessing]);

  return { hasInitialInput };
};
