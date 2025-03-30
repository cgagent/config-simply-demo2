
import { CISelection, ChatStepOption } from './types';
import { 
  generateJFrogSetupSnippet, 
  generatePackageSpecificSnippets, 
  generateFullGitHubSnippet,
  generateFullOtherCISnippet
} from '../snippet-display/snippetGenerators';

// Get snippet display options
export const getSnippetDisplayOptions = (): ChatStepOption[] => {
  return [
    { 
      id: 'view-snippet',
      label: 'View Setup Snippet', 
      value: 'Show me the snippet I need to add to my CI configuration'
    },
    { 
      id: 'view-full-workflow',
      label: 'View Full Workflow', 
      value: 'Show me the complete workflow configuration'
    },
    { 
      id: 'continue-to-implementation',
      label: 'Continue to Implementation', 
      value: 'I\'m ready to continue to the implementation guide'
    }
  ];
};

// Handle showing snippets
export const handleShowSnippet = (
  snippetType: 'setup' | 'full',
  selection: CISelection
): string => {
  // Generate the appropriate snippet based on type and selection
  let snippet = "";
  let description = "";
  
  if (snippetType === 'setup') {
    const setupSnippet = generateJFrogSetupSnippet(selection.ciType!);
    const packageSnippet = generatePackageSpecificSnippets(selection.packageManagers);
    snippet = `${setupSnippet}\n${packageSnippet}`;
    description = "Here's the setup snippet you need to add to your CI configuration:";
  } else {
    snippet = selection.ciType === 'github' 
      ? generateFullGitHubSnippet(selection.packageManagers)
      : generateFullOtherCISnippet(selection.packageManagers);
    description = "Here's a complete example of how your workflow file should look:";
  }
  
  // Return formatted message with snippet
  return `${description}\n\n\`\`\`yaml\n${snippet}\n\`\`\`\n\nThe snippet has been copied to your clipboard.`;
};

// Handle continue to implementation guide
export const handleContinueToImplementation = (
  selection: CISelection
): { updatedSelection: CISelection; responseMessage: string } => {
  const updatedSelection = {
    ...selection,
    currentStep: 'implementation-guide' as const
  };
  
  // Generate implementation steps based on CI type
  const steps = selection.ciType === 'github' 
    ? [
        "Navigate to your GitHub repository",
        "Go to .github/workflows and create a new file or edit an existing one",
        "Add the JFrog setup snippet",
        "Add the package-specific configurations",
        "Commit and push changes",
        "Verify the integration"
      ]
    : [
        "Access your CI system",
        "Edit your CI configuration",
        "Add JFrog environment variables",
        "Add the JFrog setup snippet",
        "Add the package-specific configurations",
        "Save and run your CI pipeline"
      ];
  
  // Format the steps as a list
  const stepsList = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
  
  return { 
    updatedSelection,
    responseMessage: `## Implementation Guide\n\nFollow these steps to implement the JFrog integration in your ${selection.ciType === 'github' ? 'GitHub Actions' : 'CI system'}:\n\n${stepsList}\n\nOnce completed, your CI system will be fully integrated with JFrog!`
  };
};
