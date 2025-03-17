
import { useEffect, useRef } from 'react';

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
  // Track last processed input
  const lastProcessedInputRef = useRef<string>('');
  // Processing flag to prevent loops
  const processingRef = useRef(false);
  
  // Handle initialInputValue changes safely
  useEffect(() => {
    // Skip if empty, already processing, or already processed this exact input
    if (!initialInputValue || 
        initialInputValue.trim() === '' || 
        processingRef.current ||
        initialInputValue === lastProcessedInputRef.current) {
      return;
    }
    
    console.log("Processing new initial input value:", initialInputValue);
    
    // Set processing flag to prevent re-entrant processing
    processingRef.current = true;
    
    // Update lastProcessed reference
    lastProcessedInputRef.current = initialInputValue;
    
    // Update input value
    setInputValue(initialInputValue);
    
    // Clear initialInputValue to prevent reprocessing
    if (clearInitialInputValue) {
      setTimeout(() => {
        clearInitialInputValue();
        // Release processing lock after sufficient delay
        setTimeout(() => {
          processingRef.current = false;
        }, 500);
      }, 200);
    } else {
      // Release processing lock after sufficient delay if no clearInitialInputValue function
      setTimeout(() => {
        processingRef.current = false;
      }, 700);
    }
  }, [initialInputValue, clearInitialInputValue, setInputValue]);

  // Check if we have initial input
  const hasInitialInput = initialInputValue && initialInputValue.trim() !== '';
  
  return { hasInitialInput };
};
