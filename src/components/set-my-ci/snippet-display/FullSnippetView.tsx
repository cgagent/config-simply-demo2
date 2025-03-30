
import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FullSnippetViewProps {
  snippet: string;
  onCopy: (text: string, message: string) => void;
}

const FullSnippetView: React.FC<FullSnippetViewProps> = ({ snippet, onCopy }) => {
  return (
    <div className="bg-gray-50 rounded-md p-5 border border-gray-300 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Label className="text-base font-semibold text-gray-800">Complete CI configuration file:</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-300 hover:bg-gray-100"
          onClick={() => onCopy(snippet, "Full configuration copied")}
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

export default FullSnippetView;
