/**
 * Patterns for matching package-related queries
 */

// Define interfaces for type safety
interface UsageInstructions {
  curl: string[];
  docker: string[];
  kubernetes: string[];
}

interface PackagePatterns {
  latestPackages: string[];
  packageDetail: string[];
  riskPackages: string[];
  usageInstructions: UsageInstructions;
}

/**
 * Patterns for matching general package queries
 */
export const PACKAGE_PATTERNS: PackagePatterns = {
  latestPackages: [
    'latest packages', 
    'recent packages', 
    'last packages', 
    'show me the latest packages', 
    'show me the last 5 packages',
    'show me the latest 5 published packages',
    'show me the latest published packages in my organization',
    'show packages',
    'package list',
    'list packages'
  ],
  packageDetail: [
    'package detail', 
    'show package', 
    'get package info', 
    'package information'
  ],
  riskPackages: [
    'packages at risk',
    'risky packages',
    'vulnerable packages',
    'show me the packages that are at risk'
  ],
  // New patterns for package usage instructions with strict word boundaries
  usageInstructions: {
    curl: [
      '(?<![-\\w])curl(?![-\\w])', 
      '(?<![-\\w])curl command',
      'how to use curl(?![-\\w])', 
      '(?<![-\\w])curl example',
      'download with curl(?![-\\w])', 
      'fetch with curl(?![-\\w])', 
      'http request'
    ],
    docker: [
      '(?<![-\\w])docker(?![-\\w])', 
      '(?<![-\\w])docker command', 
      '(?<![-\\w])docker image', 
      '(?<![-\\w])docker pull',
      '(?<![-\\w])docker run', 
      'containerize', 
      'container', 
      'how to use docker(?![-\\w])'
    ],
    kubernetes: [
      '(?<![-\\w])kubernetes(?![-\\w])', 
      '(?<![-\\w])k8s(?![-\\w])', 
      '(?<![-\\w])kubectl(?![-\\w])', 
      '(?<![-\\w])k8s deployment',
      '(?<![-\\w])kubernetes deployment', 
      'deploy to kubernetes(?![-\\w])',
      '(?<![-\\w])k8s yaml', 
      '(?<![-\\w])kubernetes manifest', 
      '(?<![-\\w])kubernetes pod'
    ]
  }
}; 