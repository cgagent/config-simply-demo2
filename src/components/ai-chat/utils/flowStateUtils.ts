import { FlowState, FlowStateValue } from '../context/FlowContext';

// Type for state getter functions
export type FlowStateGetter = () => FlowState;

// Map of flow IDs to their state getter functions
const flowStateGetters: Record<string, FlowStateGetter> = {};

/**
 * Register a state getter function for a specific flow
 * @param flowId The flow ID
 * @param getter The state getter function
 */
export const registerFlowStateGetter = (flowId: string, getter: FlowStateGetter): void => {
  flowStateGetters[flowId] = getter;
};

/**
 * Get the state for a specific flow
 * @param flowId The flow ID
 * @returns The flow state or an empty object if not found
 */
export const getFlowState = (flowId: string): FlowState => {
  const getter = flowStateGetters[flowId];
  if (getter) {
    return getter();
  }
  return {};
};

/**
 * Get a specific field value from a flow's state
 * @param flowId The flow ID
 * @param field The field name
 * @param defaultValue Optional default value if field doesn't exist
 * @returns The field value or defaultValue if not found
 */
export const getFlowStateField = <T extends FlowStateValue>(
  flowId: string, 
  field: string, 
  defaultValue: T
): T => {
  const state = getFlowState(flowId);
  return (state[field] as T) ?? defaultValue;
};

/**
 * Format a response with flow state data
 * @param flowId The flow ID
 * @param template The template string with {field} placeholders
 * @returns The formatted string with placeholders replaced by state values
 */
export const formatResponseWithState = (flowId: string, template: string): string => {
  const state = getFlowState(flowId);
  
  // Replace {field} placeholders with values from state
  return template.replace(/{([^}]+)}/g, (match, field) => {
    return String(state[field] ?? match);
  });
}; 