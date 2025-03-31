
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface CodeSnippetsProps {
  selectedCI: 'github' | 'other' | null;
  selectedPackages: string[];
  onCopyToClipboard: (text: string, description: string) => void;
  generateSnippet: () => string;
  generateFullWorkflow: () => string;
}

const CodeSnippets: React.FC<CodeSnippetsProps> = ({ 
  selectedCI, 
  selectedPackages, 
  onCopyToClipboard,
  generateSnippet,
  generateFullWorkflow
}) => {
  return (
    <div className="mb-4 mt-2 space-y-4">
      <div className="bg-gray-800 rounded-md p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">JFrog CI Setup Snippet</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-blue-300 hover:text-white hover:bg-blue-900/60"
            onClick={() => onCopyToClipboard(generateSnippet(), "Setup snippet copied to clipboard")}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        <pre className="bg-gray-900 text-blue-100 p-3 rounded overflow-x-auto text-sm border border-gray-700">
          {generateSnippet()}
        </pre>
      </div>

      <div className="bg-gray-800 rounded-md p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">Full CI Workflow Example</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-blue-300 hover:text-white hover:bg-blue-900/60"
            onClick={() => onCopyToClipboard(generateFullWorkflow(), "Full workflow copied to clipboard")}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        <pre className="bg-gray-900 text-blue-100 p-3 rounded overflow-x-auto text-sm border border-gray-700">
          {generateFullWorkflow()}
        </pre>
      </div>

      <p className="text-sm text-muted-foreground">
        Add these configurations to your CI workflow file to integrate with JFrog.
      </p>
    </div>
  );
};

export default CodeSnippets;
