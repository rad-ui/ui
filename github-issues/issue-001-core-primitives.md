---
title: "[TypeScript] Fix Core Primitive TypeScript Support"
labels: typescript, core, breaking-change
priority: critical
---

## 🔴 **Critical Priority**

### **Description**
Core primitive components lack proper TypeScript support, affecting all downstream components in the RAD UI library.

### **Current State**
```typescript
// src/core/primitives/Toggle/index.tsx:15
// TODO: remove after introducing TS support for Primitive and its sub-components

// src/core/primitives/Primitive/index.tsx:30
// TODO: This can be made into a utility function

// src/core/primitives/Primitive/index.tsx:43
// TODO: Utilities for merging props and refs can be created and used here
```

### **Problem**
- Core primitives use `any` types extensively
- Missing proper TypeScript interfaces for primitive props
- No utility functions for prop/ref merging
- Affects all 44+ components that depend on these primitives

### **Affected Files**
- `src/core/primitives/Toggle/index.tsx`
- `src/core/primitives/Primitive/index.tsx`
- `src/core/primitives/Button/index.tsx`
- All components using these primitives

### **Acceptance Criteria**
- [ ] Remove all `any` types from core primitives
- [ ] Add proper TypeScript interfaces for all primitive props
- [ ] Create utility functions for prop/ref merging with proper typing
- [ ] Add generic support where appropriate
- [ ] Update all dependent components to use new typed interfaces
- [ ] Add comprehensive tests for new TypeScript interfaces
- [ ] Update documentation with new type definitions

### **Impact**
- **High**: Affects all 44+ components
- **Foundational**: Required for other TypeScript improvements
- **Breaking Change**: May require updates to existing component usage

### **Implementation Notes**
1. Start with `Button` primitive as it's widely used
2. Create shared utility types for common patterns
3. Ensure backward compatibility where possible
4. Add runtime validation for critical props

### **Definition of Done**
- [ ] All core primitives have proper TypeScript interfaces
- [ ] No `any` types remain in core primitive files
- [ ] Utility functions are created and properly typed
- [ ] All dependent components compile without TypeScript errors
- [ ] Tests pass with new type definitions
- [ ] Documentation is updated