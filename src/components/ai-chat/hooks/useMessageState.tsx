import { useState, useCallback } from 'react';
import { Message } from '../types/messageTypes';

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
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        type: 'text',
        timestamp: Date.now()
      };
    } else {
      botMessage = content;
    }
    
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
