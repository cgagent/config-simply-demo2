
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
          icon: <Github className="h-7 w-7" />
        },
        {
          title: "Create or edit workflow file",
          description: "Navigate to the .github/workflows directory in your repository. Create a new file (e.g., jfrog-integration.yml) or edit an existing workflow file.",
          icon: <FileCode className="h-7 w-7" />
        },
        {
          title: "Add the JFrog setup snippet",
          description: "Paste the JFrog setup snippet from the previous step into your workflow file.",
          icon: <Code className="h-7 w-7" />
        },
        {
          title: "Add package-specific configurations",
          description: "Add the package-specific configurations for your selected package managers.",
          icon: <FileCode className="h-7 w-7" />
        },
        {
          title: "Commit and push changes",
          description: "Commit the changes to your workflow file and push them to your repository.",
          icon: <GitBranchPlus className="h-7 w-7" />
        },
        {
          title: "Verify the integration",
          description: "Run your workflow and check that JFrog is properly integrated.",
          icon: <CheckCircle2 className="h-7 w-7" />
        }
      ]
    : [
        {
          title: "Access your CI system",
          description: "Log in to your CI system (Jenkins, CircleCI, GitLab CI, etc.).",
          icon: <Code className="h-7 w-7" />
        },
        {
          title: "Edit CI configuration",
          description: "Navigate to your project's CI configuration and edit it.",
          icon: <FileCode className="h-7 w-7" />
        },
        {
          title: "Add JFrog environment variables",
          description: "Define environment variables for JFrog authentication (JFROG_USER, JFROG_PASSWORD).",
          icon: <Code className="h-7 w-7" />
        },
        {
          title: "Add the JFrog setup snippet",
          description: "Paste the JFrog setup snippet from the previous step into your CI configuration.",
          icon: <FileCode className="h-7 w-7" />
        },
        {
          title: "Add package-specific configurations",
          description: "Add the package-specific configurations for your selected package managers.",
          icon: <Code className="h-7 w-7" />
        },
        {
          title: "Save and run your CI pipeline",
          description: "Save your configuration changes and run your CI pipeline to verify the integration.",
          icon: <CheckCircle2 className="h-7 w-7" />
        }
      ];

  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 4: Implementation Guide</h2>
      <p className="text-muted-foreground mb-6">
        Follow these steps to implement the JFrog integration in your {selectedCI === 'github' ? 'GitHub Actions' : 'CI system'}.
      </p>
      
      <div className="space-y-6 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
              {step.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{index + 1}. {step.title}</h3>
              <p className="text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">Success!</h3>
            <p className="text-green-700">
              You've successfully configured JFrog for your {selectedCI === 'github' ? 'GitHub Actions' : 'CI system'} with 
              {selectedPackages.length > 0 ? ` ${selectedPackages.join(', ')}` : ' your selected package managers'}.
              Your CI pipeline is now enhanced with JFrog's artifact management capabilities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={onFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ImplementationGuide;
