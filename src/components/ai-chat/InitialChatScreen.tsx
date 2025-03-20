import React from 'react';
import { FlyFrogIcon } from './FlyFrogIcon';
import { ChatInput } from './ChatInput';
import { SuggestedQueries } from './SuggestedQueries';
import { SUGGESTED_QUERIES } from './constants';

interface InitialChatScreenProps {
  isProcessing: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string) => void;
  onSelectQuery: (query: string) => void;
}

export const InitialChatScreen: React.FC<InitialChatScreenProps> = ({
  isProcessing,
  inputValue,
  setInputValue,
  onSendMessage,
  onSelectQuery
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-0">
      <div className="flex items-center justify-center mb-4">
        <div className="relative h-20 w-20 bg-blue-900/50 rounded-full flex items-center justify-center shadow-lg border border-blue-700/30 space-glow">
          <div className="animate-pulse">
            <FlyFrogIcon />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-100 space-glow">
        How can I assist you today?
      </h1>
      <div className="w-auto max-w-xl px-6">
        <ChatInput 
          isProcessing={isProcessing} 
          onSendMessage={onSendMessage}
          isInitialState={true}
          value={inputValue}
          setValue={setInputValue}
        />
        <div className="mt-6">
          <p className="text-blue-200/70 mb-3 text-sm text-center">
            Or try one of these suggestions:
          </p>
          <SuggestedQueries 
            queries={SUGGESTED_QUERIES} 
            onSelectQuery={onSelectQuery} 
          />
        </div>
      </div>
    </div>
  );
};
