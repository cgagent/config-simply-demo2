
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Github, Info, Shield, Webhook, X, Package, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Button from './Button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Repository {
  id: string;
  name: string;
  owner: string;
  isConfigured: boolean;
  language?: string;
  lastUpdated?: string;
  packageTypes?: string[];
  lastRun?: string;
  orgName?: string;
  workflows?: { id: string; name: string; status: 'active' | 'inactive' }[];
}

interface ConfigurationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repository: Repository | null;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ 
  open, 
  onOpenChange,
  repository
}) => {
  const [saving, setSaving] = useState(false);
  const [webhooks, setWebhooks] = useState(repository?.isConfigured || false);
  const [cicd, setCicd] = useState(repository?.isConfigured || false);
  const [security, setSecurity] = useState(repository?.isConfigured || false);
  const [packageScanning, setPackageScanning] = useState(repository?.isConfigured || false);
  
  if (!repository) return null;
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      onOpenChange(false);
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] animate-fadeIn">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Configure Repository
          </DialogTitle>
          <DialogDescription>
            {repository.owner}/{repository.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Webhook className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Webhook Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    Enable webhook events from this repository
                  </p>
                </div>
              </div>
              <Switch 
                checked={webhooks} 
                onCheckedChange={setWebhooks} 
                id="webhook-switch"
              />
            </div>
            
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">CI/CD Pipeline</h4>
                  <p className="text-xs text-muted-foreground">
                    Set up continuous integration and deployment
                  </p>
                </div>
              </div>
              <Switch 
                checked={cicd} 
                onCheckedChange={setCicd} 
                id="cicd-switch"
              />
            </div>
            
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Security Scanning</h4>
                  <p className="text-xs text-muted-foreground">
                    Enable automated security vulnerability scanning
                  </p>
                </div>
              </div>
              <Switch 
                checked={security} 
                onCheckedChange={setSecurity} 
                id="security-switch"
              />
            </div>
            
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Package Scanning</h4>
                  <p className="text-xs text-muted-foreground">
                    Scan packages for vulnerabilities and updates
                  </p>
                </div>
              </div>
              <Switch 
                checked={packageScanning} 
                onCheckedChange={setPackageScanning} 
                id="package-switch"
              />
            </div>
            
            <div className="flex items-center gap-2 mt-4 px-2 py-3 bg-primary/5 rounded-md text-sm">
              <Info className="h-4 w-4 text-primary" />
              <span>
                These settings will be applied immediately after saving.
              </span>
            </div>
          </TabsContent>
          
          <TabsContent value="workflows" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Available Workflows</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  icon={<RefreshCw className="h-3 w-3" />}
                >
                  Refresh
                </Button>
              </div>
              
              {repository.workflows && repository.workflows.length > 0 ? (
                <div className="space-y-3">
                  {repository.workflows.map(workflow => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div>
                        <div className="font-medium text-sm">{workflow.name}</div>
                        <Badge 
                          variant={workflow.status === 'active' ? 'default' : 'outline'}
                          className="mt-1"
                        >
                          {workflow.status}
                        </Badge>
                      </div>
                      <Switch 
                        checked={workflow.status === 'active'} 
                        onCheckedChange={() => {}} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground border border-dashed border-border rounded-md">
                  No workflows found for this repository
                </div>
              )}
              
              <Button className="w-full" variant="outline">
                Add New Workflow
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="package-types">Package Types</Label>
                <div className="flex flex-wrap gap-2">
                  {repository.packageTypes && repository.packageTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {type}
                    </Badge>
                  ))}
                  {(!repository.packageTypes || repository.packageTypes.length === 0) && (
                    <div className="text-muted-foreground">No package types detected</div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Package Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-update" />
                    <Label htmlFor="auto-update">Enable automatic updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dependency-alerts" />
                    <Label htmlFor="dependency-alerts">Receive alerts for vulnerable dependencies</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dependency-pr" />
                    <Label htmlFor="dependency-pr">Create PRs for dependency updates</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            icon={<X className="h-4 w-4" />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            loading={saving}
            icon={!saving && <CheckCircle2 className="h-4 w-4" />}
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationModal;
