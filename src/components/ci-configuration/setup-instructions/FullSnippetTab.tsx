
import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FullSnippetTabProps {
  generateFullSnippet: () => string;
  repositoryName: string | undefined;
  onCopy: (text: string, message: string) => void;
}

const FullSnippetTab: React.FC<FullSnippetTabProps> = ({ generateFullSnippet, repositoryName, onCopy }) => {
  return (
    <div className="bg-muted rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-sm font-medium">Complete workflow example for {repositoryName || 'your repository'}:</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8" 
          onClick={() => onCopy(generateFullSnippet(), "Full workflow example copied")}
        >
          <CopyIcon className="h-3.5 w-3.5 mr-1" />
          Copy
        </Button>
      </div>
      <pre className="p-4 bg-black text-white rounded-md overflow-x-auto text-sm">
        {generateFullSnippet()}
      </pre>
    </div>
  );
};

export default FullSnippetTab;
