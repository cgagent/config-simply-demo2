
import { useState, useCallback } from 'react';
import { Message } from '../constants';

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    console.log("Adding user message:", content);
    addMessage(userMessage);
  }, [addMessage]);

  const addBotMessage = useCallback((content: string) => {
    if (!content) return;
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content
    };
    
    console.log("Adding bot message");
    addMessage(botMessage);
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
