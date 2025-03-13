
import React from 'react';
import RepositorySelector from '../RepositorySelector';
import { useAuthStage } from './AuthStageProvider';
import { githubRepos } from '../githubData';

const RepositoriesStage: React.FC = () => {
  const { 
    selectedOrg, 
    handleBack, 
    selectedRepos, 
    setSelectedRepos,
    selectAll,
    setSelectAll,
    setStage
  } = useAuthStage();
  
  if (!selectedOrg) return null;
  
  // Filter repositories based on selected organization
  const orgRepos = githubRepos.filter(repo => repo.orgName === selectedOrg.name);
  
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
    // Fixed the type error by creating a new object instead of using function
    const updatedRepos = { ...selectedRepos, [repoId]: checked };
    setSelectedRepos(updatedRepos);
    
    // Check if all repositories are selected to update selectAll status
    const allSelected = orgRepos.every(repo => updatedRepos[repo.id]);
    setSelectAll(allSelected);
  };
  
  const handleAuthorize = () => {
    // Move to confirmation after repositories are selected
    setStage('confirmation');
  };
  
  return (
    <RepositorySelector
      selectedOrg={selectedOrg}
      repositories={orgRepos}
      selectedRepos={selectedRepos}
      selectAll={selectAll}
      onRepoSelect={handleRepoSelect}
      onSelectAll={handleSelectAll}
      onComplete={handleAuthorize}
      onBack={handleBack}
    />
  );
};

export default RepositoriesStage;
