import React from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message, SUGGESTED_QUERIES } from './constants';
import { AIConfigurationChat } from '@/components/ai-configuration';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SuggestedQueries } from './SuggestedQueries';
import { useNavigate } from 'react-router-dom';
import { useRepositories } from '@/contexts/RepositoryContext';

interface ConversationScreenProps {
  messages: Message[];
  isProcessing: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string) => void;
  onSelectQuery: (query: string) => void;
  showCIConfig: boolean;
  repository?: any;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  messages,
  isProcessing,
  inputValue,
  setInputValue,
  onSendMessage,
  onSelectQuery,
  showCIConfig,
  repository
}) => {
  const navigate = useNavigate();
  const { updateRepositoryStatus } = useRepositories();
  
  // Use the shared repository update function
  const handleMergeSuccess = (repoName: string, packageType: string) => {
    updateRepositoryStatus(repoName, packageType);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} isProcessing={isProcessing} />
      </div>
      
      {showCIConfig && (
        <div className="border-t border-blue-800/30 pt-2 space-card rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold px-4 py-2 text-blue-100 space-glow">CI Configuration Assistant</h3>
          <div className="p-4 max-h-[500px] overflow-y-auto">
            <AIConfigurationChat 
              repositoryName="infrastructure" 
              onMergeSuccess={handleMergeSuccess}
            />
          </div>
        </div>
      )}
      
      <div className="pt-2">
        <ChatInput 
          isProcessing={isProcessing} 
          onSendMessage={onSendMessage} 
          isInitialState={false}
          value={inputValue}
          setValue={setInputValue}
        />
        
        {!isProcessing && (
          <div className="mt-4 mb-2">
            <p className="text-blue-200/70 mb-2 text-xs">Quick questions:</p>
            <SuggestedQueries 
              queries={SUGGESTED_QUERIES} 
              onSelectQuery={onSelectQuery} 
            />
          </div>
        )}
      </div>
    </div>
  );
};
