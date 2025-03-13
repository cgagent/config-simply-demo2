
import React, { useRef, useEffect } from 'react';
import { ChatMessage, Message } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-center text-sm">
            Ask anything to get started
          </p>
        </div>
      )}
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
