
import React, { useState, useEffect } from 'react';
import { Github, Code, Package, Check, Info, FileCode, GitBranchPlus, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ChatOption } from '@/components/ai-configuration/types';
import { 
  generateJFrogSetupSnippet, 
  generatePackageSpecificSnippets, 
  generateFullGitHubSnippet,
  generateFullOtherCISnippet
} from './snippet-display/snippetGenerators';

export interface CIChatFlowProps {
  onOptionSelect: (option: ChatOption) => void;
  setOptions: (options: ChatOption[]) => void;
  repositoryName?: string;
}

interface CISelection {
  ciType: 'github' | 'other' | null;
  packageManagers: string[];
  currentStep: 'ci-type' | 'package-managers' | 'snippet-display' | 'implementation-guide';
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

  // Package manager options 
  const packageManagers = [
    { id: 'docker', name: 'Docker' },
    { id: 'npm', name: 'npm' },
    { id: 'nuget', name: 'NuGet' },
    { id: 'python', name: 'Python' },
    { id: 'maven', name: 'Maven' },
    { id: 'go', name: 'Go' }
  ];

  // Set initial options for step 1
  useEffect(() => {
    if (selection.currentStep === 'ci-type') {
      setOptions([
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
      ]);
    }
    else if (selection.currentStep === 'package-managers') {
      // Step 2: Set package manager options
      setOptions(packageManagers.map(pkg => ({
        id: pkg.id,
        label: pkg.name,
        value: `I want to configure JFrog with ${pkg.name}`
      })));
    }
    else if (selection.currentStep === 'snippet-display') {
      // Step 3: Set options for snippet display
      setOptions([
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
          value: 'I'm ready to continue to the implementation guide'
        }
      ]);
    }
    else if (selection.currentStep === 'implementation-guide') {
      // Step 4: Set options for implementation guide
      setOptions([
        { 
          id: 'finish',
          label: 'Finish', 
          value: 'I've implemented the changes and I'm done with the setup'
        },
        { 
          id: 'back-to-snippets',
          label: 'Go Back to Snippets', 
          value: 'I want to go back and see the snippets again'
        }
      ]);
    }
  }, [selection.currentStep, setOptions]);

  // Handle CI Type selection
  const handleCITypeSelect = (ciType: 'github' | 'other') => {
    const updatedSelection = {
      ...selection,
      ciType,
      currentStep: 'package-managers' as const
    };
    
    setSelection(updatedSelection);
    
    // Send a message with the selected CI type
    const responseMessage = ciType === 'github' 
      ? "You've selected GitHub Actions. Now, which package managers do you use in your project?"
      : "You've selected Other CI Systems. Now, which package managers do you use in your project?";
      
    // Return the response to be displayed
    return responseMessage;
  };

  // Handle Package Manager selection
  const handlePackageManagerSelect = (packageId: string) => {
    const updatedPackageManagers = [...selection.packageManagers];
    
    if (updatedPackageManagers.includes(packageId)) {
      // Remove package manager if already selected
      const index = updatedPackageManagers.indexOf(packageId);
      updatedPackageManagers.splice(index, 1);
    } else {
      // Add package manager
      updatedPackageManagers.push(packageId);
    }
    
    setSelection({
      ...selection,
      packageManagers: updatedPackageManagers
    });
    
    // Find the package name for the message
    const packageName = packageManagers.find(pkg => pkg.id === packageId)?.name || packageId;
    
    // Determine if we added or removed the package
    const action = updatedPackageManagers.includes(packageId) ? "added" : "removed";
    
    // Generate message
    let responseMessage = "";
    if (action === "added") {
      responseMessage = `${packageName} has been added to your configuration.`;
    } else {
      responseMessage = `${packageName} has been removed from your configuration.`;
    }
    
    // If there are packages selected, suggest proceeding to snippet display
    if (updatedPackageManagers.length > 0) {
      setOptions([
        ...packageManagers.map(pkg => ({
          id: pkg.id,
          label: pkg.name,
          value: `I want to configure JFrog with ${pkg.name}`
        })),
        { 
          id: 'continue',
          label: 'Continue', 
          value: 'I'm done selecting package managers, show me the configuration'
        }
      ]);
    }
    
    return responseMessage;
  };

  // Handle continue to snippets
  const handleContinueToSnippets = () => {
    setSelection({
      ...selection,
      currentStep: 'snippet-display'
    });
    
    return "Great! Let me show you how to integrate JFrog with your CI workflow.";
  };

  // Handle showing snippets
  const handleShowSnippet = (snippetType: 'setup' | 'full') => {
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
    
    // Copy the snippet to clipboard
    navigator.clipboard.writeText(snippet).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Configuration snippet copied successfully",
      });
    });
    
    // Return formatted message with snippet
    return `${description}\n\n\`\`\`yaml\n${snippet}\n\`\`\`\n\nThe snippet has been copied to your clipboard.`;
  };

  // Handle continue to implementation guide
  const handleContinueToImplementation = () => {
    setSelection({
      ...selection,
      currentStep: 'implementation-guide'
    });
    
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
    
    return `## Implementation Guide\n\nFollow these steps to implement the JFrog integration in your ${selection.ciType === 'github' ? 'GitHub Actions' : 'CI system'}:\n\n${stepsList}\n\nOnce completed, your CI system will be fully integrated with JFrog!`;
  };

  // Handle option selection from the chat
  const processOptionSelection = (option: ChatOption): string => {
    // Handle the different option IDs
    if (option.id === 'github' || option.id === 'other') {
      return handleCITypeSelect(option.id);
    } 
    else if (packageManagers.some(pkg => pkg.id === option.id)) {
      return handlePackageManagerSelect(option.id);
    }
    else if (option.id === 'continue') {
      return handleContinueToSnippets();
    }
    else if (option.id === 'view-snippet') {
      return handleShowSnippet('setup');
    }
    else if (option.id === 'view-full-workflow') {
      return handleShowSnippet('full');
    }
    else if (option.id === 'continue-to-implementation') {
      return handleContinueToImplementation();
    }
    else if (option.id === 'finish') {
      return "Great! Your CI workflow is now set up with JFrog. Your artifacts will be securely downloaded from and uploaded to JFrog, and scanned for vulnerabilities.";
    }
    else if (option.id === 'back-to-snippets') {
      setSelection({
        ...selection,
        currentStep: 'snippet-display'
      });
      return "Let's go back to the configuration snippets.";
    }
    
    return "I'm not sure how to handle that option.";
  };

  // Create a handler that both does local processing and calls the parent handler
  const handleOptionSelected = (option: ChatOption) => {
    const response = processOptionSelection(option);
    // Create a new "bot" option with the response
    const botResponse: ChatOption = {
      id: `response-${Date.now()}`,
      label: 'Response',
      value: response
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
