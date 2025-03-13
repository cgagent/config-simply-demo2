
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIConfigurationChat } from '@/components/ai-configuration';

const CIConfigurationPage: React.FC = () => {
  const [repositoryName, setRepositoryName] = useState('example-repo');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">CI Configuration</h1>
      <div className="mb-8">
        <AIConfigurationChat repositoryName={repositoryName} />
      </div>
    </div>
  );
};

export default CIConfigurationPage;
