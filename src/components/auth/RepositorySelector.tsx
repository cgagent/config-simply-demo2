
import React from 'react';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import Button from '@/components/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { GithubOrg } from './OrganizationSelector';

// GitHub repositories data type
export interface GithubRepo {
  id: string;
  name: string;
  owner: string;
  orgName: string;
}

interface RepositorySelectorProps {
  selectedOrg: GithubOrg;
  repositories: GithubRepo[];
  selectedRepos: Record<string, boolean>;
  selectAll: boolean;
  onRepoSelect: (repoId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  selectedOrg,
  repositories,
  selectedRepos,
  selectAll,
  onRepoSelect,
  onSelectAll,
  onComplete,
  onBack,
}) => {
  const hasSelectedRepos = Object.values(selectedRepos).some(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select repositories from <span className="font-semibold">{selectedOrg.name}</span> to configure:
      </p>
      
      {repositories.length > 0 && (
        <div className="pt-2 pb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={onSelectAll}
            />
            <Label htmlFor="select-all" className="font-medium">Select All Repositories</Label>
          </div>
        </div>
      )}
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {repositories.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No repositories found for this organization</p>
        ) : (
          repositories.map(repo => (
            <div key={repo.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
              <Checkbox
                id={`repo-${repo.id}`}
                checked={selectedRepos[repo.id] || false}
                onCheckedChange={(checked) => onRepoSelect(repo.id, !!checked)}
              />
              <Label htmlFor={`repo-${repo.id}`} className="flex-1 cursor-pointer">
                {repo.name}
              </Label>
            </div>
          ))
        )}
      </div>
      
      <div className="flex flex-col space-y-2 pt-4">
        <Button
          onClick={onComplete}
          className="w-full justify-center group"
          icon={<Check className="h-4 w-4" />}
          disabled={!hasSelectedRepos}
        >
          Complete Setup
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full justify-center"
          icon={<ChevronLeft className="h-4 w-4" />}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default RepositorySelector;
