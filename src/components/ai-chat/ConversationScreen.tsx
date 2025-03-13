
import React from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message } from './constants';

interface ConversationScreenProps {
  messages: Message[];
  isProcessing: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string) => void;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  messages,
  isProcessing,
  inputValue,
  setInputValue,
  onSendMessage
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
      </div>
      <div className="pt-4 border-t">
        <ChatInput 
          isProcessing={isProcessing} 
          onSendMessage={onSendMessage} 
          isInitialState={false}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </div>
  );
};
