
import React from 'react';
import { Github } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthStageProvider } from './github-flow/AuthStageProvider';
import StageRenderer from './github-flow/StageRenderer';

type GitHubAuthFlowProps = {
  onClose: () => void;
  showDialog: boolean;
  onComplete?: (hasOrgPermissions: boolean) => void;
  skipInitialAuth?: boolean; // New prop to skip initial auth
};

const GitHubAuthFlow: React.FC<GitHubAuthFlowProps> = ({ 
  onClose, 
  showDialog, 
  onComplete,
  skipInitialAuth = false // Default to false if not provided
}) => {
  // Get the appropriate title for the current stage
  const getDialogTitle = () => {
    return "GitHub Integration";
  };
  
  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <AuthStageProvider onClose={onClose}>
            <StageRenderer 
              onClose={onClose} 
              onComplete={onComplete} 
              skipInitialAuth={skipInitialAuth}
            />
          </AuthStageProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubAuthFlow;
