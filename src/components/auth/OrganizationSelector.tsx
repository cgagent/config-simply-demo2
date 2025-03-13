
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Button from '@/components/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// GitHub organizations data type
export interface GithubOrg {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface OrganizationSelectorProps {
  githubOrgs: GithubOrg[];
  onOrgSelect: (org: GithubOrg) => void;
  onBack: () => void;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  githubOrgs,
  onOrgSelect,
  onBack,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select the organization you want to connect:</p>
      
      <RadioGroup>
        {githubOrgs.map(org => (
          <div 
            key={org.id}
            className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
            onClick={() => onOrgSelect(org)}
          >
            <RadioGroupItem value={org.id} id={`org-${org.id}`} className="mr-2" />
            <Label htmlFor={`org-${org.id}`} className="flex-1 cursor-pointer">{org.name}</Label>
            {org.isAdmin ? (
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Admin</span>
            ) : (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">Member</span>
            )}
          </div>
        ))}
      </RadioGroup>
      
      <Button
        onClick={onBack}
        variant="outline"
        className="w-full justify-center mt-2"
        icon={<ChevronLeft className="h-4 w-4" />}
      >
        Back
      </Button>
    </div>
  );
};

export default OrganizationSelector;
