
import React from 'react';
import { cn } from '@/lib/utils';
import { Package, Package2, Download, AlertTriangle } from 'lucide-react';
import { formatNumber, formatBytes } from '@/lib/formatters';

interface PackageSummaryProps {
  totalPackages: number;
  totalConsumption: number;
  totalStorage: number;
  maliciousPackages: number;
  className?: string;
}

export const PackageSummary: React.FC<PackageSummaryProps> = ({
  totalPackages,
  totalConsumption,
  totalStorage,
  maliciousPackages,
  className
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
      className
    )}>
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
            <p className="text-2xl font-semibold mt-1">{totalPackages}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Consumption</p>
            <p className="text-2xl font-semibold mt-1">{formatNumber(totalConsumption)}</p>
          </div>
          <div className="p-2 bg-emerald-100 rounded-full">
            <Download className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
            <p className="text-2xl font-semibold mt-1">{formatBytes(totalStorage)}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-full">
            <Package2 className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Malicious Packages</p>
            <p className="text-2xl font-semibold mt-1">{maliciousPackages}</p>
          </div>
          <div className="p-2 bg-amber-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
