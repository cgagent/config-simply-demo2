# AI Chat Component

This component implements an AI-powered chat interface with specialized handling for security alerts and other message types.

## Folder Structure

```
src/components/ai-chat/
├── config/                 # Configuration and constants
│   ├── constants/         # Shared constants and enums
│   └── types/            # Type definitions specific to configuration
├── utils/                 # Utility functions and helpers
│   ├── parsers/          # Content parsing utilities
│   └── formatters/       # Data formatting utilities
├── hooks/                 # Custom React hooks
│   └── useChat/          # Chat-specific hooks for state management
├── display/              # UI components for message display
│   └── components/       # Reusable display components
├── types/                # Component-specific type definitions
├── __tests__/           # Test files and test utilities
└── README.md            # This documentation file

# Root level components
├── AIChat.tsx           # Main chat container component
├── ChatInput.tsx        # Chat input component
├── ChatMessage.tsx      # Individual message component
├── ConversationScreen.tsx # Conversation view component
├── InitialChatScreen.tsx # Initial chat state component
├── MessageList.tsx      # Message list component
├── SuggestedQueries.tsx # Suggested queries component
└── FlyFrogIcon.tsx      # Icon component
```

## Design Principles

### 1. Configuration (`config/`)
- Contains all constant definitions, enums, and configuration values
- Should be the single source of truth for shared values
- Examples: Security remediation actions, message patterns, etc.

### 2. Utilities (`utils/`)
- Contains pure functions for data processing and transformation
- Should not contain business logic or state management
- Organized by functionality (parsers, formatters, etc.)

### 3. Hooks (`hooks/`)
- Contains custom React hooks for state management and business logic
- Separates complex state logic from UI components
- Provides reusable state management patterns

### 4. Display (`display/`)
- Contains UI components focused on presentation
- Separates display logic from business logic
- Makes components more reusable and testable

### 5. Types (`types/`)
- Contains TypeScript interfaces and types specific to the component
- Should be imported by other modules that need these types
- Keeps type definitions centralized and reusable

### 6. Tests (`__tests__/`)
- Contains test files and test utilities
- Follows the same structure as the source code
- Includes unit tests and integration tests

## Best Practices

1. **Single Source of Truth**
   - Constants should be defined in `config/constants/`
   - Types should be defined in `types/`
   - Avoid duplicating definitions across files

2. **Modularity**
   - Each utility function should have a single responsibility
   - Configuration should be separate from implementation
   - Types should be shared across related modules
   - UI components should be focused on presentation
   - Business logic should live in hooks

3. **Type Safety**
   - Use TypeScript interfaces for all data structures
   - Export types from the `types/` directory
   - Maintain strict type checking

4. **Code Organization**
   - Keep related functionality together
   - Use clear, descriptive file and folder names
   - Document complex logic or important decisions
   - Root level components should be high-level containers
   - Reusable components should live in appropriate subfolders

## Example Usage

```typescript
// Importing constants
import { SECURITY_REMEDIATION_ACTIONS } from './config/constants/securityConstants';

// Importing types
import { ParsedContent } from './types/parsedContentTypes';

// Using utilities
import { parseMessageContent } from './utils/parsers/contentParser';

// Using hooks
import { useChat } from './hooks/useChat';

// Using display components
import { MessageDisplay } from './display/components/MessageDisplay';
```

## Refactoring Guidelines

When refactoring code to match this structure:

1. Move all constants to appropriate files in `config/constants/`
2. Extract utility functions to `utils/` with appropriate subfolders
3. Move business logic to custom hooks in `hooks/`
4. Separate UI components into `display/` when they're purely presentational
5. Define and export types from the `types/` directory
6. Update imports to reflect the new structure
7. Ensure no duplication of constants or types
8. Add tests in `__tests__/` following the same structure 