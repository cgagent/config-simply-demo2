
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Repository } from '@/types/repository';
import SetupSnippetTab from './setup-instructions/SetupSnippetTab';
import DiffSnippetTab from './setup-instructions/DiffSnippetTab';
import FullSnippetTab from './setup-instructions/FullSnippetTab';
import { 
  generateSetupSnippet, 
  generateNpmWebAppSnippet,
  generateNpmWebAppWithJFrogSnippet,
  generateFullSnippet
} from './setup-instructions/snippetGenerators';

interface SetupInstructionsProps {
  repository?: Repository;
  selectedPackageTypes: string[];
  onCopy: (text: string, message: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const SetupInstructions: React.FC<SetupInstructionsProps> = ({
  repository,
  selectedPackageTypes,
  onCopy,
  onNextStep,
  onPreviousStep
}) => {
  const [showSideBySide, setShowSideBySide] = useState(true);

  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 3: Add FlyFrog to your CI workflow</h2>
      
      <Tabs defaultValue="diff" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="setup">Setup Snippet</TabsTrigger>
          <TabsTrigger value="diff">NPM Workflow Diff</TabsTrigger>
          <TabsTrigger value="full">Full Workflow Example</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="space-y-4">
          <SetupSnippetTab 
            snippet={generateSetupSnippet()} 
            onCopy={onCopy} 
          />
        </TabsContent>
        
        <TabsContent value="diff" className="space-y-4">
          <DiffSnippetTab 
            generateNpmWebAppSnippet={() => generateNpmWebAppSnippet(repository?.name)}
            generateNpmWebAppWithJFrogSnippet={() => generateNpmWebAppWithJFrogSnippet(repository?.name)}
            showSideBySide={showSideBySide}
            setShowSideBySide={setShowSideBySide}
            onCopy={onCopy}
          />
        </TabsContent>
        
        <TabsContent value="full" className="space-y-4">
          <FullSnippetTab 
            generateFullSnippet={() => generateFullSnippet(repository, selectedPackageTypes)}
            repositoryName={repository?.name}
            onCopy={onCopy}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2" onClick={onPreviousStep}>
          Back
        </Button>
        <Button onClick={onNextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SetupInstructions;
