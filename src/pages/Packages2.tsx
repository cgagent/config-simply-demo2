
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import PackageAIChat from '@/components/package/PackageAIChat';
import { Package } from '@/types/package';

const Packages2: React.FC = () => {
  // Mock packages data with specified package types: npm, Docker, Maven, Python, Debian
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'core-library',
      type: 'npm',
      createdAt: '2023-10-12T10:00:00Z',
      vulnerabilities: 0,
      downloads: 45320,
      size: 1024 * 1024 * 2.5, // 2.5 MB
    },
    {
      id: '2',
      name: 'api-client',
      type: 'npm',
      createdAt: '2023-11-05T15:30:00Z',
      vulnerabilities: 2,
      downloads: 28950,
      size: 1024 * 1024 * 1.8, // 1.8 MB
    },
    {
      id: '3',
      name: 'ui-components',
      type: 'npm',
      createdAt: '2023-09-18T09:15:00Z',
      vulnerabilities: 1,
      downloads: 67840,
      size: 1024 * 1024 * 4.2, // 4.2 MB
    },
    {
      id: '4',
      name: 'backend-service',
      type: 'docker',
      createdAt: '2023-12-01T11:45:00Z',
      vulnerabilities: 3,
      downloads: 12450,
      size: 1024 * 1024 * 650, // 650 MB
    },
    {
      id: '5',
      name: 'data-processor',
      type: 'docker',
      createdAt: '2023-08-28T14:20:00Z',
      vulnerabilities: 0,
      downloads: 8760,
      size: 1024 * 1024 * 450, // 450 MB
    },
    {
      id: '6',
      name: 'auth-module',
      type: 'npm',
      createdAt: '2023-10-30T13:10:00Z',
      vulnerabilities: 0,
      downloads: 34280,
      size: 1024 * 1024 * 0.9, // 0.9 MB
    },
    {
      id: '7',
      name: 'analytics-tools',
      type: 'python',
      createdAt: '2023-11-15T10:25:00Z',
      vulnerabilities: 1,
      downloads: 5620,
      size: 1024 * 1024 * 3.6, // 3.6 MB
    },
    {
      id: '8',
      name: 'logging-service',
      type: 'npm',
      createdAt: '2023-07-20T08:45:00Z',
      vulnerabilities: 4,
      downloads: 23470,
      size: 1024 * 1024 * 1.2, // 1.2 MB
    },
    {
      id: '9',
      name: 'database-connector',
      type: 'maven',
      createdAt: '2023-09-05T16:30:00Z',
      vulnerabilities: 2,
      downloads: 18920,
      size: 1024 * 1024 * 5.7, // 5.7 MB
    },
    {
      id: '10',
      name: 'monitoring-agent',
      type: 'docker',
      createdAt: '2023-11-28T11:20:00Z',
      vulnerabilities: 0,
      downloads: 7830,
      size: 1024 * 1024 * 380, // 380 MB
    },
    {
      id: '11',
      name: 'ci-toolkit',
      type: 'debian',
      createdAt: '2023-08-15T09:10:00Z',
      vulnerabilities: 3,
      downloads: 14750,
      size: 1024 * 1024 * 2.3, // 2.3 MB
    },
    {
      id: '12',
      name: 'search-engine',
      type: 'docker',
      createdAt: '2023-10-08T14:15:00Z',
      vulnerabilities: 1,
      downloads: 15680,
      size: 1024 * 1024 * 850, // 850 MB
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs font-medium">Packages AI</span>
          </div>
          <h1 className="text-3xl font-bold mb-6">Package Management (AI Chat)</h1>
          
          <PackageAIChat packages={packages} />
        </div>
      </main>
    </div>
  );
};

export default Packages2;
