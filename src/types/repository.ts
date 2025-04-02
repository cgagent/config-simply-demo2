/**
 * Supported programming languages in the system
 */
export type SupportedLanguage = 
  | 'JavaScript'
  | 'TypeScript'
  | 'Python'
  | 'Java'
  | 'C#'
  | 'PHP'
  | 'Ruby'
  | 'Go'
  | 'Rust'
  | 'Swift'
  | 'Kotlin'
  | 'Dart'
  | 'YAML';

/**
 * Status of a workflow
 */
export type WorkflowStatus = 'active' | 'inactive';

/**
 * Supported package types in the system
 */
export type PackageType = 'npm' | 'docker' | 'python' | 'maven' | 'debian' | 'rpm';

/**
 * Interface representing a CI/CD workflow
 */
export interface Workflow {
  /** Unique identifier for the workflow */
  id: string;
  /** Display name of the workflow */
  name: string;
  /** Current status of the workflow */
  status: WorkflowStatus;
  /** Build number of the last run */
  buildNumber?: number;
  /** Timestamp of the last workflow run */
  lastRun?: string;
  /** Array of package types this workflow handles */
  packageTypes?: PackageType[];
}

/**
 * Interface representing a repository's package type status
 */
export interface PackageTypeStatus {
  /** Current status of package types */
  current: Record<PackageType, boolean>;
  /** Previous status of package types */
  previous: Record<PackageType, boolean>;
  /** Whether to show status transition animation */
  showTransition: boolean;
}

/**
 * Interface representing a code repository
 */
export interface Repository {
  /** Unique identifier for the repository */
  id: string;
  /** Name of the repository */
  name: string;
  /** Owner of the repository */
  owner: string;
  /** Whether the repository is configured for CI/CD */
  isConfigured: boolean;
  /** Primary programming language of the repository */
  language: SupportedLanguage;
  /** Timestamp of the last update */
  lastUpdated: string;
  /** Array of package types used in the repository */
  packageTypes?: PackageType[];
  /** Timestamp of the last CI/CD run */
  lastRun?: string;
  /** Organization name */
  orgName?: string;
  /** Array of workflows configured for the repository */
  workflows?: Workflow[];
  /** Status of package types in the repository */
  packageTypeStatus?: PackageTypeStatus;
}

/**
 * Mapping of languages to their display colors
 */
export const languageColors: Record<SupportedLanguage, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  'C#': 'bg-purple-500',
  PHP: 'bg-indigo-500',
  Ruby: 'bg-red-600',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
  Swift: 'bg-orange-600',
  Kotlin: 'bg-purple-600',
  Dart: 'bg-blue-400',
  YAML: 'bg-gray-500'
};

/**
 * Array of common package types supported by the system
 */
export const commonPackageTypes: PackageType[] = ['npm', 'docker', 'python', 'maven', 'debian', 'rpm'];

/**
 * Type guard to check if a string is a supported language
 */
export function isSupportedLanguage(language: string): language is SupportedLanguage {
  return language in languageColors;
}

/**
 * Type guard to check if a string is a supported package type
 */
export function isPackageType(type: string): type is PackageType {
  return commonPackageTypes.includes(type as PackageType);
}
