
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
    <div className="bg-blue-50 rounded-md p-5 border border-blue-300 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Label className="text-base font-semibold text-blue-800">Package-specific configuration:</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-blue-300 hover:bg-blue-100" 
          onClick={() => onCopy(snippet, "Package configuration copied")}
        >
          <CopyIcon className="h-4 w-4 mr-2 text-blue-600" />
          Copy
        </Button>
      </div>
      <pre className="p-5 bg-gray-900 text-white rounded-md overflow-x-auto text-base border border-gray-700 shadow-inner">
        {snippet}
      </pre>
    </div>
  );
};

export default PackageSnippetTab;
