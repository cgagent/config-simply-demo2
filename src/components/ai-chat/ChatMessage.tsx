import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from './constants';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully",
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-3"
    >
      <motion.div
        className={cn(
          "flex gap-3 p-4 rounded-lg shadow-md border backdrop-blur-sm",
          isUser 
            ? "bg-blue-800/30 text-white border-blue-700/30 ml-8 rounded-tr-none" 
            : "bg-blue-950/30 border-blue-800/30 mr-8 rounded-tl-none"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
          isUser ? "bg-blue-600 text-white" : "bg-blue-900 text-blue-200 ring-2 ring-blue-500/30"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium">
              {isUser ? 'You' : 'JFrog Assistant'}
            </div>
            {!isUser && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-blue-300/70 hover:text-blue-300 hover:bg-blue-800/30"
                onClick={() => copyToClipboard(message.content)}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none dark:prose-invert prose-pre:bg-blue-900/30 prose-pre:text-blue-100 prose-code:text-blue-300">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
