import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRepositories } from './RepositoryContext';

interface StatisticsContextType {
  ciCompletionPercentage: number;
  blockedPackages: number;
  totalPackages: number;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { repositories, packageStats } = useRepositories();
  
  // Calculate statistics
  const totalRepos = repositories.length;
  const configuredRepos = repositories.filter(repo => repo.isConfigured).length;
  const ciCompletionPercentage = totalRepos > 0 ? Math.round((configuredRepos / totalRepos) * 100) : 0;

  const value = {
    ciCompletionPercentage,
    totalPackages: packageStats.totalPackages,
    blockedPackages: packageStats.blockedPackages,
  };

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
}; 