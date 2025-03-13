
import React from 'react';
import { Bot, User, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Message } from './types';
import { CodeBlock } from './CodeBlock';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { toast } = useToast();
  const isBot = message.role === 'bot';

  const copyToClipboard = (text: string) => {
    // Extract code blocks
    const codeBlockMatch = text.match(/```yaml([\s\S]*?)```/);
    const codeToCopy = codeBlockMatch ? codeBlockMatch[1].trim() : text;
    
    navigator.clipboard.writeText(codeToCopy).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Configuration snippet copied successfully",
      });
    });
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isBot 
            ? 'bg-muted mr-12' 
            : 'bg-primary text-primary-foreground ml-12'
        }`}
      >
        <div className="flex items-center mb-1">
          {isBot ? (
            <Bot className="w-4 h-4 mr-2" />
          ) : (
            <User className="w-4 h-4 mr-2" />
          )}
          <span className="text-xs font-medium">
            {isBot ? 'FlyFrog Assistant' : 'You'}
          </span>
        </div>
        
        <div className="whitespace-pre-wrap">
          {message.content.includes('```') ? (
            <CodeBlock 
              content={message.content} 
              onCopy={copyToClipboard} 
            />
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};
