import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/components/ai-chat/constants';
import { simulateAIResponse } from '@/components/ai-chat/utils/aiResponseUtils';
import { 
  generateJFrogSetupSnippet, 
  generatePackageSpecificSnippet, 
  generateFullGithubWorkflow,
  generateFullOtherCIWorkflow
} from '@/components/ci-setup/codeGenerators';

export const useCISetupChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [showPackageOptions, setShowPackageOptions] = useState(false);
  const [showCodeSnippets, setShowCodeSnippets] = useState(false);
  const [selectedCI, setSelectedCI] = useState<'github' | 'other' | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the first message
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial-message',
      role: 'user',
      content: 'I would like to set up my CI to work with JFrog. Can you set it up for me?'
    };
    
    setMessages([initialMessage]);
    
    // Simulate the bot response after a short delay
    setIsProcessing(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: 'bot-response-1',
        role: 'bot',
        content: "Great, lets set up your CI to work with JFrog.\nWhich CI tools are you using:"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1000);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCIOption = (option: string) => {
    // Save the selected CI option
    setSelectedCI(option.toLowerCase().includes('github') ? 'github' : 'other');
    
    // Add user selection as a message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      try {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: "Amazing, now lets select the package managers you would like to set up."
        };
        
        setMessages(prev => [...prev, botMessage]);
        setShowPackageOptions(true);
      } catch (error) {
        console.error("Error generating response:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate response. Please try again."
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handlePackageSelection = (packageName: string) => {
    setSelectedPackages(prev => {
      // If already selected, remove it
      if (prev.includes(packageName)) {
        return prev.filter(p => p !== packageName);
      }
      // Otherwise add it
      return [...prev, packageName];
    });
  };

  const handleContinueWithPackages = () => {
    if (selectedPackages.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one package manager.",
        variant: "destructive"
      });
      return;
    }

    // Add user selection as a message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Selected packages: ${selectedPackages.join(', ')}`
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setShowPackageOptions(false);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      try {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: `Great! I'll help you configure JFrog with ${selectedPackages.join(', ')}. Here are the code snippets you need to add to your CI workflow:`
        };
        
        setMessages(prev => [...prev, botMessage]);
        setShowCodeSnippets(true);
      } catch (error) {
        console.error("Error generating response:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate response. Please try again."
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: description,
      });
    }).catch(err => {
      console.error("Failed to copy: ", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy to clipboard"
      });
    });
  };

  const generateSnippet = () => {
    return `${generateJFrogSetupSnippet()}${generatePackageSpecificSnippet(selectedPackages)}`;
  };

  const generateFullWorkflow = () => {
    if (selectedCI === 'github') {
      return generateFullGithubWorkflow(selectedPackages);
    } else {
      return generateFullOtherCIWorkflow(selectedPackages);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      try {
        const aiResponse = simulateAIResponse(content);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: aiResponse
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("Error generating AI response:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate response. Please try again."
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Check if the last message is the CI tools question to show options
  const shouldShowCIOptions = messages.length > 0 && 
    messages[messages.length - 1].role === 'bot' && 
    messages[messages.length - 1].content.includes("Which CI tools are you using");

  return {
    messages,
    isProcessing,
    inputValue,
    setInputValue,
    selectedPackages,
    showPackageOptions,
    showCodeSnippets,
    selectedCI,
    messagesEndRef,
    handleCIOption,
    handlePackageSelection,
    handleContinueWithPackages,
    copyToClipboard,
    generateSnippet,
    generateFullWorkflow,
    handleSendMessage,
    shouldShowCIOptions
  };
};
