import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Add event name constant
const CLOSE_STATS_BAR_EVENT = 'closeStatsBar';

// Create a custom event type for better type safety
interface CloseStatsBarEvent extends Event {
  type: typeof CLOSE_STATS_BAR_EVENT;
}

// Helper function to dispatch the event
const dispatchCloseStatsBarEvent = () => {
  const event = new CustomEvent(CLOSE_STATS_BAR_EVENT);
  window.dispatchEvent(event);
};

interface ChatContextType {
  chatInputValue: string;
  shouldSendMessage: boolean;
  isInChatFlow: boolean;
  isChatActive: boolean;
  chatKey: number;
  setChatInputValue: (value: string) => void;
  setShouldSendMessage: (value: boolean) => void;
  setIsInChatFlow: (value: boolean) => void;
  setIsChatActive: (value: boolean) => void;
  handleChatQuery: (query: string) => void;
  clearInitialInputValue: () => void;
  clearShouldSendMessage: () => void;
  hardResetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [chatInputValue, setChatInputValue] = useState('');
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const [isInChatFlow, setIsInChatFlow] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const hardResetChat = useCallback(() => {
    console.log("Performing hard reset of chat");
    setIsChatActive(false);
    setChatInputValue('');
    setShouldSendMessage(false);
    setIsInChatFlow(false);
    setChatKey(prev => prev + 1);
  }, []);

  const handleChatQuery = useCallback((query: string) => {
    console.log("Setting chat query:", query);
    navigate('/home');
    // Use the helper function to dispatch the event
    dispatchCloseStatsBarEvent();
    // Small delay to ensure navigation completes before setting state
    setTimeout(() => {
      setChatInputValue(query);
      setShouldSendMessage(true);
      setIsInChatFlow(true);
      setIsChatActive(true);
    }, 100);
  }, [navigate]);

  const clearInitialInputValue = useCallback(() => {
    setChatInputValue('');
  }, []);

  const clearShouldSendMessage = useCallback(() => {
    setShouldSendMessage(false);
  }, []);

  // Define global functions
  React.useEffect(() => {
    window.resetAIChat = hardResetChat;
    window.openAIChatWithQuery = handleChatQuery;

    return () => {
      delete window.resetAIChat;
      delete window.openAIChatWithQuery;
    };
  }, [hardResetChat, handleChatQuery]);

  const value = {
    chatInputValue,
    shouldSendMessage,
    isInChatFlow,
    isChatActive,
    chatKey,
    setChatInputValue,
    setShouldSendMessage,
    setIsInChatFlow,
    setIsChatActive,
    handleChatQuery,
    clearInitialInputValue,
    clearShouldSendMessage,
    hardResetChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Export the event name and helper function for use in other components
export { CLOSE_STATS_BAR_EVENT, dispatchCloseStatsBarEvent }; 