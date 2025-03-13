
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ConfigInputFormProps {
  input: string;
  setInput: (value: string) => void;
  isProcessing: boolean;
  onSendMessage: () => void;
}

export const ConfigInputForm: React.FC<ConfigInputFormProps> = ({
  input,
  setInput,
  isProcessing,
  onSendMessage
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-3 border-t bg-background">
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""
          disabled={isProcessing}
          className="flex-1"
        />
        <Button 
          onClick={onSendMessage} 
          disabled={!input.trim() || isProcessing}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
