# Tree-Shaking Guide for @radui/ui

This guide explains how to write components that can be effectively tree-shaken by modern bundlers like webpack, Rollup, and esbuild.

## What is Tree-Shaking?

Tree-shaking is a term commonly used in the JavaScript context for dead-code elimination. It relies on ES6 module syntax (`import` and `export`) to detect which exports are used and which aren't, allowing bundlers to "shake off" unused code.

## How We Optimize for Tree-Shaking

The @radui/ui library is structured to optimize for tree-shaking:

1. Each component is built as a separate ES module.
2. Components are exported individually and as part of the main package.
3. We use the `sideEffects` flag in package.json to tell bundlers which files should always be included.
4. Our Rollup configuration is optimized for tree-shaking with appropriate settings.

## How to Import Components for Best Tree-Shaking

### Good: Named imports from specific paths (best)

```jsx
import { Button } from '@radui/ui/Button';
import { Card } from '@radui/ui/Card';
```

This ensures that only the Button and Card components (and their dependencies) are included in your bundle.

### Also Good: Named imports from the main package

```jsx
import { Button, Card } from '@radui/ui';
```

Modern bundlers should still be able to tree-shake unused components with this approach.

### Bad: Default import of the entire library

```jsx
import RadUI from '@radui/ui';
// Then using RadUI.Button, RadUI.Card, etc.
```

This may include the entire library in your bundle, defeating tree-shaking.

## Tips for Writing Tree-Shakeable Components

When developing components for @radui/ui:

1. **Use named exports for utilities**:
   ```ts
   // Good
   export function utilityFunction() { ... }
   
   // Avoid
   function utilityFunction() { ... }
   export default { utilityFunction };
   ```

2. **Avoid side effects at the module level**:
   ```ts
   // Bad - side effect at module level
   console.log('Component loaded');
   
   // Good - side effect only happens when component is used
   function MyComponent() {
     useEffect(() => {
       console.log('Component mounted');
     }, []);
     // ...
   }
   ```

3. **Don't mutate imports**:
   ```ts
   // Bad
   import { Button } from '@radui/ui/Button';
   Button.newProperty = 'something';
   
   // Good
   import { Button } from '@radui/ui/Button';
   const EnhancedButton = (props) => <Button {...props} data-enhanced />;
   ```

4. **Use pure functions**:
   Functions that always produce the same output given the same input and have no side effects are easier to tree-shake.

## Testing Tree-Shaking

You can test how well tree-shaking works by using the `analyze-bundle` script:

```
npm run analyze-bundle
```

This will generate an HTML report showing the composition of your bundle sizes.

## Resources

- [Webpack tree-shaking guide](https://webpack.js.org/guides/tree-shaking/)
- [Rollup tree-shaking guide](https://rollupjs.org/guide/en/#tree-shaking) 