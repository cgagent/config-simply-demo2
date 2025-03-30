
import { CISelection, ChatStepOption } from './types';

// Get initial options for CI Type step
export const getCITypeOptions = (): ChatStepOption[] => {
  return [
    { 
      id: 'github', 
      label: 'GitHub Actions', 
      value: 'I want to configure JFrog with GitHub Actions' 
    },
    { 
      id: 'other', 
      label: 'Other CI Systems', 
      value: 'I want to configure JFrog with another CI system (Circle CI, Jenkins, GitLab)' 
    }
  ];
};

// Handle CI Type selection
export const handleCITypeSelect = (
  ciType: 'github' | 'other', 
  selection: CISelection
): { updatedSelection: CISelection; responseMessage: string } => {
  const updatedSelection = {
    ...selection,
    ciType,
    currentStep: 'package-managers' as const
  };
  
  // Send a message with the selected CI type
  const responseMessage = ciType === 'github' 
    ? "You've selected GitHub Actions. Now, which package managers do you use in your project?"
    : "You've selected Other CI Systems. Now, which package managers do you use in your project?";
    
  return { updatedSelection, responseMessage };
};
