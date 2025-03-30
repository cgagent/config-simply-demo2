
export interface ChatStepOption {
  id: string;
  label: string;
  value: string;
}

export type CIType = 'github' | 'other' | null;

export interface CISelection {
  ciType: CIType;
  packageManagers: string[];
  currentStep: 'ci-type' | 'package-managers' | 'snippet-display' | 'implementation-guide';
}
