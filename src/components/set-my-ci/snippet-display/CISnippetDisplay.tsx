
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
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
  selectedPackages
}) => {
  const [showFullWorkflow, setShowFullWorkflow] = useState(false);
  const [snippets, setSnippets] = useState({
    basic: '',
    full: ''
  });
  const [isUpdating, setIsUpdating] = useState(true); // Set to true initially
  const { toast } = useToast();
  
  // Update snippets whenever selectedPackages changes
  useEffect(() => {
    setIsUpdating(true);
    
    // Small timeout to show the loading state
    const timer = setTimeout(() => {
      // Combine the setup and package specific into one basic snippet
      const setupSnippet = generateJFrogSetupSnippet(selectedCI);
      const packageSnippet = generatePackageSpecificSnippets(selectedPackages);
      
      setSnippets({
        basic: `${setupSnippet}\n${packageSnippet}`,
        full: selectedCI === 'github' 
          ? generateFullGitHubSnippet(selectedPackages) 
          : generateFullOtherCISnippet(selectedPackages)
      });
      setIsUpdating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCI, selectedPackages]);

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
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-gray-900">Step 3: Configuration Snippet</h2>
        {isUpdating && (
          <div className="text-xs text-gray-500">
            Updating snippets...
          </div>
        )}
      </div>
      <p className="text-gray-700 text-xs mb-2">
        Here's the code snippet you need to add to your CI configuration.
      </p>
      
      <div className="flex items-center justify-end mb-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="full-workflow"
            checked={showFullWorkflow}
            onCheckedChange={setShowFullWorkflow}
          />
          <Label htmlFor="full-workflow" className="text-xs font-medium text-gray-800">
            Show full workflow
          </Label>
        </div>
      </div>
      
      {isUpdating ? (
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : showFullWorkflow ? (
        <FullSnippetView 
          snippet={snippets.full} 
          onCopy={copyToClipboard} 
        />
      ) : (
        <div className="bg-gray-50 rounded-md p-2 border border-gray-300 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <Label className="text-xs font-medium text-gray-800">Configuration snippet:</Label>
            <button 
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center"
              onClick={() => copyToClipboard(snippets.basic, "Snippet copied to clipboard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </button>
          </div>
          <pre className="p-2 bg-gray-900 text-white rounded-md overflow-x-auto text-xs border border-gray-700 shadow-inner">
            {snippets.basic}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CISnippetDisplay;
