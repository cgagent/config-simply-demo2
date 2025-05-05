import React, { useEffect } from 'react';
import { AIConfigurationChat } from '@/components/ai-configuration';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRepositories, PackageManagerType } from '@/contexts/RepositoryContext';
import { useToast } from '@/hooks/use-toast';

const CIConfigurationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use the shared repository context
  const { repositories, updateRepositoryStatus } = useRepositories();
  
  // Get repository name from location state
  const repositoryName = location.state?.repositoryName || 'infrastructure';
  
  // Use the shared repository update function
  const handleMergeSuccess = (repoName: string, packageType: PackageManagerType) => {
    // Get the current repository state
    const currentRepo = repositories.find(repo => repo.name === repoName);
    
    // Log the repository state for debugging
    console.log('Repository before update:', currentRepo);
    console.log(`Updating repository ${repoName} with package type ${packageType}`);
    
    // Always update the status - the animation and state tracking is handled in the context
    updateRepositoryStatus(repoName, packageType);
    
    // No toast notification needed
  };

  return (
    <motion.div 
      className="flex flex-col h-[calc(100vh-96px)] px-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-white max-w-[1200px] mx-auto w-full"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        CI Configuration
      </motion.h1>
      
      <motion.div 
        className="flex-1 bg-card rounded-xl overflow-hidden shadow-lg mb-6 mx-auto max-w-[1200px] w-full"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-full">
          <AIConfigurationChat 
            repositoryName={repositoryName} 
            onMergeSuccess={handleMergeSuccess}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CIConfigurationPage;
