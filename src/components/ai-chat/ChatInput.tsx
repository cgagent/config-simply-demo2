
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  isInitialState?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isProcessing,
  isInitialState = false
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const staticPlaceholder = "Ask anything about repositories, CI/CD, or coding...";
  
  const rotatingPlaceholders = [
    "Set up your CI with FlyFrog",
    "Show you what packages are being used in your organization",
    "Find a public package",
    "See the malicious packages that blocked by FlyFrog",
    "Check your data consumption or storage in the last month",
    "Create an Sbom report for you"
  ];
  
  // Effect for textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);
  
  // Effect for rotating placeholders
  useEffect(() => {
    if (!isInitialState) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPlaceholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInitialState]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentPlaceholder = isInitialState 
    ? `Ask FlyFrog to ${rotatingPlaceholders[placeholderIndex]}`
    : staticPlaceholder;

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={currentPlaceholder}
        disabled={isProcessing}
        className={`pr-12 resize-none overflow-hidden min-h-[56px] ${isInitialState ? 'text-lg' : ''}`}
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        disabled={!input.trim() || isProcessing}
        onClick={handleSendMessage}
        variant="ghost"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
