# Components Using querySelector That Can Be Replaced with Refs

This document identifies all components in the library that currently use `querySelector` or `querySelectorAll` and can potentially be refactored to use React refs for better performance and maintainability.

## 1. RovingFocusGroup Components

### RovingFocusGroup.tsx
**File:** `src/core/utils/RovingFocusGroup/fragments/RovingFocusGroup.tsx`

**Current Usage:**
```typescript
const treeItems = group.querySelectorAll('[role="treeitem"]');
```

**Context:** Used in tree mode to recompute focus items from actual DOM children.

**Refactoring Opportunity:**
- Could maintain a ref map of all tree items registered via context
- Track child elements through React context instead of DOM queries
- Use `useImperativeHandle` to expose child refs to parent

**Priority:** Medium - Only used in tree mode, but could improve performance

---

### RovingFocusItem.tsx
**File:** `src/core/utils/RovingFocusGroup/fragments/RovingFocusItem.tsx`

**Current Usage:**
```typescript
// Line 87-89: Focus item by ID
const item = groupRef.current.querySelector(`#${sanitizedId}`);
if (item) {
    (item as HTMLElement).focus();
}

// Line 120-122: Check if item is enabled
const itemElement = groupRef?.current?.querySelector(`#${CSS.escape(itemId)}`) as HTMLElement;
```

**Context:** Used to focus items and check their disabled state during keyboard navigation.

**Refactoring Opportunity:**
- Create a ref map in the group context: `Map<string, RefObject<HTMLElement>>`
- Each item registers its ref with the group on mount
- Replace querySelector with direct ref access: `refMap.get(itemId)?.current?.focus()`
- Check disabled state directly from ref instead of DOM query

**Priority:** High - Called frequently during keyboard navigation, performance-critical

---

## 2. Tree Component

### TreeItem.tsx
**File:** `src/components/ui/Tree/fragments/TreeItem.tsx`

**Current Usage:**
```typescript
// Line 48-50: Find first child in expanded group
const firstChild = next.querySelector('[role="treeitem"]') as HTMLElement | null;
firstChild?.focus();

// Line 70-73: Find parent item by data-id
const parentItem = document.querySelector(`[data-id="${parentId}"]`) as HTMLButtonElement;
if (parentItem) {
    parentItem.focus();
}
```

**Context:** Used for keyboard navigation when expanding/collapsing tree nodes.

**Refactoring Opportunity:**
- Store parent ref in context when rendering nested items
- Pass parent ref as prop to child TreeItems
- For first child: maintain refs for all children in parent state
- Replace `document.querySelector` with context-based ref lookup

**Priority:** High - Uses `document.querySelector` which searches entire document

---

## 3. Slider Components

### SliderRangeSlider.tsx
**File:** `src/components/ui/Slider/fragments/SliderRangeSlider.tsx`

**Current Usage:**
```typescript
// Line 82-84: Find root element during global pointer move
const rootElement = document.querySelector(`[data-slider-root="${rootClass}"]`) as HTMLDivElement;
if (!rootElement) return;
```

**Context:** Used during drag operations to calculate relative position.

**Refactoring Opportunity:**
- Pass root ref from SliderRoot via context
- Access root element directly from context ref
- Eliminates need for data attribute and querySelector

**Priority:** High - Called repeatedly during drag operations (performance-critical)

---

### SliderRoot.tsx
**File:** `src/components/ui/Slider/fragments/SliderRoot.tsx`

**Current Usage:**
```typescript
// Line 128-130: Find single thumb element
const singleThumb = internalRef.current?.querySelector<HTMLElement>(`.${rootClass}-thumb`);
singleThumb?.focus();
```

**Context:** Used to focus the thumb after pointer interaction.

**Refactoring Opportunity:**
- Create thumb refs in SliderRoot and pass via context
- For single slider: maintain `thumbRef`
- For range slider: maintain `thumbRefs` array
- Access thumb directly via ref instead of querySelector

**Priority:** Medium - Only called on pointer down, not performance-critical

---

## 4. NavigationMenu Component

### NavigationMenuContent.tsx
**File:** `src/components/ui/NavigationMenu/fragments/NavigationMenuContent.tsx`

**Current Usage:**
```typescript
// Line 22-24: Focus first focusable element
const firstFocusable = contentRef.current?.querySelector<HTMLElement>('*');
firstFocusable?.focus();
```

**Context:** Auto-focus first element when menu content opens.

**Refactoring Opportunity:**
- Use RovingFocusGroup's built-in focus management (already imported)
- Let RovingFocusGroup handle first item focus automatically
- Remove manual querySelector and focus logic

**Priority:** Low - Only runs once when opening, but can be simplified

---

## 5. Portal Components (Theme Container Lookup)

These components search for theme container elements to determine portal root:

### DialogPrimitivePortal.tsx
**File:** `src/core/primitives/Dialog/fragments/DialogPrimitivePortal.tsx`

**Current Usage:**
```typescript
const themeContainer = themeContext?.portalRootRef.current
    || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
    || themeContext?.containerRef.current
    || document.querySelector('#rad-ui-theme-container') as HTMLElement | null;
```

---

### MenuPrimitivePortal.tsx
**File:** `src/core/primitives/Menu/fragments/MenuPrimitivePortal.tsx`

**Current Usage:**
```typescript
const rootElement = (
    document.querySelector('#rad-ui-theme-container') || document.body
) as HTMLElement | null;
```

---

### ComboboxPrimitivePortal.tsx
**File:** `src/core/primitives/Combobox/fragments/ComboboxPrimitivePortal.tsx`

**Current Usage:**
```typescript
const rootElement = (container || document.querySelector('#rad-ui-theme-container') || document.body) as HTMLElement | null;
```

---

### TooltipContent.tsx
**File:** `src/components/ui/Tooltip/fragments/TooltipContent.tsx`

**Current Usage:**
```typescript
const portalRoot = themeContext?.portalRootRef.current
    || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
    || themeContext?.containerRef.current
    || document.querySelector('#rad-ui-theme-container') as HTMLElement | null
    || undefined;
```

---

### HoverCardPortal.tsx
**File:** `src/components/ui/HoverCard/fragments/HoverCardPortal.tsx`

**Current Usage:**
```typescript
const rootElem = rootElement
    || themeContext?.portalRootRef.current
    || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
    || themeContext?.containerRef.current
    || document.getElementsByClassName(rootTriggerClass)[0] as HTMLElement;
```

**Refactoring Opportunity (All Portal Components):**
- Already partially using refs via `themeContext?.portalRootRef.current`
- Remove querySelector fallbacks for `#rad-ui-theme-container` and `[data-rad-ui-portal-root]`
- Ensure ThemeContext always provides `portalRootRef`
- Standardize fallback to `document.body` only
- For HoverCard: also remove `getElementsByClassName` usage

**Priority:** Medium - Runs once per portal mount, but querySelector is unnecessary when context exists

---

## Summary

### High Priority (Performance-Critical)
1. **RovingFocusItem.tsx** - Called during every keyboard navigation event
2. **TreeItem.tsx** - Uses `document.querySelector` (searches entire document)
3. **SliderRangeSlider.tsx** - Called repeatedly during drag operations

### Medium Priority
4. **RovingFocusGroup.tsx** - Only in tree mode, but could improve performance
5. **SliderRoot.tsx** - Called on pointer down only
6. **Portal Components** - Run once per mount, but can be simplified

### Low Priority
7. **NavigationMenuContent.tsx** - Can be simplified by using existing RovingFocusGroup

---

## Recommended Refactoring Approach

### For Focus Management Components (RovingFocus, Tree)
1. Create a ref registry in the group/root context
2. Each item registers its ref on mount using `useEffect`
3. Replace querySelector with direct ref access from registry
4. Clean up refs on unmount

### For Slider Components
1. Pass root ref through SliderContext
2. Create thumb refs and pass through context
3. Access refs directly instead of querySelector

### For Portal Components
1. Ensure ThemeContext always provides portalRootRef
2. Remove querySelector fallbacks
3. Standardize to: `themeContext.portalRootRef.current || document.body`

### For NavigationMenu
1. Remove manual focus logic
2. Let RovingFocusGroup handle focus automatically
