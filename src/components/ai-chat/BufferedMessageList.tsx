import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from './config/constants/chatConstants';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';
import { ChatOption } from '@/components/shared/types';

// Thinking animation component with three dots
const ThinkingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 py-2">
      <motion.div 
        className="h-3 w-3 bg-primary/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
      />
      <motion.div 
        className="h-3 w-3 bg-primary/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div 
        className="h-3 w-3 bg-primary/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

interface BufferedMessageListProps {
  messages: Message[];
  isProcessing?: boolean;
  onSelectOption?: (option: ChatOption) => void;
}

export const BufferedMessageList: React.FC<BufferedMessageListProps> = ({ 
  messages, 
  isProcessing = false, 
  onSelectOption 
}) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [bufferHeight, setBufferHeight] = useState<number>(0);
  const lastUserMessageRef = useRef<string | null>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate and update buffer height
  const updateBufferHeight = () => {
    if (messageListRef.current && latestMessageRef.current) {
      const containerHeight = messageListRef.current.clientHeight;
      const latestMessageHeight = latestMessageRef.current.clientHeight;
      const newBufferHeight = Math.max(0, containerHeight - latestMessageHeight - 30); // Subtract 30px from buffer
      setBufferHeight(newBufferHeight);
    }
  };

  // Split messages into latest exchange and history
  const getMessageGroups = () => {
    if (messages.length === 0) return { latestExchange: [], history: [] };
    
    const lastUserIndex = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserIndex === -1) return { latestExchange: [], history: messages };
    
    const historyEndIndex = messages.length - lastUserIndex - 1;
    const history = messages.slice(0, historyEndIndex);
    const latestExchange = messages.slice(historyEndIndex);
    
    return { latestExchange, history };
  };

  // Scroll to maximum position with retry mechanism
  const scrollToMaximum = () => {
    if (messageListRef.current && latestMessageRef.current) {
      const container = messageListRef.current;
      const latestMessage = latestMessageRef.current;
      
      // Check if the latest message contains UI components
      const hasUIComponents = latestMessage.querySelector('.animate-fadeIn') !== null;
      
      // Add extra padding if UI components are present
      const uiComponentPadding = hasUIComponents ? 60 : 20;
      const maxScroll = container.scrollHeight - container.clientHeight - uiComponentPadding;
      
      // Clear any existing scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Function to perform the scroll
      const performScroll = () => {
        if (container) {
          container.scrollTo({
            top: maxScroll,
            behavior: 'smooth'
          });
        }
      };

      // Initial scroll
      performScroll();

      // Set up a backup scroll after a short delay
      scrollTimeoutRef.current = setTimeout(() => {
        performScroll();
      }, 150);
    }
  };

  // Scroll to position the latest message at the top of the view
  const scrollToLatestMessage = () => {
    if (messageListRef.current && latestMessageRef.current) {
      const container = messageListRef.current;
      const latestMessage = latestMessageRef.current;
      const containerRect = container.getBoundingClientRect();
      const messageRect = latestMessage.getBoundingClientRect();
      const scrollAmount = messageRect.top - containerRect.top;
      
      container.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Set up ResizeObserver to detect content changes
  useEffect(() => {
    if (!resizeObserverRef.current && contentRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // When content size changes, trigger scroll to maximum
        if (!isProcessing) {
          scrollToMaximum();
        }
      });

      resizeObserverRef.current.observe(contentRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [isProcessing]);

  // Scroll when new message is added
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      if (lastMessage.role === 'user' && lastMessage.id !== lastUserMessageRef.current) {
        // When user sends a message, scroll to position it at the top
        scrollToLatestMessage();
        lastUserMessageRef.current = lastMessage.id;
      } else if (lastMessage.role === 'bot' && !isProcessing) {
        // When bot response is complete, scroll to maximum position
        scrollToMaximum();
      }
    }
    updateBufferHeight();
  }, [messages, isProcessing]);

  // Update buffer height on window resize
  useEffect(() => {
    const handleResize = () => {
      updateBufferHeight();
      if (!isProcessing) {
        scrollToMaximum();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isProcessing]);

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const { latestExchange, history } = getMessageGroups();

  return (
    <motion.div 
      ref={messageListRef}
      className={cn(
        "flex-1 overflow-y-auto py-4 space-y-5 rounded-md",
        "bg-gradient-to-b from-gray-100/95 to-white/95 border border-border/50 shadow-md",
        "dark:from-gray-850/95 dark:to-gray-900/95 dark:border-gray-800"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-primary text-center text-sm font-medium bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 dark:bg-primary/10">
            Ask anything to get started
          </p>
        </div>
      ) : (
        <div ref={contentRef} className="px-4 space-y-5">
          {/* History messages */}
          {history.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onSelectOption={onSelectOption}
              className="message-item"
            />
          ))}
          
          {/* Latest exchange (user message and response) */}
          <div ref={latestMessageRef} className="space-y-2">
            {latestExchange.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onSelectOption={onSelectOption}
                className="message-item"
              />
            ))}
            
            {/* Thinking animation when processing */}
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="message-item"
              >
                <div className="flex items-start gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <ThinkingAnimation />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Buffer space after the latest exchange */}
          <div style={{ height: `${bufferHeight}px` }} />
        </div>
      )}
    </motion.div>
  );
}; 