
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Package, Search, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const PackageSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    try {
      // Simulate LLM search with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, return a simulated response based on the query
      let response = '';
      
      if (query.toLowerCase().includes('react')) {
        response = `Package: react
Type: npm
Latest Version: 18.3.0
Published: 2 months ago
Weekly Downloads: ~15 million
Description: React is a JavaScript library for building user interfaces.
Repository: https://github.com/facebook/react
License: MIT

Key Features:
- Component-based architecture
- Virtual DOM for efficient rendering
- One-way data flow
- JSX syntax

No security vulnerabilities have been reported for the latest version.`;
      } else if (query.toLowerCase().includes('docker')) {
        response = `Package: docker (Docker Official Images)
Type: Container Registry
Available on: Docker Hub
Usage: Over 13 billion pulls
Description: Official Docker images for various programming languages and frameworks.

Popular Docker Images:
- node:latest
- python:3.11
- nginx:alpine
- postgres:15

These official images are maintained by Docker and regularly updated with security patches.`;
      } else {
        response = `I couldn't find specific package information for "${query}". 

Some suggestions:
- Try using more specific terms or the exact package name
- Check the package registry (npm, PyPI, Docker Hub, etc.)
- Include the package type in your search

For general package information, you can visit:
- npm: https://www.npmjs.com/
- PyPI: https://pypi.org/
- Docker Hub: https://hub.docker.com/`;
      }
      
      setSearchResult(response);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResult('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Natural Language Package Search</h3>
          <p className="text-sm text-muted-foreground">
            Search for packages using natural language. Ask about specific packages, 
            compare packages, or inquire about security vulnerabilities.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Search Query</Label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  placeholder="E.g. What's the latest version of React? or Find Docker images for Node.js"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !query.trim()}
                className={cn(isSearching && "opacity-80")}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {searchResult && (
            <div className="mt-6">
              <Label>Results</Label>
              <Textarea
                value={searchResult}
                readOnly
                className="h-[300px] font-mono text-sm mt-2 resize-none focus-visible:ring-0"
              />
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6 bg-gray-50 border-dashed">
        <h3 className="text-sm font-medium mb-2">Example Queries</h3>
        <div className="space-y-2">
          <div className="bg-white p-2 rounded-md border border-border text-sm">
            What's the latest version of React?
          </div>
          <div className="bg-white p-2 rounded-md border border-border text-sm">
            Compare Express.js and Fastify
          </div>
          <div className="bg-white p-2 rounded-md border border-border text-sm">
            Find Docker images for Node.js
          </div>
          <div className="bg-white p-2 rounded-md border border-border text-sm">
            Are there any security vulnerabilities in lodash?
          </div>
        </div>
      </Card>
    </div>
  );
};
