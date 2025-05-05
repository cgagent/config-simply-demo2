import React from 'react';
import { Bot, User, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/components/shared/types';
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
      className={cn(
        "flex justify-start",
        isBot ? "-ml-[10px]" : "ml-[10mm]"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={cn(
          isBot 
            ? "max-w-[85%] shadow-md border backdrop-blur-sm bg-blue-900/10 border-blue-800/30 mr-8 rounded-xl rounded-tl-none p-4" 
            : "w-[calc(100%-10mm)] shadow-md border backdrop-blur-sm bg-[#1B2A4E] text-white border-none px-6 py-3 rounded-lg"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {isBot ? (
          <div className="flex items-center mb-3">
            <div className="p-1.5 rounded-full bg-blue-800/30">
              <Bot className="w-4 h-4 text-blue-300" />
            </div>
            <span className="text-sm font-medium ml-2 text-blue-200">
              JFrog Assistant
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-8 w-8 p-0 rounded-full hover:bg-blue-800/20 text-blue-300"
              onClick={() => copyToClipboard(message.content)}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-full bg-[#2563EB]">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium ml-2 text-white/90">
                You
              </span>
            </div>
            <div className="text-white text-2xl tracking-tight font-bold">
              {message.content}
            </div>
          </>
        )}
        
        {isBot && (
          <div className="text-blue-100 whitespace-pre-wrap">
            {message.content.includes('```') ? (
              <CodeBlock 
                content={message.content} 
                onCopy={copyToClipboard} 
              />
            ) : (
              <div>
                {message.content}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};