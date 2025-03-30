
import React, { useMemo } from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import DiffView from '../diff-view/DiffView';

interface DiffSnippetTabProps {
  generateNpmWebAppSnippet: () => string;
  generateNpmWebAppWithJFrogSnippet: () => string;
  showSideBySide: boolean;
  setShowSideBySide: (value: boolean) => void;
  onCopy: (text: string, message: string) => void;
}

const DiffSnippetTab: React.FC<DiffSnippetTabProps> = ({ 
  generateNpmWebAppSnippet, 
  generateNpmWebAppWithJFrogSnippet, 
  showSideBySide, 
  setShowSideBySide, 
  onCopy 
}) => {
  // Prepare diff view for npm workflow
  const diffView = useMemo(() => {
    const originalLines = generateNpmWebAppSnippet().split('\n');
    const modifiedLines = generateNpmWebAppWithJFrogSnippet().split('\n');
    
    // Find where the JFrog setup was added
    let jfrogStartIndex = -1;
    let jfrogEndIndex = -1;
    
    for (let i = 0; i < modifiedLines.length; i++) {
      if (modifiedLines[i].includes('Setup JFrog')) {
        jfrogStartIndex = i;
      }
      if (jfrogStartIndex >= 0 && modifiedLines[i].includes('subdomain: acme')) {
        jfrogEndIndex = i;
        break;
      }
    }
    
    return (
      <DiffView 
        originalLines={originalLines}
        modifiedLines={modifiedLines}
        showSideBySide={showSideBySide}
        jfrogStartIndex={jfrogStartIndex}
        jfrogEndIndex={jfrogEndIndex}
      />
    );
  }, [generateNpmWebAppSnippet, generateNpmWebAppWithJFrogSnippet, showSideBySide]);

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-sm font-medium">Diff view of npm workflow changes:</Label>
          <div className="flex space-x-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch 
                id="side-by-side"
                checked={showSideBySide}
                onCheckedChange={setShowSideBySide}
              />
              <Label htmlFor="side-by-side" className="text-xs">
                Side-by-side view
              </Label>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8" 
              onClick={() => onCopy(generateNpmWebAppWithJFrogSnippet(), "Modified workflow copied")}
            >
              <CopyIcon className="h-3.5 w-3.5 mr-1" />
              Copy Modified
            </Button>
          </div>
        </div>
        <div className="p-4 bg-black rounded-md overflow-x-auto">
          {diffView}
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-muted-foreground">
            ℹ️ The green highlighted lines show the JFrog configuration added to your workflow.
          </Label>
        </div>
      </div>
      
      <div className="bg-muted rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-sm font-medium">Original npm workflow:</Label>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            onClick={() => onCopy(generateNpmWebAppSnippet(), "Original workflow copied")}
          >
            <CopyIcon className="h-3.5 w-3.5 mr-1" />
            Copy Original
          </Button>
        </div>
        <pre className="p-4 bg-black text-white rounded-md overflow-x-auto text-sm">
          {generateNpmWebAppSnippet()}
        </pre>
      </div>
    </div>
  );
};

export default DiffSnippetTab;
