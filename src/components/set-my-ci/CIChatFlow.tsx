
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ChatOption } from '@/components/ai-configuration/types';
import { CISelection } from './chat-steps/types';
import { processOptionSelection } from './chat-steps/optionProcessor';
import { getCITypeOptions } from './chat-steps/ciTypeStep';
import { getPackageManagerOptions, getContinueOption } from './chat-steps/packageManagerStep';
import { getSnippetDisplayOptions } from './chat-steps/snippetStep';
import { getImplementationGuideOptions } from './chat-steps/implementationStep';

export interface CIChatFlowProps {
  onOptionSelect: (option: ChatOption) => void;
  setOptions: (options: ChatOption[]) => void;
  repositoryName?: string;
}

export const CIChatFlow: React.FC<CIChatFlowProps> = ({ 
  onOptionSelect, 
  setOptions,
  repositoryName
}) => {
  const { toast } = useToast();
  const [selection, setSelection] = useState<CISelection>({
    ciType: null,
    packageManagers: [],
    currentStep: 'ci-type'
  });

  // Set options based on current step
  useEffect(() => {
    if (selection.currentStep === 'ci-type') {
      setOptions(getCITypeOptions());
    }
    else if (selection.currentStep === 'package-managers') {
      // If there are packages selected, add the continue option
      const options = getPackageManagerOptions();
      if (selection.packageManagers.length > 0) {
        options.push(getContinueOption());
      }
      setOptions(options);
    }
    else if (selection.currentStep === 'snippet-display') {
      setOptions(getSnippetDisplayOptions());
    }
    else if (selection.currentStep === 'implementation-guide') {
      setOptions(getImplementationGuideOptions());
    }
  }, [selection.currentStep, selection.packageManagers.length, setOptions]);

  // Create a handler that both does local processing and calls the parent handler
  const handleOptionSelected = (option: ChatOption) => {
    // Process the option
    const { updatedSelection, responseMessage } = processOptionSelection(option, selection);
    
    // Update state if needed
    if (updatedSelection) {
      setSelection(updatedSelection);
    }

    // Copy snippets to clipboard if needed
    if (option.id === 'view-snippet' || option.id === 'view-full-workflow') {
      const snippetText = responseMessage.split('```yaml\n')[1]?.split('\n```')[0];
      if (snippetText) {
        navigator.clipboard.writeText(snippetText).then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Configuration snippet copied successfully",
          });
        });
      }
    }
    
    // Create a new "bot" option with the response
    const botResponse: ChatOption = {
      id: `response-${Date.now()}`,
      label: 'Response',
      value: responseMessage
    };
    
    // Call the parent handler with the original option first
    onOptionSelect(option);
    
    // Then call it again after a delay with the bot response
    setTimeout(() => {
      onOptionSelect(botResponse);
    }, 500);
  };

  return null; // This component doesn't render anything, it just provides functionality
};

export default CIChatFlow;
