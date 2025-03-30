
import { ChatStepOption, CISelection } from './types';
import { handleCITypeSelect } from './ciTypeStep';
import { handlePackageManagerSelect, handleContinueToSnippets, packageManagers } from './packageManagerStep';
import { handleShowSnippet, handleContinueToImplementation } from './snippetStep';
import { handleFinishSetup, handleBackToSnippets } from './implementationStep';

// Process option selection
export const processOptionSelection = (
  option: ChatStepOption, 
  selection: CISelection
): { updatedSelection: CISelection | null; responseMessage: string } => {
  
  // Handle the different option IDs
  if (option.id === 'github' || option.id === 'other') {
    const result = handleCITypeSelect(option.id, selection);
    return result;
  } 
  else if (packageManagers.some(pkg => pkg.id === option.id)) {
    const result = handlePackageManagerSelect(option.id, selection);
    return result;
  }
  else if (option.id === 'continue') {
    const result = handleContinueToSnippets(selection);
    return result;
  }
  else if (option.id === 'view-snippet') {
    const responseMessage = handleShowSnippet('setup', selection);
    return { updatedSelection: null, responseMessage };
  }
  else if (option.id === 'view-full-workflow') {
    const responseMessage = handleShowSnippet('full', selection);
    return { updatedSelection: null, responseMessage };
  }
  else if (option.id === 'continue-to-implementation') {
    const result = handleContinueToImplementation(selection);
    return result;
  }
  else if (option.id === 'finish') {
    const responseMessage = handleFinishSetup();
    return { updatedSelection: null, responseMessage };
  }
  else if (option.id === 'back-to-snippets') {
    const result = handleBackToSnippets(selection);
    return result;
  }
  
  return { updatedSelection: null, responseMessage: "I'm not sure how to handle that option." };
};
