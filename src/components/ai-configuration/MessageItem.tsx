import React from 'react';
import { Bot, User, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Message } from './types';
import { CodeBlock } from './CodeBlock';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <motion.div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={cn(
          "max-w-[85%] rounded-lg p-4 shadow-md border backdrop-blur-sm",
          isBot 
            ? "bg-blue-900/10 border-blue-800/30 mr-8 rounded-tl-none" 
            : "bg-gradient-to-r from-blue-800 to-blue-700 text-blue-100 border-blue-600/30 ml-8 rounded-tr-none"
        )}
     
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center mb-2">
          <div className={cn(
            "p-1 rounded-full border",
            isBot ? "bg-blue-800/30 border-none" : "bg-blue-700/80 border-blue-600/30"
          )}>
            {isBot ? (
              <Bot className="w-4 h-4 mr-1 text-blue-300" />
            ) : (
              <User className="w-4 h-4 mr-1 text-blue-200" />
            )}
          </div>
          <span className={cn(
            "text-xs font-medium ml-2",
            isBot ? "text-blue-200" : "text-blue-100"
          )}>
            {isBot ? 'JFrog Assistant' : 'You'}
          </span>
          {isBot && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-8 w-8 p-0 rounded-full hover:bg-blue-800/20 text-blue-300"
              onClick={() => copyToClipboard(message.content)}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <div className={cn(
          "whitespace-pre-wrap",
          isBot ? "text-blue-100" : "text-blue-100"
        )}>
          {message.content.includes('```') ? (
            <CodeBlock 
              content={message.content} 
              onCopy={copyToClipboard} 
            />
          ) : (
            message.content
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
