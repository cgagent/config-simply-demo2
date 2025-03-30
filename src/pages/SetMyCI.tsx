
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AIConfigurationChat from '@/components/ai-configuration/AIConfigurationChat';

const SetMyCI = () => {
  const navigate = useNavigate();
  
  // Handle going back to previous page
  const handleGoBack = () => {
    navigate('/home');
  };

  // Handle successful merge
  const handleMergeSuccess = (repoName: string, packageType: string) => {
    console.log(`Successfully merged CI configuration for ${repoName} with ${packageType}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 mt-8">
        <div className="animate-fadeIn">
          <div className="flex items-center mb-3">
            <Button 
              variant="outline" 
              className="mr-2 text-gray-700 border-gray-300 py-1 px-2 h-7" 
              onClick={handleGoBack}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              Set My CI
            </h1>
          </div>

          {/* Chat-based CI Setup Flow */}
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm mb-3">
                Chat with our assistant to set up your CI pipeline with JFrog integration.
              </p>
              
              <div className="h-[600px] border border-gray-200 rounded-lg bg-gray-50 overflow-hidden flex flex-col">
                <AIConfigurationChat 
                  repositoryName="infrastructure" 
                  onMergeSuccess={handleMergeSuccess} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SetMyCI;
