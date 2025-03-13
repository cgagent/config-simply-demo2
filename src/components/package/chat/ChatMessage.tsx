
import React from 'react';
import { Bot, User, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Text copied successfully",
      });
    });
  };

  // Helper function to format package entries in SBOM reports
  const formatPackageData = (content: string) => {
    if (content.includes('SBOM report')) {
      const parts = content.split(/\n\n(?=Package:)/);
      return (
        <>
          <p className="mb-6 text-sm font-medium">{parts[0]}</p>
          <div className="flex flex-col space-y-6">
            {parts.slice(1).map((packageData, index) => {
              const lines = packageData.split('\n');
              const packageName = lines[0].replace('Package: ', '');
              const version = lines[1].replace('Version: ', '');
              const license = lines[2].replace('License: ', '');
              
              return (
                <div key={index} className="bg-muted/40 rounded-md p-5 border shadow-sm w-full">
                  <div className="font-semibold text-md mb-3">{packageName}</div>
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="text-muted-foreground font-medium">Version:</div>
                    <div>{version}</div>
                    <div className="text-muted-foreground font-medium">License:</div>
                    <div>{license}</div>
                  </div>
                  {lines.length > 3 && lines[3].includes('Dependencies:') && (
                    <>
                      <div className="text-xs font-medium text-muted-foreground mt-4 mb-2">Dependencies:</div>
                      <ul className="list-disc pl-6 text-xs space-y-2">
                        {lines.slice(4).map((dep, i) => (
                          <li key={i} className="mb-1">{dep}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      );
    }
    
    return content.split('\n').map((line, i) => {
      if (line.startsWith('• ')) {
        return <p key={i} className="mb-1 ml-2">• {line.substring(2)}</p>;
      } else if (line.match(/^\d+\./)) {
        return <p key={i} className="mb-1 ml-2">{line}</p>;
      } else if (line.includes('**')) {
        return (
          <p key={i} className="mb-1">
            {line.split('**').map((segment, j) => 
              j % 2 === 1 ? <strong key={j}>{segment}</strong> : segment
            )}
          </p>
        );
      } else {
        return <p key={i} className="mb-1">{line}</p>;
      }
    });
  };

  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground ml-12' 
            : 'bg-muted mr-12'
        }`}
      >
        <div className="flex items-center mb-1">
          {message.role === 'bot' ? (
            <Bot className="w-4 h-4 mr-2" />
          ) : (
            <User className="w-4 h-4 mr-2" />
          )}
          <span className="text-xs font-medium">
            {message.role === 'bot' ? 'Assistant' : 'You'}
          </span>
          {message.role === 'bot' && (
            <button 
              className="ml-2 h-6 w-6 p-0 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => copyToClipboard(message.content)}
            >
              <Copy className="h-3 w-3" />
            </button>
          )}
        </div>
        
        <div className="whitespace-pre-wrap">
          {formatPackageData(message.content)}
        </div>
      </div>
    </div>
  );
};
