
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from './constants';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <div className={cn(
        "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center",
        isUser ? "bg-primary text-white" : "bg-primary/10 text-primary"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className="flex-1 space-y-1">
        <p className="text-xs font-medium">{isUser ? 'You' : 'AI Assistant'}</p>
        <div className="prose prose-sm max-w-none text-sm">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
