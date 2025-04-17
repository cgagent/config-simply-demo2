import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatInput } from '../ChatInput';

describe('ChatInput', () => {
  const mockOnSendMessage = vi.fn();
  const mockSetValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field with correct placeholder', () => {
    render(
      <ChatInput
        value=""
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    expect(screen.getByPlaceholderText(/ask me anything/i)).toBeInTheDocument();
  });

  it('handles input value changes', () => {
    render(
      <ChatInput
        value=""
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello world' } });

    expect(mockSetValue).toHaveBeenCalledWith('Hello world');
  });

  it('sends message when Enter key is pressed', () => {
    render(
      <ChatInput
        value="Hello world"
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello world');
  });

  it('does not send message when Enter key is pressed with empty input', () => {
    render(
      <ChatInput
        value=""
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it('disables input and send button while processing', () => {
    render(
      <ChatInput
        value="Hello world"
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={true}
      />
    );

    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it('sends message when send button is clicked', () => {
    render(
      <ChatInput
        value="Hello world"
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello world');
  });

  it('clears input after sending message', () => {
    render(
      <ChatInput
        value="Hello world"
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
      />
    );

    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);

    expect(mockSetValue).toHaveBeenCalledWith('');
  });

  it('shows rotating placeholder in initial state', () => {
    render(
      <ChatInput
        value=""
        setValue={mockSetValue}
        onSendMessage={mockOnSendMessage}
        isProcessing={false}
        isInitialState={true}
      />
    );

    expect(screen.getByPlaceholderText(/ask jfrog to/i)).toBeInTheDocument();
  });
}); 