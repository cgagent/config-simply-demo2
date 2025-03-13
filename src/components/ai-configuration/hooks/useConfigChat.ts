
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '../types';

export const useConfigChat = (repositoryName?: string) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `Hi! I'm your FlyFrog CI configuration assistant. I can help you set up CI integration for ${repositoryName || 'your repository'}. What CI server are you using (GitHub Actions, Circle CI, or another platform)?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let response = '';
      
      // Very simple rule-based responses for demo purposes
      if (/github|actions/i.test(input)) {
        response = `Great! GitHub Actions is a popular choice. For your ${repositoryName || 'repository'}, you'll need to add the FlyFrog configuration to your workflow file. Which package managers do you use? (npm, docker, python, etc.)`;
      } else if (/npm|node|javascript|typescript/i.test(input)) {
        response = `I'll add npm configuration to your setup. Here's a snippet you can add to your workflow file:
        
\`\`\`yaml
- name: Setup FlyFrog
  uses: jfrog/setup-flyfrog@v1
  with:
    subdomain: acme

- name: Install npm dependencies
  run: npm install
\`\`\`

Would you like to add any other package managers?`;
      } else if (/docker|container/i.test(input)) {
        response = `I'll add Docker configuration to your setup. Here's what you'll need:
        
\`\`\`yaml
- name: Setup FlyFrog
  uses: jfrog/setup-flyfrog@v1
  with:
    subdomain: acme

- name: Build Docker image
  run: docker build -t ${repositoryName || 'your-image'}:latest .
\`\`\`

Is there anything else you need help with?`;
      } else if (/complete|done|finished|full|example/i.test(input)) {
        response = `Here's a complete GitHub Actions workflow for ${repositoryName || 'your repository'}:
        
\`\`\`yaml
name: CI Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup FlyFrog
        uses: jfrog/setup-flyfrog@v1
        with:
          subdomain: acme
          
      - name: Install dependencies
        run: npm install
        
      # Add other build steps as needed
\`\`\`

Once you add this file to your repository and merge it to your main branch, FlyFrog will be connected with your workflow.`;
      } else {
        response = `I understand you're asking about "${input}". To configure FlyFrog with your CI workflow, I need to know which CI server you're using (GitHub Actions, Circle CI, etc.) and which package managers your project uses (npm, docker, python, etc.). Could you provide more details?`;
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  return {
    messages,
    isProcessing,
    input,
    setInput,
    handleSendMessage,
  };
};
