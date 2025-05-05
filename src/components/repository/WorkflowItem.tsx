import React from 'react';
import { Workflow } from '@/types/repository';
import { PlayCircle, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkflowItemProps {
  workflow: Workflow;
}

const WorkflowItem: React.FC<WorkflowItemProps> = ({ workflow }) => {
  return (
    <div className="grid grid-cols-12 gap-2 px-6 py-3 border-t border-border/50 pl-10">
      <div className="col-span-5 flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{workflow.name}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-6">
            / #{workflow.buildNumber || '-'}
          </span>
        </div>
      </div>
      
      <div className="col-span-2 flex justify-center items-center">
        {workflow.packageTypes && workflow.packageTypes.length > 0 ? (
          <div className="flex gap-1 flex-wrap">
            {workflow.packageTypes.map((type, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="text-xs bg-secondary text-secondary-foreground"
              >
                <Package className="h-3 w-3 mr-1" />
                {type}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )}
      </div>
      
      <div className="col-span-2 flex justify-center items-center">
        <span className="text-sm text-muted-foreground">{workflow.lastRun || '-'}</span>
      </div>
      
      <div className="col-span-2 flex justify-center items-center">
        <span className={`px-2 py-0.5 text-xs rounded-full ${
          workflow.status === 'active' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          {workflow.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
};

export default WorkflowItem;
