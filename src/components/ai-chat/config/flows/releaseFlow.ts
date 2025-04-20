import { ConversationFlow } from '../../utils/types';
import { releasePatterns } from '../patterns/releasePatterns';
import { 
  getAllReleasePackageNamePatterns, 
  releasePackageNameOptions,
  getAllBranchSelectionPatterns,
  branchSelectionOptions,
  getAllEnvironmentSelectionPatterns,
  environmentSelectionOptions,
  getAllReleaseTypeSelectionPatterns,
  releaseTypeSelectionOptions
} from '../constants/releaseConstants';

// Import for formatting responses using flow state
import { formatResponseWithState } from '../../utils/flowStateUtils';

// Flow ID for use with the flow state
export const RELEASE_FLOW_ID = 'release';

// Define keys for release flow state fields for type safety
export const RELEASE_FLOW_FIELDS = {
  PACKAGE_NAME: 'packageName',
  BRANCH: 'branch',
  ENVIRONMENT: 'environment',
  RELEASE_TYPE: 'releaseType'
} as const;

/**
 * Release conversation flow
 */
export const releaseFlow: ConversationFlow = {
  id: RELEASE_FLOW_ID,
  name: 'Release Flow',
  steps: [
    {
      id: 'initial',
      patterns: ['release', 'new package', 'create package', 'publish package'],
      response: "I'll help you release a new package. Let's start by gathering some information about your package. What's the name of your package?",
      nextSteps: ['package-details'],
      actionOptions: releasePackageNameOptions
    },
    {
      id: 'package-details',
      patterns: getAllReleasePackageNamePatterns(),
      response: "Which branch should we release from?",
      nextSteps: ['branch-selection'],
      actionOptions: branchSelectionOptions
    },
    {
      id: 'branch-selection',
      patterns: getAllBranchSelectionPatterns(),
      response: "Which environment should we release to?",
      nextSteps: ['environment-selection'],
      actionOptions: environmentSelectionOptions
    },
    {
      id: 'environment-selection',
      patterns: getAllEnvironmentSelectionPatterns(),
      response: "What type of release is this?",
      nextSteps: ['release-type-selection'],
      actionOptions: releaseTypeSelectionOptions
    },
    {
      id: 'release-type-selection',
      patterns: getAllReleaseTypeSelectionPatterns(),
      response: () => {
        // Use the formatResponseWithState utility to format the response
        return formatResponseWithState(
          RELEASE_FLOW_ID,
          `Perfect! I'll help you create a release with these details:
  
Package: {${RELEASE_FLOW_FIELDS.PACKAGE_NAME}}
Branch: {${RELEASE_FLOW_FIELDS.BRANCH}}
Environment: {${RELEASE_FLOW_FIELDS.ENVIRONMENT}}
Release Type: {${RELEASE_FLOW_FIELDS.RELEASE_TYPE}}

Would you like to proceed with the release?`
        );
      },
      nextSteps: ['confirmation']
    },
    {
      id: 'confirmation',
      patterns: ['yes', 'proceed', 'continue', 'confirm', 'ok', 'sure', 'go ahead', 'let\'s do it', 'do it', 'start', 'begin'],
      response: "I'll start the release process now. I'll create a release branch and set up the necessary configurations. You'll be notified once the release is complete.",
      nextSteps: [],
      isEndOfFlow: true
    }
  ]
}; 