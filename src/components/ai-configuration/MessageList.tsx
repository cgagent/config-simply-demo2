import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import { MessageItem } from './MessageItem';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

// Thinking animation component with three dots
const ThinkingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 py-2">
      <motion.div 
        className="h-3 w-3 bg-blue-500/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
      />
      <motion.div 
        className="h-3 w-3 bg-blue-500/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div 
        className="h-3 w-3 bg-blue-500/70 rounded-full"
        animate={{ scale: [0.6, 1, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  isProcessing?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className={cn(
        "flex-1 overflow-y-auto p-4 space-y-5 rounded-md",
        " shadow-md backdrop-blur-sm"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-blue-200 text-center font-medium bg-none px-4 py-2 rounded-lg border-none  shadow-inner backdrop-blur-sm">
            No messages yet. Start typing to begin.
          </p>
        </div>
      )}
      <div className="space-y-5">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        
        {/* Thinking animation when processing */}
        {isProcessing && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="max-w-[85%] rounded-lg p-4 shadow-md border-blue-800/30 bg-blue-900/10 border mr-8 rounded-tl-none backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-2">
                <div className="p-1 rounded-full bg-blue-800/30 border border-blue-700/30">
                  <Bot className="w-4 h-4 mr-1 text-blue-300" />
                </div>
                <span className="text-xs font-medium ml-2 text-blue-200">
                  JFrog Assistant
                </span>
              </div>
              
              <div className="py-2">
                <ThinkingAnimation />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </motion.div>
  );
};
