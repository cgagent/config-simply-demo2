import React from 'react';

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
  // Keep the component as a container, but without the input field and button
  return (
    <div className="p-3 border-t bg-background">
      {/* Input area has been removed */}
    </div>
  );
};
