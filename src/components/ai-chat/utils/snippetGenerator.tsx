/**
 * Snippet Generator
 * 
 * Utility functions for generating code snippets for common package usage patterns.
 * Provides ready-to-use example code snippets for curl, Docker, and Kubernetes.
 */

/**
 * Generate a curl command snippet for accessing a package
 */
export const generateCurlSnippet = (packageName: string, version: string = 'latest') => {
  return `# Download the package using curl
curl -H "Authorization: Bearer $YOUR_API_TOKEN" \\
  https://acme.jfrog.io/artifactory/generic/${packageName}`;
};

/**
 * Generate a Docker command snippet for using a package
 */
export const generateDockerSnippet = (packageName: string, version: string = 'latest') => {
  const registry = 'acme.jfrog.io';
  
  return `# Login to the registry (use your access token as the password)
docker login ${registry}

# Pull the Docker image
docker pull ${registry}/${packageName}:${version}

# Run the container
docker run -d --name ${packageName}-container \\
  -p 8080:8080 \\
  ${registry}/${packageName}:${version}`;
};

/**
 * Generate a Kubernetes manifest for deploying a package
 */
export const generateKubernetesSnippet = (packageName: string, version: string = 'latest') => {
  const registry = 'acme.jfrog.io';
  
  return `# Example Kubernetes deployment manifest for ${packageName}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${packageName}-deployment
  labels:
    app: ${packageName}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${packageName}
  template:
    metadata:
      labels:
        app: ${packageName}
    spec:
      containers:
      - name: ${packageName}
        image: ${registry}/${packageName}:${version}
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "0.5"
            memory: "512Mi"
          requests:
            cpu: "0.1"
            memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: ${packageName}-service
spec:
  selector:
    app: ${packageName}
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP`;
};

/**
 * Get a usage snippet based on type
 */
export const getUsageSnippet = (type: 'curl' | 'docker' | 'kubernetes', packageName: string, version: string = 'latest') => {
  switch (type) {
    case 'curl':
      return generateCurlSnippet(packageName, version);
    case 'docker':
      return generateDockerSnippet(packageName, version);
    case 'kubernetes':
      return generateKubernetesSnippet(packageName, version);
    default:
      return '';
  }
}; 