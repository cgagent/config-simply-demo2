
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import SetupSnippetTab from './SetupSnippetTab';
import PackageSnippetTab from './PackageSnippetTab';
import FullSnippetView from './FullSnippetView';
import { 
  generateJFrogSetupSnippet,
  generatePackageSpecificSnippets,
  generateFullGitHubSnippet,
  generateFullOtherCISnippet
} from './snippetGenerators';

interface CISnippetDisplayProps {
  selectedCI: 'github' | 'other';
  selectedPackages: string[];
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const CISnippetDisplay: React.FC<CISnippetDisplayProps> = ({
  selectedCI,
  selectedPackages,
  onNextStep,
  onPreviousStep
}) => {
  const [showFullSnippet, setShowFullSnippet] = useState(false);
  const { toast } = useToast();
  
  // Generate all snippets
  const snippets = {
    setup: generateJFrogSetupSnippet(selectedCI),
    packageSpecific: generatePackageSpecificSnippets(selectedPackages),
    full: selectedCI === 'github' 
      ? generateFullGitHubSnippet(selectedPackages) 
      : generateFullOtherCISnippet(selectedPackages)
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: message,
      });
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 3: Configuration Snippet</h2>
      <p className="text-muted-foreground mb-6">
        Here's the code snippet you need to add to your CI configuration. Copy the snippet and integrate it into your workflow.
      </p>
      
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="full-snippet"
            checked={showFullSnippet}
            onCheckedChange={setShowFullSnippet}
          />
          <Label htmlFor="full-snippet">
            Show full workflow file
          </Label>
        </div>
      </div>
      
      {showFullSnippet ? (
        <FullSnippetView 
          snippet={snippets.full} 
          onCopy={copyToClipboard} 
        />
      ) : (
        <Tabs defaultValue="setup" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="setup">JFrog Setup</TabsTrigger>
            <TabsTrigger value="packages">Package Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <SetupSnippetTab 
              snippet={snippets.setup} 
              onCopy={copyToClipboard} 
            />
          </TabsContent>
          
          <TabsContent value="packages">
            <PackageSnippetTab 
              snippet={snippets.packageSpecific} 
              onCopy={copyToClipboard} 
            />
          </TabsContent>
        </Tabs>
      )}
      
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

export default CISnippetDisplay;
