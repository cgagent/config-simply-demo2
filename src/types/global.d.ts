interface Window {
  resetAIChat?: () => void;
  openAIChatWithQuery?: (query: string) => void;
}

declare global {
  interface Window {
    resetAIChat?: () => void;
    openAIChatWithQuery?: (query: string) => void;
  }
} 