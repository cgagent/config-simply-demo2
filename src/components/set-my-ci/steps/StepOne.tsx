
import React from 'react';
import { ChatMessage } from '../ChatMessage';
import { CIButtonGroup } from '../CIButtonGroup';
import { CIType } from '../hooks/useCISetupState';

interface StepOneProps {
  onSelectCI: (ciType: string) => void;
  selectedCI: CIType;
}

const StepOne: React.FC<StepOneProps> = ({ onSelectCI, selectedCI }) => {
  return (
    <>
      <ChatMessage
        type="system"
        content="Great, let's set up your CI to work with JFrog.\nWhich CI tools are you using?"
      />
      <ChatMessage
        type="button-group"
        content={
          <CIButtonGroup 
            options={[
              { id: 'github', label: 'GitHub Actions', description: 'Configure JFrog with GitHub Actions' },
              { id: 'other', label: 'Other CI', description: 'Circle CI, Jenkins, GitLab CI' }
            ]}
            onSelect={onSelectCI}
            selectedOptions={selectedCI ? [selectedCI] : []}
          />
        }
      />
    </>
  );
};

export default StepOne;
