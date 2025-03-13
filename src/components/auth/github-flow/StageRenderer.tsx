
import React, { useEffect } from 'react';
import { useAuthStage } from './AuthStageProvider';
import InitialAuthStage from './InitialAuthStage';
import OrgPermissionsStage from './OrgPermissionsStage';
import OrganizationStage from './OrganizationStage';
import RepositoriesStage from './RepositoriesStage';
import ConfirmationStage from './ConfirmationStage';

interface StageRendererProps {
  onClose: () => void;
  onComplete?: (hasOrgPermissions: boolean) => void;
  skipInitialAuth?: boolean; // New prop to skip initial auth
}

const StageRenderer: React.FC<StageRendererProps> = ({ 
  onClose, 
  onComplete,
  skipInitialAuth = false
}) => {
  const { stage, setStage } = useAuthStage();
  
  // If skipInitialAuth is true, move directly to requesting org permissions
  useEffect(() => {
    if (skipInitialAuth && stage === 'initial') {
      setStage('requestOrgPermissions');
    }
  }, [skipInitialAuth, stage, setStage]);
  
  switch (stage) {
    case 'initial':
      return <InitialAuthStage onClose={onClose} />;
    case 'requestOrgPermissions':
      return <OrgPermissionsStage onClose={onClose} onComplete={onComplete} />;
    case 'organization':
      return <OrganizationStage />;
    case 'repositories':
      return <RepositoriesStage />;
    case 'confirmation':
      return <ConfirmationStage onClose={onClose} onComplete={onComplete} />;
    default:
      return null;
  }
};

export default StageRenderer;
