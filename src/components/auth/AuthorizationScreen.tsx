
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Button from '@/components/Button';

interface AuthorizationScreenProps {
  onAuthorize: () => void;
  onSkipOrgPermissions?: () => void;
  onCancel: () => void;
}

const AuthorizationScreen: React.FC<AuthorizationScreenProps> = ({ 
  onAuthorize, 
  onSkipOrgPermissions,
  onCancel 
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-muted p-4">
        <p className="text-sm text-muted-foreground">
          Connect your GitHub account to import and configure your repositories. 
          You'll be redirected to GitHub to authorize access.
        </p>
      </div>
      
      <div className="rounded-md border p-4">
        <div className="mb-2 flex items-center gap-2">
          <Github className="h-5 w-5" />
          <h3 className="font-medium">GitHub Access Permissions</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          This app will request permission to:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Read your organizations and repositories</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Set up CI workflows and deployment settings</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Access repository content for builds</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col space-y-2 pt-4">
        <Button
          onClick={onAuthorize}
          className="w-full justify-center"
          icon={<Github className="h-4 w-4" />}
        >
          Authorize with Full Access
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        
        {onSkipOrgPermissions && (
          <Button
            onClick={onSkipOrgPermissions}
            variant="outline"
            className="w-full justify-center"
          >
            Continue without Organization Access
          </Button>
        )}
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full justify-center"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AuthorizationScreen;
