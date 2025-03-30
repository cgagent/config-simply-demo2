
import React from 'react';
import { Message } from '@/components/ai-configuration/types';
import { MessageItem } from '@/components/ai-configuration/MessageItem';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-950/5">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
