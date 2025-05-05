import React, { useRef, useEffect } from 'react';
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

interface MessageListProps {
  messages: Message[];
  isProcessing?: boolean;
  onSelectOption?: (option: ChatOption) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing = false, onSelectOption }) => {
  // Debug log to see what messages we're receiving
  console.log("MessageList rendering with messages:", JSON.stringify(messages, null, 2));
  
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  const scrollToMessage = (messageElement: Element) => {
    if (messageListRef.current) {
      const container = messageListRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = messageElement.getBoundingClientRect().top;
      
      // Calculate the scroll amount needed to position the element at the top
      const scrollAmount = container.scrollTop + (elementTop - containerTop) - 20;
      
      // Use smooth scrolling
      container.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only scroll when a new user message is added
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'user' && lastMessage.id !== lastUserMessageRef.current) {
      // Wait for animations to complete (500ms for Framer Motion animations)
      setTimeout(() => {
        const messageElements = Array.from(messageListRef.current?.getElementsByClassName('message-item') || []);
        const lastMessageElement = messageElements[messageElements.length - 1];
        
        if (lastMessageElement) {
          scrollToMessage(lastMessageElement);
        }
      }, 100); // Small delay to let the DOM update and animations start
      
      lastUserMessageRef.current = lastMessage.id;
    }
  }, [messages]);

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
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-primary text-center text-sm font-medium bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 dark:bg-primary/10">
            Ask anything to get started
          </p>
        </div>
      )}
      <div className="px-4 space-y-5">
        {messages.map((message) => (
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
            transition={{ duration: 0.5 }}
            className="px-3 message-item"
          >
            <div className="flex gap-3 p-4 rounded-lg shadow-md border bg-card border-border/60 mr-8 rounded-tl-none">
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-foreground">
                    AI Assistant
                  </p>
                </div>
                <div className="py-2">
                  <ThinkingAnimation />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
