import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a generic type for flow state
export type FlowStateValue = string | number | boolean | null;

// Flow state is a generic record of keys to values
export type FlowState = Record<string, FlowStateValue>;

// Define the context interface
interface FlowContextType {
  // Current flow ID
  currentFlowId: string | null;
  // State storage for all flows
  flowStates: Record<string, FlowState>;
  // Set the current flow
  setCurrentFlow: (flowId: string | null) => void;
  // Update a specific flow's state
  updateFlowState: (flowId: string, field: string, value: FlowStateValue) => void;
  // Get a specific flow's state
  getFlowState: (flowId: string) => FlowState;
  // Reset a specific flow's state
  resetFlowState: (flowId: string) => void;
  // Reset all flow states
  resetAllFlowStates: () => void;
}

// Initial state
const initialState: Record<string, FlowState> = {};

// Create context
const FlowContext = createContext<FlowContextType | undefined>(undefined);

// Provider component
export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);
  const [flowStates, setFlowStates] = useState<Record<string, FlowState>>(initialState);

  const setCurrentFlow = (flowId: string | null) => {
    setCurrentFlowId(flowId);
    // Initialize flow state if it doesn't exist
    if (flowId && !flowStates[flowId]) {
      setFlowStates(prev => ({
        ...prev,
        [flowId]: {}
      }));
    }
  };

  const updateFlowState = (flowId: string, field: string, value: FlowStateValue) => {
    setFlowStates(prev => ({
      ...prev,
      [flowId]: {
        ...(prev[flowId] || {}),
        [field]: value
      }
    }));
  };

  const getFlowState = (flowId: string): FlowState => {
    return flowStates[flowId] || {};
  };

  const resetFlowState = (flowId: string) => {
    setFlowStates(prev => {
      const newState = { ...prev };
      newState[flowId] = {};
      return newState;
    });
  };

  const resetAllFlowStates = () => {
    setFlowStates({});
    setCurrentFlowId(null);
  };

  return (
    <FlowContext.Provider 
      value={{ 
        currentFlowId, 
        flowStates, 
        setCurrentFlow, 
        updateFlowState, 
        getFlowState,
        resetFlowState,
        resetAllFlowStates
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// Custom hook for using the context
export const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};

// Helper hook for using a specific flow's state
export const useFlowState = (flowId: string) => {
  const { getFlowState, updateFlowState, resetFlowState } = useFlow();
  
  return {
    state: getFlowState(flowId),
    updateState: (field: string, value: FlowStateValue) => updateFlowState(flowId, field, value),
    resetState: () => resetFlowState(flowId)
  };
}; 