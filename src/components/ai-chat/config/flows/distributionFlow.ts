import { ConversationFlow } from '../../utils/types';
import { DISTRIBUTION_PATTERNS } from '../patterns/distributionPatterns';
import { distributionResponses, distributionOptions } from '../responses/distributionResponses';

/**
 * Unique identifier for the distribution flow
 */
export const DISTRIBUTION_FLOW_ID = 'distribution-flow';

/**
 * Distribution conversation flow
 */
export const distributionFlow: ConversationFlow = {
  id: DISTRIBUTION_FLOW_ID,
  name: 'External Distribution Flow',
  steps: [
    {
      id: 'external-distribution',
      patterns: [
        ...DISTRIBUTION_PATTERNS.externalDistribution,
        'I need to externally distribute a package to users outside my organization',
        'externally distribute a package to users outside',
        'need to externally distribute a package'
      ],
      response: distributionResponses.initial,
      actionOptions: distributionOptions,
      isEndOfFlow: false
    },
    {
      id: 'distribute-package',
      patterns: [
        'package', 'distribute package'
      ],
      response: "I'll help you distribute your package. Let's start by identifying which package you'd like to distribute.",
      isEndOfFlow: true
    },
    {
      id: 'distribute-build',
      patterns: [
        'build', 'distribute build'
      ],
      response: "I'll help you distribute your build. Let's start by identifying which build you'd like to distribute.",
      isEndOfFlow: true
    },
    {
      id: 'build-explanation',
      patterns: [
        'what is build', 'build explanation', 'explain build'
      ],
      response: distributionResponses.buildExplanation,
      actionOptions: [
        { id: 'package', label: 'Distribute Package', value: 'I want to distribute a package' },
        { id: 'build', label: 'Distribute Build', value: 'I want to distribute a build' }
      ],
      isEndOfFlow: false
    }
  ]
}; 