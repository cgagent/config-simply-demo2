import { useState, useCallback } from 'react';
import { Message } from '../types/messageTypes';

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => {
      // If this is a package table message, replace all existing messages
      if (message.type === 'package-table') {
        return [
          // Keep only the most recent user message
          prev.find(m => m.role === 'user' && m === prev[prev.length - 1]),
          message
        ].filter(Boolean) as Message[];
      }
      return [...prev, message];
    });
  }, []);

  const addUserMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      type: 'text',
      timestamp: Date.now()
    };
    
    console.log("Adding user message:", content);
    addMessage(userMessage);
  }, [addMessage]);

  const addBotMessage = useCallback((content: string | Message) => {
    if (!content) return;
    
    let botMessage: Message;
    
    if (typeof content === 'string') {
      botMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        type: 'text',
        timestamp: Date.now()
      };
    } else {
      botMessage = content;
    }
    
    // Special handling for package table messages
    if (botMessage.type === 'package-table') {
      setMessages(prev => {
        // Keep only the most recent user message
        const userMessage = prev.find(m => m.role === 'user' && m === prev[prev.length - 1]);
        return userMessage ? [userMessage, botMessage] : [botMessage];
      });
    } else {
      console.log("Adding bot message");
      addMessage(botMessage);
    }
  }, [addMessage]);

  const resetMessages = useCallback(() => {
    console.log("Resetting messages");
    setMessages([]);
    setInputValue('');
    setIsProcessing(false);
  }, []);

  return {
    messages,
    isProcessing,
    setIsProcessing,
    inputValue,
    setInputValue,
    addUserMessage,
    addBotMessage,
    resetMessages
  };
};
