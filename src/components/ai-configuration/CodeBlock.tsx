
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  content: string;
  onCopy: (text: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ content, onCopy }) => {
  return (
    <>
      {content.split('```').map((part, i) => {
        if (i % 2 === 0) {
          return <p key={i} className="mb-2">{part}</p>;
        } else {
          const language = part.split('\n')[0];
          const code = part.split('\n').slice(1).join('\n');
          return (
            <div key={i} className="relative">
              <pre className="p-3 bg-black text-white rounded-md overflow-x-auto text-sm mb-2">
                <code>{code}</code>
              </pre>
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-2 right-2 h-8 opacity-80"
                onClick={() => onCopy(part)}
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </Button>
            </div>
          );
        }
      })}
    </>
  );
};
