
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Input } from '@/components/ui/input';
import { PackageSummary } from '@/components/package/PackageSummary';
import { PackageList } from '@/components/package/PackageList';
import { PackageSearch } from '@/components/package/PackageSearch';
import { Package } from '@/types/package';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PackagesPage: React.FC = () => {
  // Mock packages data
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
  ]);

  // Filter packages by search term
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pkg.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary metrics
  const totalPackages = packages.length;
  const totalConsumption = packages.reduce((acc, pkg) => acc + pkg.downloads, 0);
  const totalStorage = packages.reduce((acc, pkg) => acc + pkg.size, 0);
  const maliciousPackages = packages.filter(pkg => pkg.vulnerabilities > 2).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs font-medium">Packages</span>
          </div>
          <h1 className="text-3xl font-bold">Package Management</h1>
          
          <PackageSummary 
            totalPackages={totalPackages} 
            totalConsumption={totalConsumption} 
            totalStorage={totalStorage} 
            maliciousPackages={maliciousPackages} 
            className="mt-6"
          />
          
          <Tabs defaultValue="list" className="mt-6">
            <TabsList>
              <TabsTrigger value="list">Package List</TabsTrigger>
              <TabsTrigger value="search">Advanced Search</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-6">
              <div className="mb-4">
                <Input
                  placeholder="Filter packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <PackageList packages={filteredPackages} />
            </TabsContent>
            
            <TabsContent value="search" className="mt-6">
              <PackageSearch />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PackagesPage;
