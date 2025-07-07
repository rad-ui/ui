---
title: "[TypeScript] Fix Select Component - Remove All `any` Types"
labels: typescript, component, select
priority: critical
---

## 🔴 **Critical Priority**

### **Description**
All Select component fragments use `any` for props, making the component unsafe and unpredictable. This affects type safety, IDE support, and component reliability.

### **Current State**
```typescript
// src/components/ui/Select/fragments/SelectRoot.tsx
function SelectRoot({ customRootClass, children, defaultValue, value, onValueChange, shift, ...props }: any)

// src/components/ui/Select/fragments/SelectTrigger.tsx
function SelectTrigger({ customRootClass, children, disabled, placeholder, ...props }: any)

// src/components/ui/Select/fragments/SelectItem.tsx
function SelectItem({ customRootClass, children, value, disabled, ...props }: any)

// src/components/ui/Select/fragments/SelectContent.tsx
function SelectContent({ customRootClass, children, position = 'popper', ...props }: any)
```

### **Problems**
- **No type safety**: All props use `any`, losing TypeScript benefits
- **Poor IDE support**: No autocompletion or error detection
- **Runtime errors**: Invalid props can cause unexpected behavior
- **No generic support**: Cannot type-check value types
- **Missing prop validation**: No compile-time prop checking

### **Affected Files**
- `src/components/ui/Select/fragments/SelectRoot.tsx`
- `src/components/ui/Select/fragments/SelectTrigger.tsx`
- `src/components/ui/Select/fragments/SelectItem.tsx`
- `src/components/ui/Select/fragments/SelectContent.tsx`
- `src/components/ui/Select/contexts/SelectRootContext.tsx`
- `src/core/primitives/Select/contexts/SelectPrimitiveContext.tsx`

### **Proposed TypeScript Interfaces**

```typescript
// Base interfaces
interface SelectRootProps<T = string> extends React.ComponentPropsWithoutRef<'div'> {
  customRootClass?: string;
  children: React.ReactNode;
  
  // Controlled
  value?: T;
  onValueChange?: (value: T) => void;
  
  // Uncontrolled
  defaultValue?: T;
  
  // Behavior
  disabled?: boolean;
  required?: boolean;
  name?: string;
  
  // Floating UI
  shift?: boolean;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  customRootClass?: string;
  children: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  asChild?: boolean;
}

interface SelectItemProps<T = string> extends React.ComponentPropsWithoutRef<'div'> {
  customRootClass?: string;
  children: React.ReactNode;
  value: T;
  disabled?: boolean;
  asChild?: boolean;
}

interface SelectContentProps extends React.ComponentPropsWithoutRef<'div'> {
  customRootClass?: string;
  children: React.ReactNode;
  position?: 'popper' | 'item-aligned';
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
}

// Context interfaces
interface SelectRootContextType {
  rootClass: string;
}

interface SelectPrimitiveContextType<T = string> {
  value?: T;
  onValueChange?: (value: T) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // ... other Floating UI properties with proper types
}
```

### **Acceptance Criteria**
- [ ] **Remove all `any` types** from Select component fragments
- [ ] **Define proper TypeScript interfaces** for all component props
- [ ] **Add generic support** for value types (`<T = string>`)
- [ ] **Implement controlled/uncontrolled mode typing**
- [ ] **Add proper event handler typing** with typed parameters
- [ ] **Update Select primitive context types** to remove `any`
- [ ] **Extend appropriate HTML element types** for proper DOM prop support
- [ ] **Add proper ref forwarding** with typed refs
- [ ] **Update component composition** to maintain type safety
- [ ] **Add comprehensive tests** for new TypeScript interfaces

### **Implementation Tasks**

#### **Phase 1: Core Interfaces**
- [ ] Define `SelectRootProps<T>` interface
- [ ] Define `SelectTriggerProps` interface  
- [ ] Define `SelectItemProps<T>` interface
- [ ] Define `SelectContentProps` interface

#### **Phase 2: Context Updates**
- [ ] Update `SelectRootContext` with proper typing
- [ ] Update `SelectPrimitiveContext` with generic support
- [ ] Remove `any` types from context providers

#### **Phase 3: Component Updates**
- [ ] Update `SelectRoot` component with new interface
- [ ] Update `SelectTrigger` component with new interface
- [ ] Update `SelectItem` component with new interface
- [ ] Update `SelectContent` component with new interface

#### **Phase 4: Integration**
- [ ] Ensure all components work together with new types
- [ ] Update tests to verify type safety
- [ ] Add Storybook examples with proper typing

### **Technical Requirements**
- [ ] **Generic support**: `Select<T>` where `T` is the value type
- [ ] **Proper HTML element extension**: Components extend appropriate HTML elements
- [ ] **Ref forwarding**: All components properly forward refs
- [ ] **Event typing**: All event handlers have proper parameter types
- [ ] **Composition safety**: Component composition maintains type safety
- [ ] **Backward compatibility**: Existing usage should not break

### **Testing Strategy**
```typescript
// Type-level tests
const stringSelect = (
  <Select.Root<string> value="test" onValueChange={(value: string) => {}}>
    <Select.Trigger placeholder="Select..." />
    <Select.Content>
      <Select.Item value="option1">Option 1</Select.Item>
    </Select.Content>
  </Select.Root>
);

const numberSelect = (
  <Select.Root<number> value={1} onValueChange={(value: number) => {}}>
    <Select.Trigger placeholder="Select..." />
    <Select.Content>
      <Select.Item value={1}>Option 1</Select.Item>
    </Select.Content>
  </Select.Root>
);
```

### **Breaking Changes**
- **Props validation**: Some invalid props may now cause TypeScript errors
- **Generic usage**: May need to specify types for complex value types
- **Context usage**: Internal context types have changed

### **Migration Guide**
- Most existing usage should continue to work
- Add type parameters for non-string values: `<Select.Root<number>>`
- Update any direct context usage to use new interfaces

### **Definition of Done**
- [ ] All Select component fragments have proper TypeScript interfaces
- [ ] No `any` types remain in Select component code
- [ ] Generic support works correctly for different value types
- [ ] All tests pass with new type definitions
- [ ] TypeScript compilation succeeds without errors
- [ ] Storybook examples demonstrate proper typing
- [ ] Documentation includes TypeScript usage examples