
import React from 'react';
import { Package, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SelectPackageManagersProps {
  selectedPackages: string[];
  onTogglePackage: (packageType: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  canProceed: boolean;
}

const packageManagers = [
  { id: 'docker', name: 'Docker' },
  { id: 'npm', name: 'npm' },
  { id: 'nuget', name: 'NuGet' },
  { id: 'python', name: 'Python' },
  { id: 'maven', name: 'Maven' },
  { id: 'go', name: 'Go' }
];

const SelectPackageManagers: React.FC<SelectPackageManagersProps> = ({
  selectedPackages,
  onTogglePackage
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 2: Select Package Managers</h2>
      <p className="text-muted-foreground mb-6">
        Choose the package managers used in your project. You can select multiple options.
      </p>
      
      <div className="space-y-3 mb-6">
        {packageManagers.map((pkg) => (
          <div 
            key={pkg.id}
            className={`flex items-center border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors ${
              selectedPackages.includes(pkg.id) 
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                : 'border-border'
            }`}
            onClick={() => onTogglePackage(pkg.id)}
          >
            <Package className="h-5 w-5 mr-3" />
            <span className="font-medium">{pkg.name}</span>
            {selectedPackages.includes(pkg.id) && (
              <Check className="h-4 w-4 ml-auto text-primary" />
            )}
          </div>
        ))}
      </div>
      
      {selectedPackages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Selected Package Managers:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPackages.map((pkg) => {
              const manager = packageManagers.find(p => p.id === pkg);
              return (
                <Badge key={pkg} variant="secondary" className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {manager?.name || pkg}
                  <button 
                    className="ml-1 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePackage(pkg);
                    }}
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPackageManagers;
