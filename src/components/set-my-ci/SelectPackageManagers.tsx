
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
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-gray-900">Step 2: Select Package Managers</h2>
      <p className="text-gray-700 text-sm mb-3">
        Choose the package managers used in your project.
      </p>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {packageManagers.map((pkg) => (
          <div 
            key={pkg.id}
            className={`flex items-center border rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedPackages.includes(pkg.id) 
                ? 'border-gray-600 bg-gray-100 ring-1 ring-gray-400/30 shadow-sm' 
                : 'border-gray-300'
            }`}
            onClick={() => onTogglePackage(pkg.id)}
          >
            <Package className="h-5 w-5 mr-2 text-gray-700" />
            <span className="font-medium text-sm text-gray-800">{pkg.name}</span>
            {selectedPackages.includes(pkg.id) && (
              <Check className="h-4 w-4 ml-auto text-gray-700" />
            )}
          </div>
        ))}
      </div>
      
      {selectedPackages.length > 0 && (
        <div className="p-2 bg-gray-50 rounded-md border border-gray-300 mb-3">
          <h3 className="text-sm font-medium mb-1 text-gray-800">Selected:</h3>
          <div className="flex flex-wrap gap-1">
            {selectedPackages.map((pkg) => {
              const manager = packageManagers.find(p => p.id === pkg);
              return (
                <Badge key={pkg} variant="secondary" className="flex items-center gap-1 py-0.5 px-2 bg-gray-200 text-gray-800 border border-gray-400 text-xs">
                  <Package className="h-3 w-3" />
                  {manager?.name || pkg}
                  <button 
                    className="ml-1 hover:text-destructive text-sm font-medium"
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
