
import { useState } from 'react';
import { Message } from '@/components/ai-configuration/types';

export interface CIChatState {
  messages: Message[];
  currentStep: number;
  selectedCI: 'github' | 'other' | null;
  selectedPackages: string[];
  isProcessing: boolean;
}

export function useCIChatState() {
  const [state, setState] = useState<CIChatState>({
    messages: [
      {
        id: '1',
        role: 'bot',
        content: 'Select your CI system to get started with JFrog integration.'
      }
    ],
    currentStep: 1,
    selectedCI: null,
    selectedPackages: [],
    isProcessing: false
  });

  // Handle CI selection from step 1
  const handleCISelect = (ci: 'github' | 'other') => {
    // Add a message about the selection
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `I want to use ${ci === 'github' ? 'GitHub Actions' : 'Other CI System'} for my CI pipeline.`
    };
    
    const ciTypeMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: `You've selected ${ci === 'github' ? 'GitHub Actions' : 'Other CI System'}. Now, let's select the package managers for your project.`
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage, ciTypeMessage],
      currentStep: 2,
      selectedCI: ci
    }));
  };

  // Handle package manager selection/deselection
  const handleTogglePackage = (packageType: string) => {
    setState(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.includes(packageType)
        ? prev.selectedPackages.filter(p => p !== packageType)
        : [...prev.selectedPackages, packageType]
    }));
  };

  // Handle proceeding to next step
  const handleNextStep = () => {
    if (state.currentStep === 2 && state.selectedPackages.length > 0) {
      // Add user message about package selection
      const packageNames = state.selectedPackages.map(pkg => {
        switch(pkg) {
          case 'docker': return 'Docker';
          case 'npm': return 'npm';
          case 'nuget': return 'NuGet';
          case 'python': return 'Python';
          case 'maven': return 'Maven';
          case 'go': return 'Go';
          default: return pkg;
        }
      }).join(', ');
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `I use ${packageNames} for my project.`
      };
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `Great! I'll configure your CI pipeline for ${packageNames}. You can now proceed with implementing the CI configuration as shown below.`
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage, botMessage],
        currentStep: 3
      }));
    }
  };

  // Handle returning to previous step
  const handlePreviousStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  // Handle message send from user
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true
    }));
    
    // Simulate processing delay
    setTimeout(() => {
      // Create bot response based on the content
      let botResponse = '';
      
      if (content.toLowerCase().includes('help')) {
        botResponse = "I'm here to help you set up CI with JFrog. You can select your CI system and then choose the package managers you use.";
      } else if (content.toLowerCase().includes('restart')) {
        setState(prev => ({
          ...prev,
          currentStep: 1,
          selectedCI: null,
          selectedPackages: [],
          isProcessing: false
        }));
        botResponse = "Let's start over. Please select your CI system.";
      } else {
        botResponse = "I understand you're interested in setting up CI. Please use the options below to configure your setup.";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isProcessing: false
      }));
    }, 1000);
  };

  return {
    ...state,
    handleCISelect,
    handleTogglePackage,
    handleNextStep,
    handlePreviousStep,
    handleSendMessage
  };
}
