
import React from 'react';
import { Package } from '@/types/package';
import { packageTypeColors } from '@/types/package';
import { AlertTriangle, MoreHorizontal, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatNumber, formatBytes } from '@/lib/formatters';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PackageListProps {
  packages: Package[];
}

export const PackageList: React.FC<PackageListProps> = ({ packages }) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
      <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-secondary font-medium text-sm">
        <div className="col-span-4">Package Name</div>
        <div className="col-span-2 text-center">Type</div>
        <div className="col-span-2 text-center">Created</div>
        <div className="col-span-1 text-center">Vulnerabilities</div>
        <div className="col-span-2 text-center">Downloads</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>
      
      <div className="divide-y divide-border">
        {packages.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No packages found matching your criteria
          </div>
        ) : (
          packages.map((pkg) => (
            <div key={pkg.id} className="grid grid-cols-12 gap-2 px-6 py-4 hover:bg-secondary/30 transition-colors">
              <div className="col-span-4 flex items-center">
                <span className="font-medium">{pkg.name}</span>
              </div>
              
              <div className="col-span-2 flex justify-center items-center">
                <span 
                  className={cn(
                    "px-2 py-1 text-xs font-medium text-white rounded-full",
                    packageTypeColors[pkg.type] || packageTypeColors.default
                  )}
                >
                  {pkg.type}
                </span>
              </div>
              
              <div className="col-span-2 text-center flex items-center justify-center text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(pkg.createdAt), { addSuffix: true })}
              </div>
              
              <div className="col-span-1 text-center flex items-center justify-center">
                {pkg.vulnerabilities > 0 ? (
                  <div className="flex items-center">
                    <AlertTriangle 
                      className={cn(
                        "mr-1 h-4 w-4",
                        pkg.vulnerabilities > 2 ? "text-red-500" : "text-amber-500"
                      )} 
                    />
                    <span>{pkg.vulnerabilities}</span>
                  </div>
                ) : (
                  <span>0</span>
                )}
              </div>
              
              <div className="col-span-2 text-center flex items-center justify-center text-sm">
                <Download className="mr-1 h-4 w-4 text-muted-foreground" />
                {formatNumber(pkg.downloads)}
              </div>
              
              <div className="col-span-1 text-center flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Copy URL</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
