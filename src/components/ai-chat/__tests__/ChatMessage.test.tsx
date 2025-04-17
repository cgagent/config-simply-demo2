import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatMessage } from '../ChatMessage';
import { Message } from '../constants';

describe('ChatMessage', () => {
  const mockMessage: Message = {
    id: '1',
    role: 'bot',
    content: 'Hello, how can I help you?',
  };

  const mockUserMessage: Message = {
    id: '2',
    role: 'user',
    content: 'Hi there!',
  };

  it('renders assistant message correctly', () => {
    render(<ChatMessage message={mockMessage} />);
    
    expect(screen.getByText('JFrog Assistant')).toBeInTheDocument();
    expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument();
  });

  it('renders user message correctly', () => {
    render(<ChatMessage message={mockUserMessage} />);
    
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('shows copy button for assistant messages', () => {
    render(<ChatMessage message={mockMessage} />);
    
    const copyButton = screen.getByRole('button');
    expect(copyButton).toBeInTheDocument();
  });

  it('does not show copy button for user messages', () => {
    render(<ChatMessage message={mockUserMessage} />);
    
    const copyButton = screen.queryByRole('button');
    expect(copyButton).not.toBeInTheDocument();
  });

  it('handles copy to clipboard functionality', () => {
    render(<ChatMessage message={mockMessage} />);
    
    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello, how can I help you?');
  });

  it('renders markdown content correctly', () => {
    const messageWithMarkdown: Message = {
      id: '3',
      role: 'bot',
      content: '**Bold text** and `code`',
    };
    
    render(<ChatMessage message={messageWithMarkdown} />);
    
    expect(screen.getByText('Bold text')).toHaveStyle({ fontWeight: 'bold' });
    expect(screen.getByText('code')).toHaveClass('prose-code');
  });
}); 