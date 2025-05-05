import React, { useState, useEffect } from 'react';
import RepositoryHeader from '@/components/RepositoryHeader';
import RepositoryList from '@/components/RepositoryList';
import StatusSummary from '@/components/StatusSummary';
import { Repository } from '@/types/repository';
import { useRepositories } from '@/contexts/RepositoryContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
}

const RepositoriesPage: React.FC = () => {
  // Use the shared repository context
  const { repositories, addRepository, updateRepositoryStatus } = useRepositories();

  // Force reset infrastructure repository on initial page load
  useEffect(() => {
    // On component mount, force reload repository configuration from localStorage
    try {
      const repoData = localStorage.getItem('ci_repositories');
      if (repoData) {
        console.log('Repositories page: Checking infrastructure repository status');
        const repos = JSON.parse(repoData);
        const infraRepo = repos.find(repo => repo.name === 'infrastructure');
        
        // If infrastructure is found in localStorage and it's configured,
        // force update the UI without changing localStorage
        if (infraRepo && infraRepo.isConfigured) {
          console.log('Repositories page: Infrastructure repository is configured');
          
          // Set a flag in sessionStorage to indicate we've seen the configured state
          sessionStorage.setItem('infrastructure_configured', 'true');
          
          // Force a window reload if coming from CI configuration flow
          const fromCIConfig = sessionStorage.getItem('from_ci_config');
          if (fromCIConfig === 'true') {
            console.log('Coming from CI config, resetting flag');
            sessionStorage.removeItem('from_ci_config');
            // No need to reload, just update if needed
          }
        }
      }
    } catch (error) {
      console.error('Error checking repository status:', error);
    }
  }, []);

  // Mock organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 'org1', name: 'ACME Organization' },
    { id: 'org2', name: 'Development Team' },
    { id: 'org3', name: 'Personal Account' }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  
  const handleConfigureRepository = (repo: Repository) => {
    // When configuring a repository, set a flag to indicate we're going to CI config
    sessionStorage.setItem('from_ci_config', 'true');
    setSelectedRepo(repo);
  };

  const handleAddRepository = () => {
    // Add a sample repository for demonstration
    addRepository({
      id: Date.now().toString(),
      name: 'new-repository',
      owner: selectedOrg.name,
      orgName: selectedOrg.name,
      language: 'TypeScript',
      lastUpdated: 'Just now',
      packageTypes: [],
      isConfigured: false,
      workflows: []
    });
  };

  // Calculate summary statistics
  const totalRepos = repositories.length;
  const configuredRepos = repositories.filter(repo => repo.isConfigured).length;

  return (
    <div className="p-6">
      <div className="animate-fadeIn max-w-[1200px] mx-auto w-full">
        <RepositoryHeader 
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
        
        <div className="flex flex-col gap-4 mt-4">
          {repositories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">No Repositories Yet</h3>
              <p className="text-muted-foreground mb-4">Add your first repository to get started with CI configuration</p>
              <Button onClick={handleAddRepository}>
                <Plus className="w-4 h-4 mr-2" />
                Add Repository
              </Button>
            </div>
          ) : (
            <>
              <StatusSummary 
                totalRepos={totalRepos}
                configuredRepos={configuredRepos}
              />
              
              <RepositoryList 
                repositories={repositories}
                onConfigureRepository={handleConfigureRepository}
                organizations={organizations}
                selectedOrg={selectedOrg}
                setSelectedOrg={setSelectedOrg}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
