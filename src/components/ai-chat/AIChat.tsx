import React, { useState } from 'react';
import { Message } from './ChatMessage';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useToast } from '@/hooks/use-toast';

const INITIAL_MESSAGES: Message[] = [];

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      // In a real app, this would be an API call to an LLM service
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: simulateAIResponse(content)
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again."
      });
      setIsProcessing(false);
    }
  };

  // Simulate AI response (would be replaced with actual API call)
  const simulateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return "Hello! How can I assist you today?";
    } 
    else if (lowerQuery.includes('repository') || lowerQuery.includes('repositories')) {
      return "Repositories are where your code lives. You can manage your repositories through the CI section of this application. Would you like to know more about setting up CI for your repositories?";
    }
    else if (lowerQuery.includes('ci') || lowerQuery.includes('continuous integration')) {
      return "Continuous Integration (CI) helps you automatically build, test, and validate code changes. Our CI tools integrate with your repositories to ensure code quality and streamline deployments. You can set up CI workflows in the CI section.";
    }
    else if (lowerQuery.includes('user') || lowerQuery.includes('account')) {
      return "User management allows you to control access to your organization's resources. You can add users, define roles, and set permissions in the User Management section.";
    }
    else {
      return "I understand you're asking about \"" + query + "\". Let me provide some information about that. This is a simulated response in our demo application. In a production environment, this would connect to an AI language model API like OpenAI GPT, Anthropic Claude, or Perplexity to provide helpful and accurate responses.";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
      </div>
      <div className="pt-4 border-t">
        <ChatInput isProcessing={isProcessing} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
