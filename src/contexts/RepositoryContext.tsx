import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { Repository } from '@/types/repository';
import { useCILocalStorage } from '@/hooks/useCILocalStorage';

/**
 * Type for package manager types supported by the system
 */
export type PackageManagerType = 'npm' | 'maven' | 'both';

/**
 * Interface defining the shape of the repository context
 */
interface RepositoryContextType {
  /** Array of repositories */
  repositories: Repository[];
  /** Function to update a repository's status */
  updateRepositoryStatus: (repoName: string, packageType: PackageManagerType) => void;
  /** Function to add a new repository */
  addRepository: (repository: Repository) => void;
  /** Function to remove a repository */
  removeRepository: (repoName: string) => void;
  /** Function to check if a repository exists */
  hasRepository: (repoName: string) => boolean;
}

/**
 * Create the repository context with undefined as initial value
 */
const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

/**
 * Custom hook to use the repository context
 * @throws {Error} If used outside of RepositoryProvider
 */
export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};

/**
 * Props for the RepositoryProvider component
 */
interface RepositoryProviderProps {
  /** Child components to be wrapped by the provider */
  children: ReactNode;
}

/**
 * Provider component for repository context
 */
export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({ children }) => {
  const { repositories, updateRepositoryStatus, addRepository, removeRepository } = useCILocalStorage();

  /**
   * Check if a repository exists by name
   */
  const hasRepository = useCallback((repoName: string): boolean => {
    return repositories.some(repo => repo.name === repoName);
  }, [repositories]);

  /**
   * Validate and update repository status
   */
  const handleUpdateRepositoryStatus = useCallback((repoName: string, packageType: PackageManagerType) => {
    if (!hasRepository(repoName)) {
      console.warn(`Repository ${repoName} not found. Status update skipped.`);
      return;
    }
    updateRepositoryStatus(repoName, packageType);
  }, [hasRepository, updateRepositoryStatus]);

  /**
   * Validate and add a new repository
   */
  const handleAddRepository = useCallback((repository: Repository) => {
    if (hasRepository(repository.name)) {
      console.warn(`Repository ${repository.name} already exists. Add operation skipped.`);
      return;
    }
    addRepository(repository);
  }, [hasRepository, addRepository]);

  /**
   * Validate and remove a repository
   */
  const handleRemoveRepository = useCallback((repoName: string) => {
    if (!hasRepository(repoName)) {
      console.warn(`Repository ${repoName} not found. Remove operation skipped.`);
      return;
    }
    removeRepository(repoName);
  }, [hasRepository, removeRepository]);

  const value = {
    repositories,
    updateRepositoryStatus: handleUpdateRepositoryStatus,
    addRepository: handleAddRepository,
    removeRepository: handleRemoveRepository,
    hasRepository
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}; 