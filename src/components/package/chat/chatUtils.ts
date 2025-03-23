
import { Package } from '@/types/package';
import { format } from 'date-fns';
import { Message } from '../chat/ChatMessage';

// Process the user query and return a response based on the query type
export const processUserQuery = (
  query: string,
  packages: Package[]
): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('popular package') || lowerQuery.includes('my organization') || lowerQuery.includes('secured')) {
    return `📊 **Most Popular Packages in Your Organization**

🔄 **axios**

- 📦 Most common version: 1.5.1 (published on 2024-08-31)
- 🆕 Latest Version published: 1.8.3
- ⚠️ Your org version 1.5.1 has known vulnerabilities:

  🚨 **CVE-2024-39338**

  📝 Description - axios 1.5.1 allows SSRF via unexpected behavior where requests for path relative URLs get processed as protocol relative URLs
  🔴 Severity: High

🔄 **lodash**
- 📦 Most common version: 4.17.21
- 🆕 Latest version: 4.17.21
- ✅ Your most common version is secured`;
  }
  else if (lowerQuery.includes('latest') && lowerQuery.includes('download')) {
    return getTopDownloadedPackages(packages);
  } 
  else if (lowerQuery.includes('vulnerabilit')) {
    return getVulnerablePackages(packages);
  } 
  else if (lowerQuery.includes('block')) {
    return getBlockedPackages();
  } 
  else if (lowerQuery.includes('size') || lowerQuery.includes('largest')) {
    return getLargestPackages(packages);
  } 
  else if (lowerQuery.includes('sbom') || lowerQuery.includes('report')) {
    return generateSbomReport(packages);
  }
  else {
    return getGenericResponse(query);
  }
};

// Get initial welcome message
export const getInitialMessage = (): Message => {
  return {
    id: 'welcome',
    role: 'bot',
    content: 'Hi there! I\'m your package assistant. I can help you analyze your packages, detect vulnerabilities, and provide recommendations. What would you like to know?'
  };
};

export const DEFAULT_SUGGESTED_QUERIES = [
  "What are the most popular package being used in my organization? is it secured?",
  "Show me existing packages with vulnerabilities",
  "Show me the packages that are blocked",
  "Show me the largest packages by size",
  "Please create an Sbom report"
];

// Helper function to get the top 5 most downloaded packages
function getTopDownloadedPackages(packages: Package[]): string {
  const sortedPackages = [...packages].sort((a, b) => b.downloads - a.downloads).slice(0, 5);
  if (sortedPackages.length === 0) {
    return "No packages found.";
  }
  let response = "Here are the top 5 most downloaded packages:\n\n";
  sortedPackages.forEach((pkg, index) => {
    response += `${index + 1}. ${pkg.name} (Downloads: ${pkg.downloads})\n`;
  });
  return response;
}

// Helper function to get packages with vulnerabilities
function getVulnerablePackages(packages: Package[]): string {
  const vulnerablePackages = packages.filter(pkg => pkg.vulnerabilities > 0);
  if (vulnerablePackages.length === 0) {
    return "No packages with vulnerabilities found.";
  }
  let response = "Here are the packages with vulnerabilities:\n\n";
  vulnerablePackages.forEach((pkg, index) => {
    response += `${index + 1}. ${pkg.name} (Vulnerabilities: ${pkg.vulnerabilities})\n`;
  });
  return response;
}

// Helper function to get blocked packages (currently returns a mock response)
function getBlockedPackages(): string {
  return "Blocked packages information is not available in this demo.";
}

// Helper function to get the 5 largest packages by size
function getLargestPackages(packages: Package[]): string {
  const sortedPackages = [...packages].sort((a, b) => b.size - a.size).slice(0, 5);
  if (sortedPackages.length === 0) {
    return "No packages found.";
  }
  let response = "Here are the 5 largest packages by size:\n\n";
  sortedPackages.forEach((pkg, index) => {
    const sizeInMB = (pkg.size / (1024 * 1024)).toFixed(2);
    response += `${index + 1}. ${pkg.name} (${sizeInMB} MB)\n`;
  });
  return response;
}

// Helper function to generate a mock SBOM report
function generateSbomReport(packages: Package[]): string {
  if (packages.length === 0) {
    return "No packages found to generate an SBOM report.";
  }
  let report = "SBOM Report:\n\n";
  packages.forEach(pkg => {
    const createdAtFormatted = format(new Date(pkg.createdAt), 'MMMM dd, yyyy');
    report += `Package: ${pkg.name}\n`;
    report += `Type: ${pkg.type}\n`;
    report += `Created At: ${createdAtFormatted}\n`;
    report += `Vulnerabilities: ${pkg.vulnerabilities}\n`;
    report += `Downloads: ${pkg.downloads}\n`;
    const sizeInMB = (pkg.size / (1024 * 1024)).toFixed(2);
    report += `Size: ${sizeInMB} MB\n\n`;
  });
  return report;
}

function getGenericResponse(input: string): string {
  return `I'm not sure I understand your query about "${input}". Here are some things you can ask me:\n\n` +
    `• What are the most popular package being used in my organization? is it secured?\n` +
    `• Show me existing packages with vulnerabilities\n` +
    `• Show me the packages that are blocked\n` +
    `• Show me the largest packages by size\n` +
    `• Please create an Sbom report\n`;
}
