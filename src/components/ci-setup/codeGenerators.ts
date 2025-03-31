
export const generateJFrogSetupSnippet = () => {
  return `# JFrog Setup Snippet
- name: Setup JFrog
  uses: jfrog/setup-jfrog@v1
  with:
    subdomain: acme`;
};

export const generatePackageSpecificSnippet = (selectedPackages: string[]) => {
  let snippets = '';
  
  if (selectedPackages.includes('npm')) {
    snippets += `\n\n# npm configuration
- name: Configure npm
  run: |
    npm config set registry https://acme.jfrog.io/artifactory/api/npm/npm/
    echo "//acme.jfrog.io/artifactory/api/npm/npm/:_auth=\${JFROG_API_KEY}" > .npmrc`;
  }

  if (selectedPackages.includes('Docker')) {
    snippets += `\n\n# Docker configuration
- name: Login to JFrog Docker registry
  run: echo $JFROG_API_KEY | docker login acme.jfrog.io -u admin --password-stdin`;
  }

  if (selectedPackages.includes('Python')) {
    snippets += `\n\n# Python/pip configuration
- name: Configure pip
  run: |
    pip config set global.index-url https://acme.jfrog.io/artifactory/api/pypi/pypi/simple
    pip config set global.trusted-host acme.jfrog.io`;
  }
  
  if (selectedPackages.includes('Maven')) {
    snippets += `\n\n# Maven configuration
- name: Configure Maven
  run: |
    mkdir -p ~/.m2
    echo "<settings><servers><server><id>jfrog</id><username>admin</username><password>\${JFROG_API_KEY}</password></server></servers></settings>" > ~/.m2/settings.xml`;
  }
  
  if (selectedPackages.includes('Go')) {
    snippets += `\n\n# Go configuration
- name: Configure Go
  run: |
    go env -w GOPROXY=https://acme.jfrog.io/artifactory/api/go/go`;
  }
  
  if (selectedPackages.includes('Nuget')) {
    snippets += `\n\n# NuGet configuration
- name: Configure NuGet
  run: |
    dotnet nuget add source https://acme.jfrog.io/artifactory/api/nuget/nuget -n jfrog`;
  }
  
  return snippets;
};

export const generateFullGithubWorkflow = (selectedPackages: string[]) => {
  return `name: CI Pipeline with JFrog

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
${selectedPackages.includes('npm') ? `
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Configure npm
        run: |
          npm config set registry https://acme.jfrog.io/artifactory/api/npm/npm/
          echo "//acme.jfrog.io/artifactory/api/npm/npm/:_auth=\${JFROG_API_KEY}" > .npmrc
          
      - name: Install dependencies
        run: npm ci
` : ''}${selectedPackages.includes('Docker') ? `
      - name: Login to JFrog
        run: |
          echo $JFROG_API_KEY | docker login acme.jfrog.io -u admin --password-stdin
          
      - name: Build and push Docker image
        run: |
          docker build -t acme.jfrog.io/docker-local/myapp:latest .
          docker push acme.jfrog.io/docker-local/myapp:latest
` : ''}${selectedPackages.includes('Python') ? `
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          
      - name: Configure pip
        run: |
          pip config set global.index-url https://acme.jfrog.io/artifactory/api/pypi/pypi/simple
          pip config set global.trusted-host acme.jfrog.io
          
      - name: Install dependencies
        run: pip install -r requirements.txt
` : ''}`;
};

export const generateFullOtherCIWorkflow = (selectedPackages: string[]) => {
  return `# Jenkins Pipeline Example with JFrog
pipeline {
    agent any
    
    environment {
        JFROG_PLATFORM_URL = "https://acme.jfrog.io"
        JFROG_API_KEY = credentials('jfrog-api-key')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                // JFrog Setup
                sh 'echo "Setting up JFrog connection"'${selectedPackages.includes('npm') ? `
                // npm setup
                sh 'npm config set registry https://acme.jfrog.io/artifactory/api/npm/npm/'
                sh 'echo "//acme.jfrog.io/artifactory/api/npm/npm/:_auth=\${JFROG_API_KEY}" > .npmrc'` : ''}${selectedPackages.includes('Docker') ? `
                // Docker setup
                sh 'echo $JFROG_API_KEY | docker login acme.jfrog.io -u admin --password-stdin'` : ''}${selectedPackages.includes('Python') ? `
                // Python setup
                sh 'pip config set global.index-url https://acme.jfrog.io/artifactory/api/pypi/pypi/simple'
                sh 'pip config set global.trusted-host acme.jfrog.io'` : ''}
            }
        }
        
        stage('Build') {
            steps {
                sh 'echo "Building application"'${selectedPackages.includes('npm') ? `
                sh 'npm ci'
                sh 'npm run build'` : ''}
            }
        }
        
        stage('Test') {
            steps {
                sh 'echo "Running tests"'${selectedPackages.includes('npm') ? `
                sh 'npm test'` : ''}
            }
        }
        
        stage('Publish') {
            steps {
                sh 'echo "Publishing to JFrog"'${selectedPackages.includes('Docker') ? `
                sh 'docker push acme.jfrog.io/docker-local/myapp:latest'` : ''}
            }
        }
    }
}`;
};
