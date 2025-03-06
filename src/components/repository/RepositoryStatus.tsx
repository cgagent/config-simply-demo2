
import React from 'react';
import { Check, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RepositoryStatusProps {
  isConfigured: boolean;
  isFullyConfigured: boolean;
  coveragePercentage: number;
  missingPackageTypes: string[];
  onConfigure: (e: React.MouseEvent) => void;
}

const RepositoryStatus: React.FC<RepositoryStatusProps> = ({
  isConfigured,
  isFullyConfigured,
  coveragePercentage,
  missingPackageTypes,
  onConfigure
}) => {
  if (!isConfigured) {
    return (
      <Button 
        variant="default"
        size="sm"
        onClick={onConfigure}
        className="text-sm flex items-center gap-2"
      >
        <Cog className="h-4 w-4" />
        Configure
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {isFullyConfigured ? (
              <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <Check className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs font-medium">Configured</span>
              </div>
            ) : (
              <div className="w-full max-w-24">
                <div className="flex justify-between text-xs mb-1">
                  <span>{coveragePercentage}%</span>
                </div>
                <Progress value={coveragePercentage} className="h-1.5" />
              </div>
            )}
            {isFullyConfigured ? (
              <Button
                variant="outline"
                size="icon"
                onClick={onConfigure}
                className="h-8 w-8"
                title="Manage Configuration"
              >
                <Cog className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onConfigure}
                className="ml-2"
              >
                <Cog className="h-4 w-4 mr-2" />
                Configure
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {missingPackageTypes.length > 0 ? (
            <div className="text-xs">
              <p>Missing package types:</p>
              <ul className="list-disc pl-4 mt-1">
                {missingPackageTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs">All package types connected</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RepositoryStatus;
