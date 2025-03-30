
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Github, Code, FileCode, GitBranchPlus, CheckCircle2 } from 'lucide-react';

interface ImplementationGuideProps {
  selectedCI: 'github' | 'other';
  selectedPackages: string[];
  onPreviousStep: () => void;
  onFinish: () => void;
}

const ImplementationGuide: React.FC<ImplementationGuideProps> = ({
  selectedCI,
  selectedPackages,
  onFinish
}) => {
  const steps = selectedCI === 'github' 
    ? [
        {
          title: "Navigate to your GitHub repository",
          description: "Go to your GitHub repository in a web browser.",
          icon: <Github className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Create or edit workflow file",
          description: "Navigate to .github/workflows and create a new file or edit an existing one.",
          icon: <FileCode className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Add the JFrog setup snippet",
          description: "Paste the JFrog setup snippet from the previous step.",
          icon: <Code className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Add package configurations",
          description: "Add the package-specific configurations for your selected package managers.",
          icon: <FileCode className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Commit and push changes",
          description: "Commit the changes and push them to your repository.",
          icon: <GitBranchPlus className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Verify the integration",
          description: "Run your workflow and check that JFrog is properly integrated.",
          icon: <CheckCircle2 className="h-6 w-6 text-gray-700" />
        }
      ]
    : [
        {
          title: "Access your CI system",
          description: "Log in to your CI system (Jenkins, CircleCI, GitLab CI, etc.).",
          icon: <Code className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Edit CI configuration",
          description: "Navigate to your project's CI configuration and edit it.",
          icon: <FileCode className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Add JFrog environment variables",
          description: "Define environment variables for JFrog authentication.",
          icon: <Code className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Add the JFrog setup snippet",
          description: "Paste the JFrog setup snippet from the previous step.",
          icon: <FileCode className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Add package configurations",
          description: "Add the package-specific configurations for your selected package managers.",
          icon: <Code className="h-6 w-6 text-gray-700" />
        },
        {
          title: "Save and run your CI pipeline",
          description: "Save your configuration changes and run your CI pipeline.",
          icon: <CheckCircle2 className="h-6 w-6 text-gray-700" />
        }
      ];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-gray-900">Step 4: Implementation Guide</h2>
      <p className="text-gray-700 text-sm mb-4">
        Follow these steps to implement the JFrog integration in your {selectedCI === 'github' ? 'GitHub Actions' : 'CI system'}.
      </p>
      
      <div className="space-y-4 mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 bg-gray-100 p-2 rounded-full mr-3 border border-gray-300 shadow-sm">
              {step.icon}
            </div>
            <div>
              <h3 className="font-medium text-base text-gray-800">{index + 1}. {step.title}</h3>
              <p className="text-xs text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-300 rounded-md p-3 mb-4 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-2">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-base text-green-800 mb-1">Success!</h3>
            <p className="text-green-700 text-xs">
              You've successfully configured JFrog for your {selectedCI === 'github' ? 'GitHub Actions' : 'CI system'} with 
              {selectedPackages.length > 0 ? ` ${selectedPackages.join(', ')}` : ' your selected package managers'}.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={onFinish} size="sm" className="text-sm px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 shadow-sm">
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ImplementationGuide;
