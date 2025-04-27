import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface DistributePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  onDistribute: () => void;
}

export const DistributePackageModal: React.FC<DistributePackageModalProps> = ({
  isOpen,
  onClose,
  packageName,
  onDistribute
}) => {
  const [isDistributing, setIsDistributing] = useState(false);

  const handleDistribute = () => {
    setIsDistributing(true);
    
    // Simulate a slight delay to show processing
    setTimeout(() => {
      onDistribute();
      setIsDistributing(false);
      onClose();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-blue-950/90 border border-blue-800/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-blue-100">Distribute Package</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            Would you like to distribute the package <span className="font-medium text-blue-200">{packageName}</span> to external repositories?
          </p>
          <p className="text-sm text-blue-300">
            This action will make the package available to users outside your organization.
          </p>
          <div className="mt-4 text-xs text-blue-400">
            <p>After distribution, the package will be:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Available in public repositories</li>
              <li>Accessible without authentication</li> 
              <li>Marked as "External Distributed: Yes"</li>
            </ul>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isDistributing}
            className="bg-transparent border border-blue-600 text-blue-100 hover:bg-blue-800/20"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDistribute}
            disabled={isDistributing}
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            {isDistributing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Distribute Package'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 