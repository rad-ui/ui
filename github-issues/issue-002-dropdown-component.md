---
title: "[TypeScript] Fix Dropdown Component - Complete Rewrite Needed"
labels: typescript, component, dropdown, breaking-change
priority: critical
---

## 🔴 **Critical Priority**

### **Description**
Dropdown component is currently non-functional with heavy `any` usage and missing core functionality. This component needs a complete rewrite with proper TypeScript support.

### **Current State**
```typescript
// src/components/ui/Dropdown/Dropdown.tsx:2
// TODO: fix any
export type DropdownProps ={
    list: {value: any}[];
    selected: any;
}

const Dropdown = ({ list = [], selected }: DropdownProps) => {
    // Non-functional implementation
    return <div className='relative'>
        <span>Dropdown</span>
    </div>;
};
```

### **Problems**
- **Non-functional**: No actual dropdown functionality implemented
- **Missing state management**: No controlled/uncontrolled modes
- **No event handlers**: Missing onValueChange, onOpenChange, etc.
- **No accessibility**: Missing ARIA attributes, keyboard navigation
- **Heavy `any` usage**: No type safety for dropdown data
- **Hardcoded styles**: No proper theming integration

### **Affected Files**
- `src/components/ui/Dropdown/Dropdown.tsx`
- Related stories and tests (if any)

### **Proposed TypeScript Interface**
```typescript
interface DropdownItem<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

interface DropdownProps<T = string> {
  // Data
  items: DropdownItem<T>[];
  
  // State (controlled)
  value?: T;
  onValueChange?: (value: T) => void;
  
  // State (uncontrolled)
  defaultValue?: T;
  
  // UI
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  
  // Behavior
  closeOnSelect?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  
  // Styling
  className?: string;
  customRootClass?: string;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
```

### **Acceptance Criteria**
- [ ] **Complete functional implementation** with proper state management
- [ ] **TypeScript interfaces** for all props and data structures
- [ ] **Controlled/uncontrolled modes** with proper typing
- [ ] **Event handlers** with typed parameters (`onValueChange`, `onOpenChange`, etc.)
- [ ] **Keyboard navigation** (Arrow keys, Enter, Escape, Tab)
- [ ] **Accessibility features** (ARIA attributes, screen reader support)
- [ ] **Theming integration** with RAD UI design system
- [ ] **Comprehensive tests** covering all functionality
- [ ] **Storybook stories** with examples
- [ ] **Documentation** with usage examples

### **Functional Requirements**
- [ ] Open/close dropdown with click and keyboard
- [ ] Select items with mouse and keyboard
- [ ] Support for controlled and uncontrolled modes
- [ ] Proper focus management
- [ ] Escape key to close
- [ ] Click outside to close
- [ ] Support for disabled items
- [ ] Loading states
- [ ] Empty states
- [ ] Optional search functionality

### **Technical Requirements**
- [ ] Use Floating UI for positioning
- [ ] Implement with compound component pattern
- [ ] Follow RAD UI component conventions
- [ ] Add proper TypeScript generics for value types
- [ ] Include proper ref forwarding
- [ ] Add displayName for debugging

### **Implementation Strategy**
1. **Phase 1**: Core functionality (open/close, select)
2. **Phase 2**: Keyboard navigation and accessibility
3. **Phase 3**: Advanced features (search, multiple select)
4. **Phase 4**: Polish and testing

### **Breaking Changes**
- Complete API change from current non-functional implementation
- New prop structure and naming conventions
- Migration guide will be needed

### **Definition of Done**
- [ ] Dropdown component is fully functional
- [ ] All TypeScript interfaces are properly defined
- [ ] Component passes all accessibility tests
- [ ] Comprehensive test coverage (>90%)
- [ ] Storybook examples work correctly
- [ ] Documentation includes migration guide
- [ ] No `any` types remain in component code