import { ChatOption } from '@/components/shared/types';
import { securityRemediationOptions, SECURITY_REMEDIATION_ACTIONS } from '../constants/securityConstants';
import { MessageFactory } from '../../utils/messageFactory';
import { Message } from '../../types/messageTypes';

/**
 * Generates a response for security remediation actions
 */
export const generateSecurityRemediationResponse = (action: string): string => {
  switch (action) {
    case SECURITY_REMEDIATION_ACTIONS.GIT:
      return "Creating a Git issue for yahavi@acme.com to upgrade axios version in the ACME/frontend-app and ACME/backend-api repositories.";
    case SECURITY_REMEDIATION_ACTIONS.EMAIL:
      return "Sending an email to yahavi@acme.com to upgrade axios version in the ACME/frontend-app and ACME/backend-api repositories.";
    case SECURITY_REMEDIATION_ACTIONS.SLACK:
      return "Sending a Slack notification to *yahavi* about upgrading axios version in the ACME/frontend-app and ACME/backend-api repositories.";
    default:
      return "I'll help you address this security vulnerability. Would you like to create a Git issue, send an email, or notify in Slack?";
  }
};

/**
 * Generates a response for security risk identification
 */
export const generateSecurityRiskResponse = (): string => {
  return `# One package with risks was detected:

### 📦 axios
• **Used version:** 1.5.1
• **Latest version published:** 1.8.3
• **Downloaded by:** yahavi@acme.com
• **Affected git repositories:** ACME/frontend-app (branch: main), ACME/backend-api (branch: main)
• **Vulnerabilities:** CVE-2024-39338
• **Vulnerability description:** axios 1.5.1 allows SSRF via unexpected behavior where requests for path relative URLs get processed as protocol relative URLs
• **Severity:** Critical`;
};

// Define the show more option
export const showMoreOption: ChatOption = {
  id: 'show-more',
  label: 'Show more',
  value: 'show more blocked packages'
};

/**
 * Generates a comprehensive response for malicious packages
 */
export const generateMaliciousPackagesResponse = (): Message => {
  const content = `## 🚫 Blocked Packages
The following malicious packages were blocked in the last two weeks:

### evil-package-101
• **Type:** npm
• **Blocked at:** 2024-03-15
• **Reason:** Attempted to steal user credentials

### malware-lib
• **Type:** npm
• **Blocked at:** 2024-03-10
• **Reason:** Contained scripts to inject ransomware

### bad-actor-addon
• **Type:** npm
• **Blocked at:** 2024-03-05
• **Reason:** Had a payload to exfiltrate private data`;

  return MessageFactory.createActionOptionsMessage(content, [showMoreOption]);
};

/**
 * Generates a detailed response showing all blocked packages
 */
export const generateDetailedBlockedPackagesResponse = (): Message => {
  const content = `## 🚫 Additional Blocked Packages

### suspicious-util
• **Type:** npm
• **Blocked at:** 2024-03-03
• **Reason:** Unauthorized network connections
• **Detection Method:** Runtime Monitoring
• **Impact:** Attempted to establish connections to unknown servers

### fake-logger
• **Type:** npm
• **Blocked at:** 2024-03-01
• **Reason:** Cryptomining code detected
• **Detection Method:** Pattern Matching
• **Impact:** Would use system resources for cryptocurrency mining

### data-stealer
• **Type:** npm
• **Blocked at:** 2024-02-28
• **Reason:** Malicious data collection
• **Detection Method:** Behavioral Analysis
• **Impact:** Would collect and transmit sensitive user data

### trojan-helper
• **Type:** npm
• **Blocked at:** 2024-02-25
• **Reason:** Remote code execution vulnerability
• **Detection Method:** Vulnerability Scan
• **Impact:** Could allow attackers to execute arbitrary code

### malicious-formatter
• **Type:** npm
• **Blocked at:** 2024-02-23
• **Reason:** Code injection attempt
• **Detection Method:** Static Analysis
• **Impact:** Would inject malicious code into project files

### evil-parser
• **Type:** npm
• **Blocked at:** 2024-02-20
• **Reason:** Backdoor detected
• **Detection Method:** Code Review
• **Impact:** Would create a backdoor for unauthorized access

### bad-dependency
• **Type:** npm
• **Blocked at:** 2024-02-18
• **Reason:** Supply chain attack
• **Detection Method:** Supply Chain Analysis
• **Impact:** Would compromise dependent packages

### rogue-utility
• **Type:** npm
• **Blocked at:** 2024-02-15
• **Reason:** Malicious code execution
• **Detection Method:** Runtime Analysis
• **Impact:** Would execute harmful system commands

### data-thief
• **Type:** npm
• **Blocked at:** 2024-02-12
• **Reason:** Unauthorized data access
• **Detection Method:** Access Pattern Analysis
• **Impact:** Would access and steal sensitive data

### malware-package
• **Type:** npm
• **Blocked at:** 2024-02-10
• **Reason:** Multiple security violations
• **Detection Method:** Multi-layer Analysis
• **Impact:** Combined multiple malicious behaviors`;

  return MessageFactory.createTextMessage(content, 'assistant');
};

// Re-export the security remediation options from the constants file
export { securityRemediationOptions };

/**
 * Security risk flow responses
 */
export const securityRiskResponses = {
  identifyRisk: generateSecurityRiskResponse,
  remediationActionSelection: generateSecurityRemediationResponse,
  maliciousPackages: generateMaliciousPackagesResponse,
  detailedBlockedPackages: generateDetailedBlockedPackagesResponse,
  showMoreOption
}; 