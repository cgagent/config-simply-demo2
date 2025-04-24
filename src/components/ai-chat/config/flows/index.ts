import { ConversationFlow } from '../../types/chatTypes';
import { securityFlow, maliciousPackagesFlow } from './securityFlow';
import { configFlow } from './configFlow';
import { releaseFlow } from './releaseFlow';
import { userInviteFlow } from './userInviteFlow';
import { packageFlow } from './packageFlow';

/**
 * All conversation flows
 */
export const conversationFlows: ConversationFlow[] = [
  securityFlow,
  maliciousPackagesFlow,
  configFlow,
  releaseFlow,
  userInviteFlow,
  packageFlow
]; 