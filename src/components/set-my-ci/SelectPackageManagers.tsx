
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
    <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Step 2: Select Package Managers</h2>
      <p className="text-blue-700 text-lg mb-6">
        Choose the package managers used in your project. You can select multiple options.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {packageManagers.map((pkg) => (
          <div 
            key={pkg.id}
            className={`flex items-center border-2 rounded-lg p-5 cursor-pointer hover:bg-blue-50 transition-colors ${
              selectedPackages.includes(pkg.id) 
                ? 'border-blue-600 bg-blue-100 ring-2 ring-blue-400/30 shadow-lg' 
                : 'border-gray-300'
            }`}
            onClick={() => onTogglePackage(pkg.id)}
          >
            <Package className="h-8 w-8 mr-4 text-blue-600" />
            <span className="font-semibold text-lg text-blue-800">{pkg.name}</span>
            {selectedPackages.includes(pkg.id) && (
              <Check className="h-6 w-6 ml-auto text-blue-600" />
            )}
          </div>
        ))}
      </div>
      
      {selectedPackages.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-300 mb-6">
          <h3 className="text-base font-semibold mb-3 text-blue-800">Selected Package Managers:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPackages.map((pkg) => {
              const manager = packageManagers.find(p => p.id === pkg);
              return (
                <Badge key={pkg} variant="secondary" className="flex items-center gap-2 py-1.5 px-3 bg-blue-200 text-blue-800 border border-blue-400 text-sm">
                  <Package className="h-4 w-4" />
                  {manager?.name || pkg}
                  <button 
                    className="ml-1 hover:text-destructive text-lg font-medium"
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
