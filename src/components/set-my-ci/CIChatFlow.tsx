
import React from 'react';
import { Bot } from 'lucide-react';
import { ConfigInputForm } from '@/components/ai-configuration/ConfigInputForm';
import { useCIChatState } from './hooks/useCIChatState';
import ChatMessages from './ChatMessages';
import CurrentStepDisplay from './CurrentStepDisplay';

const CIChatFlow: React.FC = () => {
  const {
    messages,
    currentStep,
    selectedCI,
    selectedPackages,
    isProcessing,
    handleCISelect,
    handleTogglePackage,
    handleNextStep,
    handlePreviousStep,
    handleSendMessage
  } = useCIChatState();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-850 dark:to-gray-900 rounded-md shadow-md border border-blue-700/30">
      <div className="p-3 border-b border-blue-700/20 bg-blue-900/10 backdrop-blur-sm">
        <h3 className="text-blue-100 font-medium flex items-center">
          <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-full backdrop-blur-sm border border-blue-600/20 shadow-inner">
            <Bot className="w-5 h-5 text-blue-300" />
          </div>
          JFrog CI Configuration Assistant
        </h3>
      </div>
      
      <ChatMessages messages={messages} />
      
      {/* Display current step UI as a message */}
      <div className="flex justify-start p-4 pt-0">
        <div className="max-w-[85%] rounded-lg shadow-md border border-blue-800/30 bg-blue-900/5 backdrop-blur-sm mr-8 rounded-tl-none">
          <div className="flex items-center p-4 pb-2">
            <div className="p-1 rounded-full bg-blue-800/30">
              <Bot className="w-4 h-4 mr-1 text-blue-300" />
            </div>
            <span className="text-xs font-medium ml-2 text-blue-200">
              JFrog Assistant
            </span>
          </div>
          
          <div className="p-4 pt-0">
            <CurrentStepDisplay
              currentStep={currentStep}
              selectedCI={selectedCI}
              selectedPackages={selectedPackages}
              onSelectCI={handleCISelect}
              onTogglePackage={handleTogglePackage}
              onNextStep={handleNextStep}
              onPreviousStep={handlePreviousStep}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-700/20 bg-blue-900/10">
        <ConfigInputForm
          isProcessing={isProcessing}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default CIChatFlow;
