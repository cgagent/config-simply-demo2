
import React, { useRef, useEffect } from 'react';

interface MessageRendererProps {
  messages: Array<{ id: string, component: React.ReactNode }>;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-y-auto h-[500px]">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>{message.component}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageRenderer;
