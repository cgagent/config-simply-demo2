import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Repository } from '@/types/repository';

// Create the initial repositories data
const initialRepositories: Repository[] = [
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
];

interface RepositoryContextType {
  repositories: Repository[];
  updateRepositoryStatus: (repoName: string, packageType: string) => void;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};

interface RepositoryProviderProps {
  children: ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories);

  const updateRepositoryStatus = (repoName: string, packageType: string) => {
    console.log(`Updating repository ${repoName} with package type ${packageType}`);
    
    setRepositories(prevRepositories => 
      prevRepositories.map(repo => {
        if (repo.name === repoName) {
          // Create or update packageTypeStatus object
          const updatedPackageTypeStatus = {
            ...(repo.packageTypeStatus || {}),
            [packageType]: true
          };
          
          return {
            ...repo,
            isConfigured: true,
            packageTypes: repo.packageTypes.includes(packageType) 
              ? repo.packageTypes 
              : [...repo.packageTypes, packageType],
            packageTypeStatus: updatedPackageTypeStatus,
            // Add a workflow if there isn't one
            workflows: repo.workflows.length > 0 ? repo.workflows : [
              {
                id: `w${Date.now()}`,
                name: 'workflow-npm.yml',
                status: 'active',
                buildNumber: 1,
                lastRun: 'Just now',
                packageTypes: [packageType]
              }
            ]
          };
        }
        return repo;
      })
    );
  };

  const value = {
    repositories,
    updateRepositoryStatus
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}; 