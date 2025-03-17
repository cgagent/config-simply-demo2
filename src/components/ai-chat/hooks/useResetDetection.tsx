
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseResetDetectionProps {
  resetMessages: () => void;
}

export const useResetDetection = ({ resetMessages }: UseResetDetectionProps) => {
  const location = useLocation();
  // Reset detection flag
  const resetDetectedRef = useRef(false);
  // Reference for last processed input
  const lastProcessedInputRef = useRef<string>('');
  // Processing reference
  const processingRef = useRef(false);

  // Handle chat reset requests
  useEffect(() => {
    if (location.state && location.state.resetChat && !resetDetectedRef.current) {
      console.log("AIChat detected reset state, clearing messages");
      resetDetectedRef.current = true;
      resetMessages();
      lastProcessedInputRef.current = '';
      processingRef.current = false;
      
      // Reset detection flag after delay to allow future resets
      setTimeout(() => {
        resetDetectedRef.current = false;
      }, 200);
    }
  }, [location.state, resetMessages]);

  return { lastProcessedInputRef, processingRef };
};
