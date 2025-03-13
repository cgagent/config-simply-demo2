
import React, { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { ConfigInputForm } from './ConfigInputForm';
import { useConfigChat } from './hooks/useConfigChat';

interface AIConfigurationChatProps {
  repositoryName?: string;
}

const AIConfigurationChat: React.FC<AIConfigurationChatProps> = ({ repositoryName }) => {
  const {
    messages,
    isProcessing,
    input,
    setInput,
    handleSendMessage,
  } = useConfigChat(repositoryName);

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <div className="bg-primary p-3">
        <h3 className="text-white font-medium flex items-center">
          <BotIcon />
          FlyFrog AI Configuration Assistant
        </h3>
      </div>
      
      <MessageList messages={messages} />
      
      <ConfigInputForm 
        input={input}
        setInput={setInput}
        isProcessing={isProcessing}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

const BotIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-5 h-5 mr-2"
  >
    <path d="M12 8V4H8"></path>
    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
    <path d="M2 14h2"></path>
    <path d="M20 14h2"></path>
    <path d="M15 13v2"></path>
    <path d="M9 13v2"></path>
  </svg>
);

export default AIConfigurationChat;
