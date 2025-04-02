export interface ChatResponse {
  id: string;
  patterns: string[];
  response: string | ((input: string) => string);
}

export interface ConversationStep {
  id: string;
  patterns: string[];
  response: string | ((input: string) => string);
  nextSteps?: string[];
}

export interface ConversationFlow {
  id: string;
  name: string;
  steps: ConversationStep[];
} 