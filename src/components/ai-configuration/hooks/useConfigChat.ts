
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message, ChatOption } from '../types';

// Type for the navigation callback
type NavigationCallback = (path: string) => void;
// Type for the merge success callback
type MergeSuccessCallback = (repoName: string, packageType: string) => void;

export const useConfigChat = (
  repositoryName?: string,
  onNavigate?: NavigationCallback,
  onMergeSuccess?: MergeSuccessCallback
) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `Let's set up your CI workflow with JFrog so your packages will be:

⬇️  Downloaded from JFrog
⬆️  Uploaded to JFrog
🔍  Scanned for malicious packages

Let's start by selecting your CI system:` 
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ChatOption[]>([
    { id: 'github', label: 'GitHub Actions', value: 'I want to configure JFrog with GitHub Actions' },
    { id: 'other', label: 'Other CI Systems', value: 'I want to configure JFrog with another CI system (Circle CI, Jenkins, GitLab)' },
  ]);
  const { toast } = useToast();

  const handleSelectOption = (option: ChatOption) => {
    // Add the selected option as a message
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option.value
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsProcessing(true);
    
    // After a short delay to simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate response after a delay
    setTimeout(() => {
      // Simple echo response for now
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `I received your message: "${message}". To configure your CI with JFrog, please select one of the options below.`
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  return {
    messages,
    isProcessing,
    handleSendMessage,
    options,
    setOptions,
    handleSelectOption,
  };
};
