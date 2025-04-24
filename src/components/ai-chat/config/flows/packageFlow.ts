import { ConversationFlow } from '../../utils/types';
import { PACKAGE_PATTERNS } from '../patterns/packagePatterns';
import { packageResponses } from '../responses/packageResponses';
import { useRepositories } from '@/contexts/RepositoryContext';
import { formatDistanceToNow } from 'date-fns';

// Flow ID for use with the flow state
export const PACKAGE_FLOW_ID = 'packages';

/**
 * Package conversation flow
 */
export const packageFlow: ConversationFlow = {
  id: PACKAGE_FLOW_ID,
  name: 'Package Information Flow',
  steps: [
    {
      id: 'latest-packages',
      patterns: PACKAGE_PATTERNS.latestPackages,
      // Use a simple placeholder response that will trigger our special handling
      response: "SHOW_PACKAGES_TABLE",
      isEndOfFlow: true
    },
    {
      id: 'package-detail',
      patterns: PACKAGE_PATTERNS.packageDetail,
      response: "I'll show you the package details. Could you please specify which package you're interested in?",
      isEndOfFlow: true
    },
    {
      id: 'risk-packages',
      patterns: PACKAGE_PATTERNS.riskPackages,
      response: "Let me check for packages that are at risk in your organization...",
      isEndOfFlow: true
    }
  ]
}; 