/**
 * Represents a response function that can take an input string and return a formatted response
 */
export type ResponseFunction = (input: string) => string;

/**
 * Represents a chat response that can be either a static string or a dynamic function
 */
export type ChatResponseContent = string | ResponseFunction;

/**
 * Represents a standalone chat response with patterns and content
 */
export interface ChatResponse {
  /** Unique identifier for the response */
  id: string;
  /** Array of patterns that trigger this response */
  patterns: string[];
  /** The response content (static or dynamic) */
  response: ChatResponseContent;
}

/**
 * Represents a single step in a conversation flow
 */
export interface ConversationStep {
  /** Unique identifier for the step */
  id: string;
  /** Array of patterns that trigger this step */
  patterns: string[];
  /** The response content for this step */
  response: ChatResponseContent;
  /** Optional array of next step IDs in the conversation flow */
  nextSteps?: string[];
}

/**
 * Represents a complete conversation flow with multiple steps
 */
export interface ConversationFlow {
  /** Unique identifier for the flow */
  id: string;
  /** Display name for the flow */
  name: string;
  /** Array of steps in the conversation flow */
  steps: ConversationStep[];
}

/**
 * Type guard to check if a response is a function
 */
export function isResponseFunction(response: ChatResponseContent): response is ResponseFunction {
  return typeof response === 'function';
} 