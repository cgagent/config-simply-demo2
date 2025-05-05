import { Message } from '../types/messageTypes';
import { ChatOption } from '@/components/shared/types';

/**
 * Interface for a step in a conversation flow
 */
export interface ConversationStep {
  /** Unique identifier for the step */
  id: string;
  /** Patterns to match user input for this step */
  patterns: string[];
  /** Response text or function to generate a response */
  response: string | ((input: string) => string | Message);
  /** Optional action options to show with this step */
  actionOptions?: ChatOption[];
  /** Optional array of next step IDs */
  nextSteps?: string[];
  /** Whether this is the end of the flow */
  isEndOfFlow?: boolean;
}

/**
 * Interface for a conversation flow
 */
export interface ConversationFlow {
  /** Unique identifier for the flow */
  id: string;
  /** Display name for the flow */
  name: string;
  /** Steps in the conversation flow */
  steps: ConversationStep[];
} 