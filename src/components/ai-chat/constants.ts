
export const SUGGESTED_QUERIES = [
  {
    label: "Set my CI",
    query: "I would like to set up my CI to work with JFrog. Can you set it up for me?"
  },
  {
    label: "Check for risks",
    query: "Identify which packages are at risk in my organization"
  },
  {
    label: "Show my releases",
    query: "show me the packages that were released in the last 30 days"
  },
  {
    label: "Common packages",
    query: "Identify which packages are vulnerable and currently used in my organization."
  }
];

export const INITIAL_MESSAGES: Message[] = [];

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}
