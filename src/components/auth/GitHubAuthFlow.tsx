
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import OrganizationSelector, { GithubOrg } from './OrganizationSelector';
import RepositorySelector from './RepositorySelector';
import { githubOrgs, githubRepos } from './githubData';

type GitHubAuthFlowProps = {
  onClose: () => void;
  showDialog: boolean;
};

const GitHubAuthFlow: React.FC<GitHubAuthFlowProps> = ({ onClose, showDialog }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stage, setStage] = useState<'organization' | 'repositories'>('organization');
  const [selectedOrg, setSelectedOrg] = useState<GithubOrg | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  
  // Filter repositories based on selected organization
  const orgRepos = selectedOrg 
    ? githubRepos.filter(repo => repo.orgName === selectedOrg.name)
    : [];
  
  const handleOrgSelect = (org: GithubOrg) => {
    setSelectedOrg(org);
    setStage('repositories');
    
    // Reset repository selection when changing organization
    setSelectedRepos({});
    setSelectAll(false);
  };
  
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    
    // Update all repositories' selection status
    const newSelectedRepos: Record<string, boolean> = {};
    orgRepos.forEach(repo => {
      newSelectedRepos[repo.id] = checked;
    });
    setSelectedRepos(newSelectedRepos);
  };
  
  const handleRepoSelect = (repoId: string, checked: boolean) => {
    setSelectedRepos(prev => ({
      ...prev,
      [repoId]: checked
    }));
    
    // Check if all repositories are selected to update selectAll status
    const updatedSelection = {
      ...selectedRepos,
      [repoId]: checked
    };
    
    const allSelected = orgRepos.every(repo => updatedSelection[repo.id]);
    setSelectAll(allSelected);
  };
  
  const handleComplete = () => {
    // Complete the GitHub auth flow
    toast({
      title: "GitHub Authentication Successful",
      description: `Connected to ${selectedOrg?.name} with ${Object.values(selectedRepos).filter(Boolean).length} repositories`,
    });
    
    onClose();
    navigate('/repositories');
  };
  
  const handleBack = () => {
    if (stage === 'repositories') {
      setStage('organization');
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            {stage === 'organization' && "Select GitHub Organization"}
            {stage === 'repositories' && "Select Repositories"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {stage === 'organization' && (
            <OrganizationSelector 
              githubOrgs={githubOrgs}
              onOrgSelect={handleOrgSelect}
              onBack={handleBack}
            />
          )}
          
          {stage === 'repositories' && selectedOrg && (
            <RepositorySelector
              selectedOrg={selectedOrg}
              repositories={orgRepos}
              selectedRepos={selectedRepos}
              selectAll={selectAll}
              onRepoSelect={handleRepoSelect}
              onSelectAll={handleSelectAll}
              onComplete={handleComplete}
              onBack={handleBack}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubAuthFlow;
