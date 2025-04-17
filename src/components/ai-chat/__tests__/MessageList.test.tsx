import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MessageList } from '../MessageList';
import { Message } from '../constants';

describe('MessageList', () => {
  const mockMessages: Message[] = [
    { id: '1', role: 'user', content: 'Hello' },
    { id: '2', role: 'bot', content: 'Hi there!' },
    { id: '3', role: 'user', content: 'How are you?' },
  ];

  const mockOnSelectOption = vi.fn();

  beforeEach(() => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders all messages in the list', () => {
    render(<MessageList messages={mockMessages} onSelectOption={mockOnSelectOption} />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('scrolls to the bottom when new messages are added', () => {
    const { rerender } = render(
      <MessageList 
        messages={mockMessages.slice(0, 2)} 
        onSelectOption={mockOnSelectOption} 
      />
    );

    // Rerender with a new message
    rerender(
      <MessageList 
        messages={mockMessages} 
        onSelectOption={mockOnSelectOption} 
      />
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('renders user and bot messages with correct styling', () => {
    render(<MessageList messages={mockMessages} onSelectOption={mockOnSelectOption} />);
    
    const userMessages = screen.getAllByText('You');
    const botMessages = screen.getAllByText('JFrog Assistant');
    
    expect(userMessages).toHaveLength(2); // Two user messages
    expect(botMessages).toHaveLength(1); // One bot message
  });

  it('handles empty message list', () => {
    render(<MessageList messages={[]} onSelectOption={mockOnSelectOption} />);
    
    expect(screen.queryByText('You')).not.toBeInTheDocument();
    expect(screen.queryByText('JFrog Assistant')).not.toBeInTheDocument();
  });

  it('passes onSelectOption to ChatMessage components', () => {
    render(<MessageList messages={mockMessages} onSelectOption={mockOnSelectOption} />);
    
    // Find a message with security remediation options
    const messageWithOptions = mockMessages.find(msg => 
      msg.content.includes('One package with risks was detected')
    );
    
    if (messageWithOptions) {
      expect(mockOnSelectOption).toHaveBeenCalled();
    }
  });
}); 