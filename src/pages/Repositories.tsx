
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Settings, CheckCircle, AlertCircle, Clock, Package, ChevronDown } from 'lucide-react';
import Button from '@/components/Button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Search from '@/components/Search';
import ConfigurationModal from '@/components/ConfigurationModal';
import NavBar from '@/components/NavBar';

// Define types for our data
interface GitHubRepository {
  id: string;
  name: string;
  owner: string;
  orgName: string;
  packageTypes: string[];
  lastRun: string;
  isConfigured: boolean;
  workflows: Workflow[];
}

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface Organization {
  id: string;
  name: string;
}

const RepositoriesPage: React.FC = () => {
  // Mock data for repositories
  const [repositories, setRepositories] = useState<GitHubRepository[]>([
    {
      id: '1',
      name: 'frontend-app',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      packageTypes: ['npm', 'yarn'],
      lastRun: '2 days ago',
      isConfigured: true,
      workflows: [
        { id: 'w1', name: 'CI/CD Pipeline', status: 'active' },
        { id: 'w2', name: 'Test Suite', status: 'active' }
      ]
    },
    {
      id: '2',
      name: 'backend-api',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      packageTypes: ['npm'],
      lastRun: '5 days ago',
      isConfigured: false,
      workflows: [
        { id: 'w3', name: 'Database Migrations', status: 'inactive' }
      ]
    },
    {
      id: '3',
      name: 'documentation',
      owner: 'dev-team',
      orgName: 'Development Team',
      packageTypes: ['markdown'],
      lastRun: 'Never',
      isConfigured: false,
      workflows: []
    }
  ]);

  // Mock organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 'org1', name: 'ACME Organization' },
    { id: 'org2', name: 'Development Team' },
    { id: 'org3', name: 'Personal Account' }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  
  const filteredRepos = repositories
    .filter(repo => repo.orgName === selectedOrg.name) // Filter by selected organization
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleConfigureClick = (repo: GitHubRepository) => {
    setSelectedRepo(repo);
    setConfigModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard</span>
                <span className="text-xs text-muted-foreground">/</span>
                <span className="text-xs font-medium">GitHub Repositories</span>
              </div>
              <h1 className="text-3xl font-bold mt-1">GitHub Repositories</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                  >
                    <Github className="h-4 w-4" />
                    {selectedOrg.name}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <div className="px-2 pt-2 pb-1 text-sm font-medium text-muted-foreground">
                    Organizations
                  </div>
                  <Separator className="my-1" />
                  {organizations.map(org => (
                    <DropdownMenuItem 
                      key={org.id} 
                      onClick={() => setSelectedOrg(org)}
                      className={cn(
                        "cursor-pointer",
                        selectedOrg.id === org.id && "bg-primary/10 text-primary"
                      )}
                    >
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button icon={<Github className="h-4 w-4" />}>
                Connect Repository
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm mb-8">
            <div className="p-4 border-b border-border">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Tabs defaultValue="all" className="w-full max-w-[400px]">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="configured">Configured</TabsTrigger>
                    <TabsTrigger value="not-configured">Not Configured</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Search 
                  onSearch={setSearchTerm} 
                  className="w-full sm:w-64"
                  placeholder="Search repositories..."
                />
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Repository</TableHead>
                  <TableHead>Package Types</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRepos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No repositories found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRepos.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Github className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{repo.name}</div>
                            <div className="text-xs text-muted-foreground">{repo.owner}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {repo.packageTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{repo.lastRun}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1",
                            repo.isConfigured 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          )}
                        >
                          {repo.isConfigured ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              <span>Configured</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3" />
                              <span>Not Configured</span>
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConfigureClick(repo)}
                          icon={<Settings className="h-4 w-4" />}
                        >
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm p-5">
            <h2 className="text-lg font-medium mb-4">Repository Workflows</h2>
            {selectedRepo ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage workflows for {selectedRepo.name}
                </p>
                {selectedRepo.workflows.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workflow Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRepo.workflows.map(workflow => (
                        <TableRow key={workflow.id}>
                          <TableCell>{workflow.name}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={workflow.status === 'active' ? 'default' : 'outline'}
                              className={workflow.status === 'active' ? 'bg-green-500' : ''}
                            >
                              {workflow.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No workflows configured for this repository
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Select a repository to view its workflows
              </div>
            )}
          </div>
        </div>
      </main>
      
      {selectedRepo && (
        <ConfigurationModal
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          repository={selectedRepo}
        />
      )}
    </div>
  );
};

export default RepositoriesPage;
