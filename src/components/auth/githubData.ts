
import { GithubOrg } from './OrganizationSelector';
import { GithubRepo } from './RepositorySelector';

// Mock GitHub organizations data
export const githubOrgs: GithubOrg[] = [
  { id: 'org1', name: 'ACME Organization', isAdmin: true },
  { id: 'org2', name: 'Development Team', isAdmin: true },
  { id: 'org3', name: 'Personal Account', isAdmin: false }
];

// Mock GitHub repositories data, matching what's in the CI page
export const githubRepos: GithubRepo[] = [
  {
    id: '1',
    name: 'infrastructure',
    owner: 'dev-team',
    orgName: 'Development Team'
  },
  {
    id: '2',
    name: 'frontend-app',
    owner: 'acme-org',
    orgName: 'ACME Organization'
  },
  {
    id: '3',
    name: 'backend-api',
    owner: 'acme-org',
    orgName: 'ACME Organization'
  }
];
