import { MessageFactory } from '../../utils/messageFactory';
import { LatestPackage } from '@/types/package';
import { formatDistanceToNow } from 'date-fns';

/**
 * Generates a response for latest packages
 */
export const generateLatestPackagesResponse = (packages: LatestPackage[], query?: string) => {
  if (!packages || packages.length === 0) {
    return "I couldn't find any recent packages in your organization.";
  }

  // Format the packages data for display
  const formattedPackages = packages.map(pkg => ({
    type: pkg.type,
    name: pkg.name,
    version: pkg.version,
    firstCreated: formatDistanceToNow(new Date(pkg.releaseDate), { addSuffix: true }),
    versions: 1 // Since we don't have versions count in the API, default to 1
  }));

  // If query includes "table", use a markdown table rather than a custom component
  if (query && query.toLowerCase().includes('table')) {
    // Create a markdown table
    const markdownTable = `
## Latest Packages

| Type | Package Name | Latest Version | First Created | Versions |
|------|-------------|---------------|--------------|----------|
${formattedPackages.map(pkg => `| ${pkg.type} | ${pkg.name} | ${pkg.version} | ${pkg.firstCreated} | ${pkg.versions} |`).join('\n')}
`;

    return "Here are the latest 5 packages published in your organization:" + markdownTable;
  }

  // Create a message with a table of packages
  return MessageFactory.createPackageTableMessage(
    "Here are the latest 5 packages published in your organization:",
    formattedPackages
  );
};

/**
 * Package-related response handlers
 */
export const packageResponses = {
  latestPackages: generateLatestPackagesResponse
}; 