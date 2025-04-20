import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of the release flow state
export interface ReleaseFlowState {
  packageName: string;
  branch: string;
  environment: string;
  releaseType: string;
}

// Define the context interface
interface ReleaseFlowContextType {
  releaseState: ReleaseFlowState;
  updateReleaseState: (field: keyof ReleaseFlowState, value: string) => void;
  resetReleaseState: () => void;
}

// Initial state
const initialState: ReleaseFlowState = {
  packageName: '',
  branch: '',
  environment: '',
  releaseType: ''
};

// Create context
const ReleaseFlowContext = createContext<ReleaseFlowContextType | undefined>(undefined);

// Provider component
export const ReleaseFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [releaseState, setReleaseState] = useState<ReleaseFlowState>(initialState);

  const updateReleaseState = (field: keyof ReleaseFlowState, value: string) => {
    setReleaseState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetReleaseState = () => {
    setReleaseState(initialState);
  };

  return (
    <ReleaseFlowContext.Provider value={{ releaseState, updateReleaseState, resetReleaseState }}>
      {children}
    </ReleaseFlowContext.Provider>
  );
};

// Custom hook for using the context
export const useReleaseFlow = (): ReleaseFlowContextType => {
  const context = useContext(ReleaseFlowContext);
  if (context === undefined) {
    throw new Error('useReleaseFlow must be used within a ReleaseFlowProvider');
  }
  return context;
}; 