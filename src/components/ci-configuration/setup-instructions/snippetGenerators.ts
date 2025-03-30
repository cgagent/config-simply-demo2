
import { Repository } from '@/types/repository';

export const generateSetupSnippet = (): string => {
  return `- name: Setup JFrog
  uses: jfrog/setup-jfrog@v1
  with:
    subdomain: acme`;
};

export const generateNpmWebAppSnippet = (repositoryName?: string): string => {
  const repoName = repositoryName || 'your-webapp';
  
  return `name: NPM Web App CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${repoName}-build
          path: build/

      - name: Deploy to staging
        if: github.event_name != 'pull_request'
        run: |
          echo "Deploying to staging environment"
          # Add your deployment commands here`;
};

export const generateNpmWebAppWithJFrogSnippet = (repositoryName?: string): string => {
  const repoName = repositoryName || 'your-webapp';
  
  return `name: NPM Web App CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup JFrog
        uses: jfrog/setup-jfrog@v1
        with:
          subdomain: acme

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${repoName}-build
          path: build/

      - name: Deploy to staging
        if: github.event_name != 'pull_request'
        run: |
          echo "Deploying to staging environment"
          # Add your deployment commands here`;
};

export const generateFullSnippet = (repository?: Repository, selectedPackageTypes: string[] = []): string => {
  const repoName = repository?.name || 'your-repository';
  
  return `name: CI Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup JFrog
        uses: jfrog/setup-jfrog@v1
        with:
          subdomain: acme
${selectedPackageTypes.includes('npm') ? 
`
      - name: Install npm dependencies
        run: npm install
      # Other npm build steps` : ''}
${selectedPackageTypes.includes('python') ? 
`
      - name: Install python dependencies
        run: pip install -r requirements.txt
      # Other python build steps` : ''}
${selectedPackageTypes.includes('docker') ? 
`
      - name: Build Docker image
        run: docker build -t ${repoName}:latest .
      # Other docker build steps` : ''}`;
};
