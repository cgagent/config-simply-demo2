
import { CISelection, ChatStepOption } from './types';

// Package manager options 
export const packageManagers = [
  { id: 'docker', name: 'Docker' },
  { id: 'npm', name: 'npm' },
  { id: 'nuget', name: 'NuGet' },
  { id: 'python', name: 'Python' },
  { id: 'maven', name: 'Maven' },
  { id: 'go', name: 'Go' }
];

// Get package manager options
export const getPackageManagerOptions = (): ChatStepOption[] => {
  return packageManagers.map(pkg => ({
    id: pkg.id,
    label: pkg.name,
    value: `I want to configure JFrog with ${pkg.name}`
  }));
};

// Get continue option for package manager selection
export const getContinueOption = (): ChatStepOption => {
  return { 
    id: 'continue',
    label: 'Continue', 
    value: 'I\'m done selecting package managers, show me the configuration'
  };
};

// Handle Package Manager selection
export const handlePackageManagerSelect = (
  packageId: string, 
  selection: CISelection
): { updatedSelection: CISelection; responseMessage: string } => {
  const updatedPackageManagers = [...selection.packageManagers];
  
  if (updatedPackageManagers.includes(packageId)) {
    // Remove package manager if already selected
    const index = updatedPackageManagers.indexOf(packageId);
    updatedPackageManagers.splice(index, 1);
  } else {
    // Add package manager
    updatedPackageManagers.push(packageId);
  }
  
  const updatedSelection = {
    ...selection,
    packageManagers: updatedPackageManagers
  };
  
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
  
  return { updatedSelection, responseMessage };
};

// Handle continue to snippets
export const handleContinueToSnippets = (
  selection: CISelection
): { updatedSelection: CISelection; responseMessage: string } => {
  const updatedSelection = {
    ...selection,
    currentStep: 'snippet-display' as const
  };
  
  return { 
    updatedSelection, 
    responseMessage: "Great! Let me show you how to integrate JFrog with your CI workflow." 
  };
};
