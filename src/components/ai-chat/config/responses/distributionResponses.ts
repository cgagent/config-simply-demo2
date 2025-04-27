/**
 * Responses for distribution-related queries
 */

/**
 * Generates the initial response for external distribution
 */
export const generateDistributionInitialResponse = (): string => {
  return `I understand that you want to distribute a package. Would you like to distribute a package or a build?`;
};

/**
 * Distribution-related response constants
 */
export const distributionResponses = {
  initial: generateDistributionInitialResponse(),
  buildExplanation: "A build is a compiled version of your code that can be deployed or distributed. It typically includes all the artifacts and dependencies needed to run your application. Unlike a package, which usually refers to a reusable library or module, a build represents a complete, executable version of your project."
  // Add more specific responses as needed
};

/**
 * Options for distribution type selection
 */
export const distributionOptions = [
  { id: 'package', label: 'Package', value: 'I want to distribute a package' },
  { id: 'build', label: 'Build', value: 'I want to distribute a build' },
  { id: 'build-explanation', label: 'What is build?', value: 'What is build?' }
]; 