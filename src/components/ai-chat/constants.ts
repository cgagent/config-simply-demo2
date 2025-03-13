
export const SUGGESTED_QUERIES = [
  {
    label: "CI Setup",
    query: "I would like to set up my CI to work with you, can you please assist me to do it."
  },
  {
    label: "Org Packages",
    query: "What are the most popular package being used in my organization? is it secured?"
  },
  {
    label: "Public package",
    query: "I would like to use axios, can you please share with me more details: what package should I use, any vulnerabilities I should know, what are the latest versions, and is there any reason why I should not use it?"
  },
  {
    label: "Blocked packages",
    query: "Can you please share with me the blocked packages that did not enter my organization in the last 2 weeks? Include package name, package type, and why it was blocked."
  },
  {
    label: "Sbom",
    query: "Please create an Sbom report for me for the packages that are being used in the last 30 days in my organization."
  }
];

export const INITIAL_MESSAGES: Message[] = [];

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}
