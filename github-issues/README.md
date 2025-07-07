# RAD UI TypeScript Issues - GitHub Templates

This folder contains ready-to-use GitHub issue templates for fixing TypeScript-related problems in the RAD UI library.

## 📋 **Issue Summary**

### 🔴 **Critical Priority Issues (4)**

| Issue | Title | Component | Impact |
|-------|-------|-----------|---------|
| #1 | [TypeScript] Fix Core Primitive TypeScript Support | Core Infrastructure | All 44+ components |
| #2 | [TypeScript] Fix Dropdown Component - Complete Rewrite Needed | Dropdown | Non-functional component |
| #3 | [TypeScript] Fix Select Component - Remove All `any` Types | Select | Type safety for all fragments |
| #4 | [TypeScript] Fix ToggleGroup Context - Replace `any[]` with Proper Types | ToggleGroup | State management type safety |

### 🟡 **High Priority Issues (4)**

| Issue | Title | Component | Impact |
|-------|-------|-----------|---------|
| #5 | [TypeScript] Fix Table Component - Remove All `any` Types | Table | All table fragments |
| #6 | [TypeScript] Fix ScrollArea Component - Event Handler and ResizeObserver Types | ScrollArea | Complex event handling |
| #7 | [TypeScript] Fix Tree Component - Recursive Data Structure Types | Tree | Recursive data structure |
| #8 | [TypeScript] Fix Floating UI Context Types - HoverCard, Tooltip | HoverCard, Tooltip | Floating UI integration |

### 🟢 **Medium Priority Issues (3)**

| Issue | Title | Components | Impact |
|-------|-------|------------|---------|
| #9 | [TypeScript] Fix Component Props - Replace Generic `any` Types | Multiple components | 8+ components affected |
| #10 | [TypeScript] Fix Event Handler Types Across Components | Various | Event handling consistency |
| #11 | [TypeScript] Fix Context Default Values - Remove `as` Assertions | Context providers | Type safety for contexts |

## 🚀 **Quick Start Guide**

1. **Copy issue template** from the individual files
2. **Create new GitHub issue** in your repository
3. **Paste the template** content
4. **Assign labels** and priority
5. **Start with Issue #1** (Core Primitives)

## 📂 **File Structure**

```
github-issues/
├── README.md                          # This file
├── issue-001-core-primitives.md       # Core infrastructure fix
├── issue-002-dropdown-component.md    # Dropdown rewrite
├── issue-003-select-component.md      # Select component types
├── issue-004-togglegroup-context.md   # ToggleGroup context fix
└── ... (additional issues as needed)
```

## 🎯 **Implementation Strategy**

### **Phase 1: Foundation (Weeks 1-3)**
- **Issue #1**: Core Primitive TypeScript Support
- **Issue #2**: Dropdown Component Rewrite
- **Issue #3**: Select Component Types
- **Issue #4**: ToggleGroup Context Fix

### **Phase 2: Component-Specific (Weeks 4-5)**
- **Issue #5**: Table Component Types
- **Issue #6**: ScrollArea Event Types
- **Issue #7**: Tree Recursive Types
- **Issue #8**: Floating UI Context Types

### **Phase 3: Polish (Week 6)**
- **Issue #9**: Component Props Cleanup
- **Issue #10**: Event Handler Types
- **Issue #11**: Context Default Values

## 📊 **Progress Tracking**

Track your progress by copying this checklist to your project:

```markdown
### TypeScript Fixes Progress

#### 🔴 Critical Priority
- [ ] #1 - Core Primitive TypeScript Support
- [ ] #2 - Dropdown Component Complete Rewrite
- [ ] #3 - Select Component Remove All `any` Types
- [ ] #4 - ToggleGroup Context Replace `any[]`

#### 🟡 High Priority
- [ ] #5 - Table Component Remove All `any` Types
- [ ] #6 - ScrollArea Event Handler Types
- [ ] #7 - Tree Recursive Data Structure Types
- [ ] #8 - Floating UI Context Types

#### 🟢 Medium Priority
- [ ] #9 - Component Props Replace Generic `any` Types
- [ ] #10 - Event Handler Types Across Components
- [ ] #11 - Context Default Values Remove `as` Assertions
```

## 💡 **Tips for Implementation**

1. **Start with Issue #1** - It's foundational for all other fixes
2. **Use TypeScript strict mode** for new code
3. **Add type tests** alongside regular tests
4. **Document breaking changes** in each PR
5. **Update Storybook examples** with proper typing

## 🔧 **Development Setup**

Before starting, ensure you have:
- TypeScript strict mode enabled
- ESLint rules for TypeScript
- Pre-commit hooks for type checking
- Proper IDE TypeScript support

## 📚 **Resources**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Floating UI TypeScript](https://floating-ui.com/docs/react)
- [RAD UI Contributing Guide](https://www.rad-ui.com/docs/contributing/)

---

Ready to start fixing TypeScript issues? Begin with **Issue #1** - Core Primitive TypeScript Support!