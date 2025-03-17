
import { useState, useRef, useEffect } from 'react';

export interface UseTypingAnimationProps {
  messages: Array<{ role: string; content: string, id: string }>;
  typingSpeed?: number;
}

export const useTypingAnimation = ({ messages, typingSpeed = 15 }: UseTypingAnimationProps) => {
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
  const typingTimerRef = useRef<number | null>(null);
  const latestMessageRef = useRef<string | null>(null);

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

  // Clean up typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  // Create a modified messages array with the animated content for the last bot message
  const getAnimatedMessages = () => {
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
    return displayMessages;
  };

  return {
    isAnimatingResponse,
    getAnimatedMessages
  };
};
