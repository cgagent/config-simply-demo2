
import React, { useEffect } from 'react';
import { MessageList } from './MessageList';
import { ConfigInputForm } from './ConfigInputForm';
import { useConfigChat } from './hooks/useConfigChat';
import { SelectableOptions } from './SelectableOptions';
import { useNavigate } from 'react-router-dom';
import { Repository } from '@/types/repository';
import CIChatFlow from '@/components/set-my-ci/CIChatFlow';

interface AIConfigurationChatProps {
  repositoryName?: string;
  onMergeSuccess?: (repoName: string, packageType: string) => void;
}

const AIConfigurationChat: React.FC<AIConfigurationChatProps> = ({ 
  repositoryName,
  onMergeSuccess
}) => {
  const navigate = useNavigate();
  
  const {
    messages,
    isProcessing,
    handleSendMessage,
    options,
    setOptions,
    handleSelectOption,
  } = useConfigChat(repositoryName, (path) => navigate(path), onMergeSuccess);

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-5 rounded-md bg-gradient-to-b from-gray-100/95 to-white/95 border border-border/50 shadow-md dark:from-gray-850/95 dark:to-gray-900/95 dark:border-gray-800">
      <div className="flex-1 overflow-y-auto px-4 py-4 backdrop-blur-sm">
        <MessageList messages={messages} isProcessing={isProcessing} />
        
        {/* CI Chat Flow integration */}
        <CIChatFlow 
          onOptionSelect={handleSelectOption}
          setOptions={setOptions}
          repositoryName={repositoryName}
        />
        
        {!isProcessing && options && options.length > 0 && (
          <SelectableOptions 
            options={options} 
            onSelectOption={handleSelectOption} 
          />
        )}
      </div>
      
      <ConfigInputForm 
        isProcessing={isProcessing}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default AIConfigurationChat;
