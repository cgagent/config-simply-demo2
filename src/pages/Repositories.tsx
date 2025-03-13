import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import RepositoryHeader from '@/components/RepositoryHeader';
import RepositoryList from '@/components/RepositoryList';
import { Repository, commonPackageTypes } from '@/types/repository';

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
        'docker': true,
        'python': false
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <RepositoryHeader 
            organizations={organizations}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
          />
          
          <div className="mt-6">
            <RepositoryList 
              repositories={repositories}
              onConfigureRepository={handleConfigureRepository}
              organizations={organizations}
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepositoriesPage;
