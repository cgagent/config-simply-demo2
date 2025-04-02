import { useState, useEffect, useCallback } from 'react';
import { Repository, PackageType, Workflow, SupportedLanguage } from '@/types/repository';

const STORAGE_KEY = 'ci_repositories';

/**
 * Creates an empty package type status record
 */
const createEmptyPackageTypeStatus = (): Record<PackageType, boolean> => ({
  npm: false,
  maven: false,
  docker: false,
  python: false,
  debian: false,
  rpm: false
});

/**
 * Default demo repositories for initial state
 */
const defaultRepositories: Repository[] = [
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
      current: {
        ...createEmptyPackageTypeStatus(),
        npm: true,
        docker: true
      },
      previous: createEmptyPackageTypeStatus(),
      showTransition: false
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
      current: {
        ...createEmptyPackageTypeStatus(),
        npm: true,
        python: true,
        docker: true
      },
      previous: createEmptyPackageTypeStatus(),
      showTransition: false
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

/**
 * Custom hook for managing CI repository data in localStorage
 */
export const useCILocalStorage = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultRepositories;
    } catch (error) {
      console.error('Error loading repositories from localStorage:', error);
      return defaultRepositories;
    }
  });

  // Save to localStorage whenever repositories change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(repositories));
    } catch (error) {
      console.error('Error saving repositories to localStorage:', error);
    }
  }, [repositories]);

  /**
   * Creates a new workflow for a package type
   */
  const createWorkflow = useCallback((packageType: PackageType): Workflow => ({
    id: `w${Date.now()}`,
    name: `workflow-${packageType}.yml`,
    status: 'active',
    buildNumber: 1,
    lastRun: 'Just now',
    packageTypes: [packageType]
  }), []);

  /**
   * Updates the status of a repository's package type
   */
  const updateRepositoryStatus = useCallback((repoName: string, packageType: PackageType) => {
    setRepositories(prevRepositories => {
      return prevRepositories.map(repo => {
        if (repo.name === repoName) {
          const currentStatus = repo.packageTypeStatus?.current || createEmptyPackageTypeStatus();
          const previousStatus = { ...currentStatus };
          
          // Update current status
          const updatedCurrentStatus = {
            ...currentStatus,
            [packageType]: true
          };
          
          // Update package types array
          const updatedPackageTypes = repo.packageTypes?.includes(packageType)
            ? repo.packageTypes
            : [...(repo.packageTypes || []), packageType];
          
          // Create or update workflows
          const hasWorkflow = repo.workflows?.some(w => w.packageTypes?.includes(packageType));
          const updatedWorkflows = hasWorkflow
            ? repo.workflows
            : [...(repo.workflows || []), createWorkflow(packageType)];
          
          return {
            ...repo,
            isConfigured: true,
            packageTypes: updatedPackageTypes,
            packageTypeStatus: {
              current: updatedCurrentStatus,
              previous: previousStatus,
              showTransition: true
            },
            lastUpdated: 'Today',
            workflows: updatedWorkflows
          };
        }
        return repo;
      });
    });
  }, [createWorkflow]);

  /**
   * Adds a new repository to the list
   */
  const addRepository = useCallback((repository: Repository) => {
    setRepositories(prev => {
      if (prev.some(repo => repo.name === repository.name)) {
        console.warn(`Repository ${repository.name} already exists. Add operation skipped.`);
        return prev;
      }
      return [...prev, repository];
    });
  }, []);

  /**
   * Removes a repository from the list
   */
  const removeRepository = useCallback((repoName: string) => {
    setRepositories(prev => prev.filter(repo => repo.name !== repoName));
  }, []);

  return {
    repositories,
    updateRepositoryStatus,
    addRepository,
    removeRepository
  };
}; 