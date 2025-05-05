import React from 'react';
import CollapsibleStatisticsBar from './CollapsibleStatisticsBar';
import { useStatistics } from '@/contexts/StatisticsContext';

const GlobalStatisticsBar: React.FC = () => {
  const stats = useStatistics();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-2">
      <CollapsibleStatisticsBar 
        ciCompletionPercentage={stats.ciCompletionPercentage}
        blockedPackages={stats.blockedPackages}
        totalPackages={stats.totalPackages}
      />
    </div>
  );
};

export default GlobalStatisticsBar; 