import { ChatOption } from '@/components/shared/types';

/**
 * Package name definitions - single source of truth
 */
export const PACKAGE_NAMES = {
  COMMON: {
    id: 'common',
    label: 'Common',
    value: 'common',
    patterns: ['common', 'common package']
  },
  FRONTEND: {
    id: 'frontend-app',
    label: 'Frontend App',
    value: 'frontend-app',
    patterns: ['frontend-app', 'frontend app']
  },
  BACKEND: {
    id: 'backend-api',
    label: 'Backend API',
    value: 'backend-api',
    patterns: ['backend-api', 'backend api']
  }
} as const;

/**
 * Branch selection definitions - single source of truth
 */
export const BRANCH_NAMES = {
  MAIN: {
    id: 'main',
    label: 'Main',
    value: 'main',
    patterns: ['main', 'master']
  },
  DEVELOP: {
    id: 'develop',
    label: 'Develop',
    value: 'develop',
    patterns: ['develop', 'development']
  },
  FEATURE: {
    id: 'feature',
    label: 'Feature',
    value: 'feature',
    patterns: ['feature', 'feature branch']
  }
} as const;

/**
 * Release package names action types
 */
export const RELEASE_PACKAGE_NAME_ACTIONS = {
  SHARED: PACKAGE_NAMES.COMMON.id,
  FRONTEND: PACKAGE_NAMES.FRONTEND.id,
  BACKEND: PACKAGE_NAMES.BACKEND.id
} as const;

/**
 * Branch selection action types
 */
export const BRANCH_SELECTION_ACTIONS = {
  MAIN: BRANCH_NAMES.MAIN.id,
  DEVELOP: BRANCH_NAMES.DEVELOP.id,
  FEATURE: BRANCH_NAMES.FEATURE.id
} as const;

/**
 * Release package names options for UI selection
 */
export const releasePackageNameOptions: ChatOption[] = [
  { 
    id: PACKAGE_NAMES.COMMON.id, 
    label: PACKAGE_NAMES.COMMON.label, 
    value: PACKAGE_NAMES.COMMON.value 
  },
  { 
    id: PACKAGE_NAMES.FRONTEND.id, 
    label: PACKAGE_NAMES.FRONTEND.label, 
    value: PACKAGE_NAMES.FRONTEND.value 
  },
  { 
    id: PACKAGE_NAMES.BACKEND.id, 
    label: PACKAGE_NAMES.BACKEND.label, 
    value: PACKAGE_NAMES.BACKEND.value 
  }
];

/**
 * Branch selection options for UI selection
 */
export const branchSelectionOptions: ChatOption[] = [
  { 
    id: BRANCH_NAMES.MAIN.id, 
    label: BRANCH_NAMES.MAIN.label, 
    value: BRANCH_NAMES.MAIN.value 
  },
  { 
    id: BRANCH_NAMES.DEVELOP.id, 
    label: BRANCH_NAMES.DEVELOP.label, 
    value: BRANCH_NAMES.DEVELOP.value 
  },
  { 
    id: BRANCH_NAMES.FEATURE.id, 
    label: BRANCH_NAMES.FEATURE.label, 
    value: BRANCH_NAMES.FEATURE.value 
  }
];

/**
 * Patterns for release package names
 */
export const RELEASE_PACKAGE_NAME_PATTERNS = {
  [RELEASE_PACKAGE_NAME_ACTIONS.SHARED]: PACKAGE_NAMES.COMMON.patterns,
  [RELEASE_PACKAGE_NAME_ACTIONS.FRONTEND]: PACKAGE_NAMES.FRONTEND.patterns,
  [RELEASE_PACKAGE_NAME_ACTIONS.BACKEND]: PACKAGE_NAMES.BACKEND.patterns
} as const;

/**
 * Patterns for branch selection
 */
export const BRANCH_SELECTION_PATTERNS = {
  [BRANCH_SELECTION_ACTIONS.MAIN]: BRANCH_NAMES.MAIN.patterns,
  [BRANCH_SELECTION_ACTIONS.DEVELOP]: BRANCH_NAMES.DEVELOP.patterns,
  [BRANCH_SELECTION_ACTIONS.FEATURE]: BRANCH_NAMES.FEATURE.patterns
} as const;

/**
 * Get all release package name patterns as a flat array
 */
export const getAllReleasePackageNamePatterns = (): string[] => {
  return Object.values(RELEASE_PACKAGE_NAME_PATTERNS).flat();
};

/**
 * Get all branch selection patterns as a flat array
 */
export const getAllBranchSelectionPatterns = (): string[] => {
  return Object.values(BRANCH_SELECTION_PATTERNS).flat();
};

/**
 * Environment selection definitions - single source of truth
 */
export const ENVIRONMENT_NAMES = {
  DEV: {
    id: 'dev',
    label: 'Development',
    value: 'dev',
    patterns: ['dev', 'development']
  },
  STAGING: {
    id: 'staging',
    label: 'Staging',
    value: 'staging',
    patterns: ['staging', 'staging environment']
  },
  PROD: {
    id: 'prod',
    label: 'Production',
    value: 'prod',
    patterns: ['prod', 'production', 'live']
  }
} as const;

/**
 * Environment selection action types
 */
export const ENVIRONMENT_SELECTION_ACTIONS = {
  DEV: ENVIRONMENT_NAMES.DEV.id,
  STAGING: ENVIRONMENT_NAMES.STAGING.id,
  PROD: ENVIRONMENT_NAMES.PROD.id
} as const;

/**
 * Environment selection options for UI selection
 */
export const environmentSelectionOptions: ChatOption[] = [
  { 
    id: ENVIRONMENT_NAMES.DEV.id, 
    label: ENVIRONMENT_NAMES.DEV.label, 
    value: ENVIRONMENT_NAMES.DEV.value 
  },
  { 
    id: ENVIRONMENT_NAMES.STAGING.id, 
    label: ENVIRONMENT_NAMES.STAGING.label, 
    value: ENVIRONMENT_NAMES.STAGING.value 
  },
  { 
    id: ENVIRONMENT_NAMES.PROD.id, 
    label: ENVIRONMENT_NAMES.PROD.label, 
    value: ENVIRONMENT_NAMES.PROD.value 
  }
];

/**
 * Patterns for environment selection
 */
export const ENVIRONMENT_SELECTION_PATTERNS = {
  [ENVIRONMENT_SELECTION_ACTIONS.DEV]: ENVIRONMENT_NAMES.DEV.patterns,
  [ENVIRONMENT_SELECTION_ACTIONS.STAGING]: ENVIRONMENT_NAMES.STAGING.patterns,
  [ENVIRONMENT_SELECTION_ACTIONS.PROD]: ENVIRONMENT_NAMES.PROD.patterns
} as const;

/**
 * Get all environment selection patterns as a flat array
 */
export const getAllEnvironmentSelectionPatterns = (): string[] => {
  return Object.values(ENVIRONMENT_SELECTION_PATTERNS).flat();
};

/**
 * Release type definitions - single source of truth
 */
export const RELEASE_TYPES = {
  MAJOR: {
    id: 'major',
    label: 'Major',
    value: 'major',
    patterns: ['major', 'major version']
  },
  MINOR: {
    id: 'minor',
    label: 'Minor',
    value: 'minor',
    patterns: ['minor', 'minor version']
  },
  PATCH: {
    id: 'patch',
    label: 'Patch',
    value: 'patch',
    patterns: ['patch', 'patch version']
  }
} as const;

/**
 * Release type selection action types
 */
export const RELEASE_TYPE_SELECTION_ACTIONS = {
  MAJOR: RELEASE_TYPES.MAJOR.id,
  MINOR: RELEASE_TYPES.MINOR.id,
  PATCH: RELEASE_TYPES.PATCH.id
} as const;

/**
 * Release type selection options for UI selection
 */
export const releaseTypeSelectionOptions: ChatOption[] = [
  { 
    id: RELEASE_TYPES.MAJOR.id, 
    label: RELEASE_TYPES.MAJOR.label, 
    value: RELEASE_TYPES.MAJOR.value 
  },
  { 
    id: RELEASE_TYPES.MINOR.id, 
    label: RELEASE_TYPES.MINOR.label, 
    value: RELEASE_TYPES.MINOR.value 
  },
  { 
    id: RELEASE_TYPES.PATCH.id, 
    label: RELEASE_TYPES.PATCH.label, 
    value: RELEASE_TYPES.PATCH.value 
  }
];

/**
 * Patterns for release type selection
 */
export const RELEASE_TYPE_SELECTION_PATTERNS = {
  [RELEASE_TYPE_SELECTION_ACTIONS.MAJOR]: RELEASE_TYPES.MAJOR.patterns,
  [RELEASE_TYPE_SELECTION_ACTIONS.MINOR]: RELEASE_TYPES.MINOR.patterns,
  [RELEASE_TYPE_SELECTION_ACTIONS.PATCH]: RELEASE_TYPES.PATCH.patterns
} as const;

/**
 * Get all release type selection patterns as a flat array
 */
export const getAllReleaseTypeSelectionPatterns = (): string[] => {
  return Object.values(RELEASE_TYPE_SELECTION_PATTERNS).flat();
}; 