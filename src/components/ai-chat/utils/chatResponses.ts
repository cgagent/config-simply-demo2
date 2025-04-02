import { ChatResponse, ConversationFlow } from './types';

// Define conversation flows
export const conversationFlows: ConversationFlow[] = [
  {
    id: 'ci-setup',
    name: 'CI Setup Flow',
    steps: [
      {
        id: 'initial',
        patterns: ['set up my ci', 'set my ci', 'configure ci', 'setup ci'],
        response: "Great, let's set up your CI to work with JFrog. Which CI tools are you using?",
        nextSteps: ['ci-tool-selection']
      },
      {
        id: 'ci-tool-selection',
        patterns: ['github actions', 'github', 'jenkins', 'gitlab', 'travis', 'circle', 'other ci'],
        response: (tool: string) => {
          if (tool.includes('github')) {
            return "I see you're using GitHub Actions. Would you like to set up CI for NPM, Maven, or both package types?";
          }
          return "For your CI system, we'll need to configure JFrog integration. Which package managers are you using in your project?";
        },
        nextSteps: ['package-manager-selection']
      },
      {
        id: 'package-manager-selection',
        patterns: ['npm', 'maven', 'both'],
        response: (manager: string) => {
          if (manager.includes('npm') && !manager.includes('maven')) {
            return "Great! For NPM packages with JFrog, we'll need to set up authentication and repository configuration. Would you like to see a configuration example?";
          }
          if (manager.includes('maven') && !manager.includes('npm')) {
            return "For Maven integration with JFrog, we'll need to update your pom.xml and settings.xml files. Would you like me to show you the necessary configurations?";
          }
          return "I'll help you set up both NPM and Maven with JFrog. Let's start with NPM configuration first. Would you like to see the configuration examples?";
        }
      }
    ]
  }
];

// Define standalone responses
export const standaloneResponses: ChatResponse[] = [
  {
    id: 'security-risk',
    patterns: [
      'identify which packages are at risk',
      'packages at risk in my organization',
      'security risk in my organization',
      'vulnerable packages in my organization',
      'security vulnerabilities in my organization',
      'package vulnerabilities in my organization',
      'are at risk in my organization',
      'packages at risk',
      'security risk',
      'vulnerable packages',
      'security vulnerabilities',
      'package vulnerabilities'
    ],
    response: `# One package with risks was detected:

### 📦 axios
• **Used version:** 1.5.1
• **Latest version published:** 1.8.3
• **Downloaded by:** yahavi@acme.com
• **Affected git repositories:** ACME/frontend-app (branch: main), ACME/backend-api (branch: main)
• **Vulnerabilities:** CVE-2024-39338
• **Vulnerability description:** axios 1.5.1 allows SSRF via unexpected behavior where requests for path relative URLs get processed as protocol relative URLs
• **Severity:** High`
  },
  {
    id: 'blocked-packages',
    patterns: [
      'which packages were blocked in the last two weeks?',
      'blocked packages',
      'show me the packages that are blocked',
      'block',
      'malicious'
    ],
    response: `In the past 2 weeks, we blocked the following malicious npm packages:

evil-package-101: Attempted to steal user credentials.
malware-lib: Contained scripts to inject ransomware.
bad-actor-addon: Had a payload to exfiltrate private data.`
  },
  {
    id: 'greeting',
    patterns: ['hello', 'hi'],
    response: "Hello! How can I assist you today?"
  },
  {
    id: 'repository-info',
    patterns: ['repository', 'repositories'],
    response: "Repositories are where your code lives. You can manage your repositories through the CI section of this application. Would you like to know more about setting up CI for your repositories?"
  },
  {
    id: 'ci-info',
    patterns: ['ci', 'continuous integration'],
    response: "Continuous Integration (CI) helps you automatically build, test, and validate code changes. Our CI tools integrate with your repositories to ensure code quality and streamline deployments. You can set up CI workflows in the CI section."
  },
  {
    id: 'user-management',
    patterns: ['user', 'account'],
    response: "User management allows you to control access to your organization's resources. You can add users, define roles, and set permissions in the User Management section."
  },
  {
    id: 'http-request-packages',
    patterns: ['http request', 'making http request'],
    response: `Here are 3 recommended npm packages for making HTTP requests:

📦 **axios**
   
   • Description: Promise based HTTP client for the browser and node.js
   
   • Latest version: 1.8.3
   
   🔗 [GitHub Repository](https://github.com/axios/axios) 
   
   🔗 [NPM Package Page](https://www.npmjs.com/package/axios) 


📦 **node-fetch**
   
   • Description: A light-weight module that brings window.fetch to node.js
   
   • Latest version: 3.3.2
   
   🔗 [GitHub Repository](https://github.com/node-fetch/node-fetch) 
   
   🔗[NPM Package Page](https://www.npmjs.com/package/node-fetch) 


📦 **request**
   
   • Description: Simplified HTTP request client
   
   • Latest version: 2.88.2
   
   🔗 [GitHub Repository](https://github.com/request/request) 
   
   🔗 [NPM Package Page](https://www.npmjs.com/package/node-fetch) 

   ![Request Catalog](/lovable-uploads/req_catalog.png)`
  },
  {
    id: 'sbom-report',
    patterns: ['sbom', 'report for', 'last 30 days'],
    response: `Here is the SBOM report for your packages from the last 30 days:

Package: lodash
Version: 4.17.21
License: MIT
Dependencies:
lodash._baseassign (3.2.0)
lodash._baseclone (3.3.0)
Package: axios
Version: 0.21.1
License: MIT
Dependencies:
follow-redirects (1.14.1)
Package: react
Version: 17.0.2
License: MIT
Dependencies:
loose-envify (1.4.0)
object-assign (4.1.1)`
  }
]; 