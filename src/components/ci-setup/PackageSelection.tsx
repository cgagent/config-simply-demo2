
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PackageSelectionProps {
  selectedPackages: string[];
  onPackageSelection: (packageName: string) => void;
  onContinue: () => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({ 
  selectedPackages, 
  onPackageSelection, 
  onContinue 
}) => {
  return (
    <div className="mb-4 mt-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {["Docker", "Python", "npm", "Maven", "Go", "Nuget"].map((pkg) => (
          <Button
            key={pkg}
            variant="outline"
            className={`justify-between ${
              selectedPackages.includes(pkg)
                ? "border-blue-500 bg-blue-950"
                : "bg-blue-900/20"
            }`}
            onClick={() => onPackageSelection(pkg)}
          >
            {pkg}
            {selectedPackages.includes(pkg) && <Check className="h-4 w-4 ml-2" />}
          </Button>
        ))}
      </div>
      <Button
        onClick={onContinue}
        disabled={selectedPackages.length === 0}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Continue
      </Button>
    </div>
  );
};

export default PackageSelection;
