
import React, { useState } from 'react';
import { GitBranch } from 'lucide-react';
import Button from '@/components/Button';
import OrganizationSelect from './OrganizationSelect';
import GitHubAuthFlow from './auth/GitHubAuthFlow';

interface Organization {
  id: string;
  name: string;
}

interface RepositoryHeaderProps {
  organizations: Organization[];
  selectedOrg: Organization;
  setSelectedOrg: (org: Organization) => void;
  onGitHubConnected?: () => void;
}

const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({
  organizations,
  selectedOrg,
  setSelectedOrg,
  onGitHubConnected
}) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const handleConnectGitHub = () => {
    setShowAuthDialog(true);
  };
  
  const handleCloseAuthDialog = () => {
    setShowAuthDialog(false);
  };

  const handleAuthComplete = () => {
    setShowAuthDialog(false);
    // Notify parent component that GitHub is connected
    if (onGitHubConnected) {
      onGitHubConnected();
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold mt-1">Git Repository Manager</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          icon={<GitBranch className="h-4 w-4" />}
          onClick={handleConnectGitHub}
        >
          Connect Git Repositories
        </Button>
      </div>
      
      {/* GitHub Authentication Flow Dialog */}
      <GitHubAuthFlow 
        showDialog={showAuthDialog} 
        onClose={handleCloseAuthDialog}
        onComplete={handleAuthComplete}
      />
    </div>
  );
};

export default RepositoryHeader;
