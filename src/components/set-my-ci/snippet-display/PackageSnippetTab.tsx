
import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PackageSnippetTabProps {
  snippet: string;
  onCopy: (text: string, message: string) => void;
}

const PackageSnippetTab: React.FC<PackageSnippetTabProps> = ({ snippet, onCopy }) => {
  return (
    <div className="bg-gray-50 rounded-md p-3 border border-gray-300 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-sm font-medium text-gray-800">Package-specific configuration:</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-300 hover:bg-gray-100 h-7 px-2 py-1" 
          onClick={() => onCopy(snippet, "Package configuration copied")}
        >
          <CopyIcon className="h-3 w-3 mr-1 text-gray-600" />
          Copy
        </Button>
      </div>
      <pre className="p-3 bg-gray-900 text-white rounded-md overflow-x-auto text-xs border border-gray-700 shadow-inner">
        {snippet}
      </pre>
    </div>
  );
};

export default PackageSnippetTab;
