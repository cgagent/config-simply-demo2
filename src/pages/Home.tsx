import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AIChat } from '@/components/ai-chat/AIChat';
import StatisticsBar from '@/components/StatisticsBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useRepositories } from '@/contexts/RepositoryContext';

// Create a custom event for chat reset
const CHAT_RESET_EVENT = 'chat-reset-event';
const CHAT_OPEN_EVENT = 'chat-open-event';

// Extend Window interface
declare global {
  interface Window {
    resetAIChat: () => void;
    openAIChatWithQuery: (query: string) => void;
  }
}

// Global helper function to trigger chat reset from anywhere
window.resetAIChat = () => {
  console.log('Global chat reset triggered');
  window.dispatchEvent(new CustomEvent(CHAT_RESET_EVENT));
};

// Global helper to open chat with query
window.openAIChatWithQuery = (query) => {
  console.log('Global chat open with query triggered:', query);
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail: { query } }));
};

const Home: React.FC = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatInputValue, setChatInputValue] = useState('');
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const initialRender = useRef(true);
  const { repositories, packageStats } = useRepositories();
  
  // Calculate CI completion numbers in the same way as StatusSummary
  const totalRepos = repositories.length;
  const configuredRepos = repositories.filter(repo => repo.isConfigured).length;
  const ciCompletionPercentage = totalRepos > 0 ? Math.round((configuredRepos / totalRepos) * 100) : 0;

  // Use package statistics from context
  const statsData = {
    ciCompletionPercentage,
    totalPackages: packageStats.totalPackages,
    blockedPackages: packageStats.blockedPackages,
    dataConsumption: packageStats.dataConsumption
  };

  // Hard reset function to completely reset chat state
  const hardResetChat = useCallback(() => {
    console.log("Performing hard reset of chat");
    // Reset all state in a specific order
    setIsChatActive(false);
    setChatInputValue('');
    setShouldSendMessage(false);
    
    // Force component remount
    setChatKey(prev => prev + 1);
  }, []);

  // Listen for global reset events
  useEffect(() => {
    const handleResetEvent = () => {
      console.log("Received global chat reset event");
      hardResetChat();
    };

    const handleOpenEvent = (e) => {
      console.log("Received global chat open event with query:", e.detail?.query);
      // First reset
      hardResetChat();
      
      // Then set up the new query after a brief delay
      setTimeout(() => {
        if (e.detail?.query) {
          setChatInputValue(e.detail.query);
          setShouldSendMessage(true);
        }
        setIsChatActive(true);
      }, 50);
    };

    // Add event listeners
    window.addEventListener(CHAT_RESET_EVENT, handleResetEvent);
    window.addEventListener(CHAT_OPEN_EVENT, handleOpenEvent);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener(CHAT_RESET_EVENT, handleResetEvent);
      window.removeEventListener(CHAT_OPEN_EVENT, handleOpenEvent);
    };
  }, [hardResetChat]);

  // Reset chat when directly navigating to home
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Only reset on direct navigation to home
    if (location.pathname === '/home') {
      console.log("Reset on direct navigation to home");
      window.resetAIChat();
    }
  }, [location.pathname]);

  // Direct query handler that uses the global event system
  const handleChatQuery = useCallback((query: string) => {
    console.log('handleChatQuery called with:', query);
    // This will automatically open the chat and send the query
    window.openAIChatWithQuery(query);
  }, []);

  // Generate token handler
  const handleGenerateToken = useCallback(() => {
    handleChatQuery("generate token");
  }, [handleChatQuery]);

  // Utility for AIChat component
  const clearInitialInputValue = useCallback(() => {
    setChatInputValue('');
  }, []);

  const clearShouldSendMessage = useCallback(() => {
    setShouldSendMessage(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <main className="flex-1 w-full mx-auto flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col h-[calc(100vh-64px)] pt-6">
          {!isChatActive && (
            <StatisticsBar 
              ciCompletionPercentage={statsData.ciCompletionPercentage}
              blockedPackages={statsData.blockedPackages}
              totalPackages={statsData.totalPackages}
              dataConsumption={statsData.dataConsumption}
              onChatQuery={handleChatQuery}
            />
          )}

          <div className="flex-1 flex flex-col border-0 overflow-hidden bg-background dark:bg-background">
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <AIChat 
                key={chatKey}
                onChatStateChange={setIsChatActive}
                initialInputValue={chatInputValue}
                clearInitialInputValue={clearInitialInputValue}
                shouldSendMessage={shouldSendMessage}
                clearShouldSendMessage={clearShouldSendMessage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
