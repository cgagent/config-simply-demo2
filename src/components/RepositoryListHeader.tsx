
import React from 'react';
import { GitBranch } from 'lucide-react';
import Search from './Search';
import RepositoryFilter from './RepositoryFilter';
import OrganizationSelect from './OrganizationSelect';

interface Organization {
  id: string;
  name: string;
}

interface RepositoryListHeaderProps {
  onSearch: (term: string) => void;
  filter: 'all' | 'configured' | 'not-configured';
  onFilterChange: (filter: 'all' | 'configured' | 'not-configured') => void;
  organizations?: Organization[];
  selectedOrg?: Organization;
  setSelectedOrg?: (org: Organization) => void;
}

const RepositoryListHeader: React.FC<RepositoryListHeaderProps> = ({ 
  onSearch, 
  filter, 
  onFilterChange,
  organizations,
  selectedOrg,
  setSelectedOrg
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
      <div className="flex items-center gap-2">
        <GitBranch className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Git Repositories</h2>
        {organizations && selectedOrg && setSelectedOrg && (
          <OrganizationSelect 
            organizations={organizations}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
            className="ml-2"
          />
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Search 
          onSearch={onSearch} 
          className="w-full sm:w-64"
        />
        
        <RepositoryFilter 
          filter={filter} 
          onFilterChange={onFilterChange} 
        />
      </div>
    </div>
  );
};

export default RepositoryListHeader;
