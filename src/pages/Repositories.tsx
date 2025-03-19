
import React, { useState } from 'react';
import RepositoryHeader from '@/components/RepositoryHeader';
import RepositoryList from '@/components/RepositoryList';
import StatusSummary from '@/components/StatusSummary';
import { Repository } from '@/types/repository';

interface Organization {
  id: string;
  name: string;
}

const RepositoriesPage: React.FC = () => {
  // Reduced git repositories to just 3 with different configuration statuses
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: '1',
      name: 'infrastructure',
      owner: 'dev-team',
      orgName: 'Development Team',
      language: 'YAML',
      lastUpdated: '12 days ago',
      packageTypes: [],
      isConfigured: false,
      workflows: []
    },
    {
      id: '2',
      name: 'frontend-app',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      language: 'TypeScript',
      lastUpdated: '2 days ago',
      packageTypes: ['npm', 'docker'],
      isConfigured: true,
      packageTypeStatus: {
        'npm': true,
        'docker': true
  
      },
      workflows: [
        { 
          id: 'w1', 
          name: 'CI/CD Pipeline', 
          status: 'active', 
          buildNumber: 245,
          lastRun: '2 days ago',
          packageTypes: ['npm']
        },
        { 
          id: 'w2', 
          name: 'Test Suite', 
          status: 'active',
          buildNumber: 244,
          lastRun: '3 days ago',
          packageTypes: ['npm', 'docker']
        }
      ]
    },
    {
      id: '3',
      name: 'backend-api',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      language: 'JavaScript',
      lastUpdated: '5 days ago',
      packageTypes: ['npm', 'python', 'docker'],
      isConfigured: true,
      packageTypeStatus: {
        'npm': true,
        'python': true,
        'docker': true
      },
      workflows: [
        { 
          id: 'w3', 
          name: 'Database Migrations', 
          status: 'active',
          buildNumber: 76,
          lastRun: '5 days ago',
          packageTypes: ['npm', 'python', 'docker']
        }
      ]
    }
  ]);

  // Mock organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 'org1', name: 'ACME Organization' },
    { id: 'org2', name: 'Development Team' },
    { id: 'org3', name: 'Personal Account' }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  
  const handleConfigureRepository = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  // Calculate summary statistics
  const totalRepos = repositories.length;
  const configuredRepos = repositories.filter(repo => repo.isConfigured).length;

  return (
    <div className="p-6">
      <div className="animate-fadeIn">
        <RepositoryHeader 
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
        
        <div className="flex flex-col gap-4 mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
