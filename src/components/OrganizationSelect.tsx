
import React from 'react';
import { Github, ChevronDown } from 'lucide-react';
import Button from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Organization {
  id: string;
  name: string;
}

interface OrganizationSelectProps {
  organizations: Organization[];
  selectedOrg: Organization;
  setSelectedOrg: (org: Organization) => void;
  className?: string;
}

const OrganizationSelect: React.FC<OrganizationSelectProps> = ({
  organizations,
  selectedOrg,
  setSelectedOrg,
  className
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn("gap-2", className)}
        >
          <Github className="h-4 w-4" />
          {selectedOrg.name}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-2 pt-2 pb-1 text-sm font-medium text-muted-foreground">
          Organizations
        </div>
        <Separator className="my-1" />
        {organizations.map(org => (
          <DropdownMenuItem 
            key={org.id} 
            onClick={() => setSelectedOrg(org)}
            className={cn(
              "cursor-pointer",
              selectedOrg.id === org.id && "bg-primary/10 text-primary"
            )}
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationSelect;
