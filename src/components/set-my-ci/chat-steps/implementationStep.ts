
import { CISelection, ChatStepOption } from './types';

// Get implementation guide options
export const getImplementationGuideOptions = (): ChatStepOption[] => {
  return [
    { 
      id: 'finish',
      label: 'Finish', 
      value: 'I\'ve implemented the changes and I\'m done with the setup'
    },
    { 
      id: 'back-to-snippets',
      label: 'Go Back to Snippets', 
      value: 'I want to go back and see the snippets again'
    }
  ];
};

// Handle finish setup
export const handleFinishSetup = (): string => {
  return "Great! Your CI workflow is now set up with JFrog. Your artifacts will be securely downloaded from and uploaded to JFrog, and scanned for vulnerabilities.";
};

// Handle back to snippets
export const handleBackToSnippets = (
  selection: CISelection
): { updatedSelection: CISelection; responseMessage: string } => {
  const updatedSelection = {
    ...selection,
    currentStep: 'snippet-display' as const
  };
  
  return { 
    updatedSelection,
    responseMessage: "Let's go back to the configuration snippets."
  };
};
