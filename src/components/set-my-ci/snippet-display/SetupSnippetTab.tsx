
import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SetupSnippetTabProps {
  snippet: string;
  onCopy: (text: string, message: string) => void;
}

const SetupSnippetTab: React.FC<SetupSnippetTabProps> = ({ snippet, onCopy }) => {
  return (
    <div className="bg-gray-50 rounded-md p-5 border border-gray-300 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Label className="text-base font-semibold text-gray-800">Add this snippet to set up JFrog:</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-300 hover:bg-gray-100" 
          onClick={() => onCopy(snippet, "Setup snippet copied")}
        >
          <CopyIcon className="h-4 w-4 mr-2 text-gray-600" />
          Copy
        </Button>
      </div>
      <pre className="p-5 bg-gray-900 text-white rounded-md overflow-x-auto text-base border border-gray-700 shadow-inner">
        {snippet}
      </pre>
    </div>
  );
};

export default SetupSnippetTab;
