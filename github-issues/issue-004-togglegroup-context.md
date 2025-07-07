---
title: "[TypeScript] Fix ToggleGroup Context - Replace `any[]` with Proper Types"
labels: typescript, component, toggle-group, context
priority: critical
---

## 🔴 **Critical Priority**

### **Description**
ToggleGroup context uses `any[]` for state management, completely losing type safety for toggle values and state operations.

### **Current State**
```typescript
// src/components/ui/ToggleGroup/contexts/toggleContext.tsx
export type ToggleContextType = {
    /** Selection mode: 'single' or 'multiple' */
    type: 'single' | 'multiple';
    /** Array of currently active/selected toggle values */
    activeToggles: any[];
    /** Function to update the active toggles */
    setActiveToggles: (toggles: any[]) => void;
};
```

### **Problems**
- **No type safety**: Toggle values use `any[]`, losing all TypeScript benefits
- **Runtime errors**: Invalid toggle values can cause unexpected behavior
- **Poor IDE support**: No autocompletion for toggle values
- **Inconsistent state**: Cannot enforce value type consistency
- **No generic support**: Cannot type-check toggle value types

### **Affected Files**
- `src/components/ui/ToggleGroup/contexts/toggleContext.tsx`
- `src/components/ui/ToggleGroup/fragments/ToggleGroupRoot.tsx`
- `src/components/ui/ToggleGroup/fragments/ToggleItem.tsx`
- All components using ToggleGroup

### **Current Usage Issues**
```typescript
// src/components/ui/ToggleGroup/fragments/ToggleItem.tsx:60
activeToggleArray = activeToggleArray.filter((item: any) => item !== value);
//                                                    ^^^^ No type safety

// src/components/ui/ToggleGroup/fragments/ToggleGroupRoot.tsx:20
value?: any;
//      ^^^ Should be properly typed
```

### **Proposed TypeScript Interface**
```typescript
// Generic context type
export type ToggleContextType<T = string> = {
    /** Selection mode: 'single' or 'multiple' */
    type: 'single' | 'multiple';
    /** Array of currently active/selected toggle values */
    activeToggles: T[];
    /** Function to update the active toggles */
    setActiveToggles: (toggles: T[]) => void;
};

// Component prop interfaces
interface ToggleGroupRootProps<T = string> extends React.ComponentPropsWithoutRef<'div'> {
    customRootClass?: string;
    children: React.ReactNode;
    
    /** Selection mode - 'single' allows only one item to be selected, 'multiple' allows many */
    type?: 'single' | 'multiple';
    
    // Controlled mode
    value?: T | T[];
    onValueChange?: (value: T | T[]) => void;
    
    // Uncontrolled mode
    defaultValue?: T | T[];
    
    // Behavior
    disabled?: boolean;
    required?: boolean;
    
    // Styling
    orientation?: 'horizontal' | 'vertical';
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outline' | 'ghost';
}

interface ToggleItemProps<T = string> extends React.ComponentPropsWithoutRef<'button'> {
    customRootClass?: string;
    children: React.ReactNode;
    value: T;
    disabled?: boolean;
    asChild?: boolean;
}
```

### **Acceptance Criteria**
- [ ] **Replace `any[]` with generic type parameter** `T[]`
- [ ] **Add proper typing for toggle values** throughout the component
- [ ] **Update all components using the context** to use new types
- [ ] **Add proper TypeScript constraints** for value consistency
- [ ] **Implement generic support** for different value types
- [ ] **Add controlled/uncontrolled mode typing** with proper union types
- [ ] **Update context provider** to use generic types
- [ ] **Add comprehensive tests** for new TypeScript interfaces
- [ ] **Ensure backward compatibility** where possible

### **Implementation Tasks**

#### **Phase 1: Context Update**
- [ ] Update `ToggleContextType` to use generic `<T = string>`
- [ ] Update context provider to accept generic type
- [ ] Update context default value with proper typing

#### **Phase 2: Component Interface Updates**
- [ ] Update `ToggleGroupRootProps<T>` interface
- [ ] Update `ToggleItemProps<T>` interface
- [ ] Add proper value type constraints

#### **Phase 3: Component Implementation**
- [ ] Update `ToggleGroupRoot` component with new interface
- [ ] Update `ToggleItem` component with new interface
- [ ] Update all internal state management with proper types

#### **Phase 4: Integration & Testing**
- [ ] Ensure all components work together with new types
- [ ] Add type-level tests
- [ ] Update existing tests to verify type safety
- [ ] Add Storybook examples with different value types

### **Technical Requirements**
- [ ] **Generic context**: `ToggleContext<T>` where `T` is the value type
- [ ] **Union types**: Support both single and multiple selection modes
- [ ] **Type constraints**: Ensure value type consistency across the component
- [ ] **Controlled/uncontrolled**: Proper typing for both modes
- [ ] **State management**: Type-safe state updates and filtering
- [ ] **Ref forwarding**: Proper ref typing for all components

### **Usage Examples**
```typescript
// String values (default)
<ToggleGroup.Root type="multiple" value={['option1', 'option3']} onValueChange={(values) => {}}>
    <ToggleGroup.Item value="option1">Option 1</ToggleGroup.Item>
    <ToggleGroup.Item value="option2">Option 2</ToggleGroup.Item>
    <ToggleGroup.Item value="option3">Option 3</ToggleGroup.Item>
</ToggleGroup.Root>

// Number values
<ToggleGroup.Root<number> type="single" value={1} onValueChange={(value) => {}}>
    <ToggleGroup.Item value={1}>Option 1</ToggleGroup.Item>
    <ToggleGroup.Item value={2}>Option 2</ToggleGroup.Item>
</ToggleGroup.Root>

// Custom object values
interface Option {
    id: string;
    label: string;
}

<ToggleGroup.Root<Option> type="multiple" value={[{id: '1', label: 'One'}]} onValueChange={(values) => {}}>
    <ToggleGroup.Item value={{id: '1', label: 'One'}}>Option 1</ToggleGroup.Item>
    <ToggleGroup.Item value={{id: '2', label: 'Two'}}>Option 2</ToggleGroup.Item>
</ToggleGroup.Root>
```

### **Testing Strategy**
```typescript
// Type-level tests
type TestSingleString = ToggleContextType<string>;
type TestMultipleNumber = ToggleContextType<number>;

// Runtime tests
describe('ToggleGroup TypeScript', () => {
    it('should maintain type safety for string values', () => {
        // Test with string values
    });
    
    it('should maintain type safety for number values', () => {
        // Test with number values
    });
    
    it('should handle controlled mode with proper typing', () => {
        // Test controlled mode
    });
    
    it('should handle uncontrolled mode with proper typing', () => {
        // Test uncontrolled mode
    });
});
```

### **Breaking Changes**
- **Context usage**: Internal context type has changed
- **Generic usage**: May need to specify types for non-string values
- **Value prop**: Type validation is now enforced

### **Migration Guide**
- Most existing usage with string values should continue to work
- Add type parameters for non-string values: `<ToggleGroup.Root<number>>`
- Update any direct context usage to use new generic interfaces

### **Definition of Done**
- [ ] All `any[]` types replaced with proper generic types
- [ ] ToggleGroup context uses generic `ToggleContextType<T>`
- [ ] All components properly typed with generic support
- [ ] TypeScript compilation succeeds without errors
- [ ] All tests pass with new type definitions
- [ ] Storybook examples demonstrate different value types
- [ ] Documentation includes TypeScript usage examples
- [ ] No type safety regressions in existing functionality