import React from 'react';
import { AIChat } from '@/components/ai-chat/AIChat';
import { useChat } from '@/contexts/ChatContext';

const Home: React.FC = () => {
  const {
    chatKey,
    chatInputValue,
    shouldSendMessage,
    setIsChatActive,
    clearInitialInputValue,
    clearShouldSendMessage,
  } = useChat();

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <main className="flex-1 w-full mx-auto flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col h-[calc(100vh-64px)]">
          <div className="flex-1 flex flex-col border-0 overflow-hidden bg-background dark:bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
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
