
import { simulateAIResponse } from '../utils/aiResponseUtils';

export const useSpecialQueries = () => {
  const processSpecialQuery = (content: string) => {
    const lowerContent = content.toLowerCase().trim();
    
    // Check for blocked packages query directly
    if (
      lowerContent === "which packages were blocked in the last two weeks?" ||
      lowerContent === "blocked packages" ||
      lowerContent === "show me the packages that are blocked" ||
      lowerContent === "block" ||
      lowerContent.includes('block') ||
      lowerContent.includes('malicious')
    ) {
      console.log("Blocked packages query detected");
      
      const blockResponse = `In the past 2 weeks, we blocked the following malicious npm packages:

evil-package-101: Attempted to steal user credentials.
malware-lib: Contained scripts to inject ransomware.
bad-actor-addon: Had a payload to exfiltrate private data.`;
      
      return {
        handled: true,
        response: blockResponse
      };
    }
    
    // For other queries, use the general AI response simulator
    return {
      handled: false,
      getResponse: () => simulateAIResponse(content)
    };
  };

  return { processSpecialQuery };
};
