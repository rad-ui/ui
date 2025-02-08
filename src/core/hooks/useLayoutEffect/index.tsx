import { useLayoutEffect as ReactUseLayoutEffect } from 'react';

// When we use useLayoutEffect in a server component, it will throw an error.
// One of the hooks that do not work on server components
// wrapping it this way and using it will make sure errors are not thrown and fail silently
// If it's server, we just return a noop function (no operation)

//  Radix UI does it this way - https://github.com/radix-ui/primitives/blob/main/packages/react/use-layout-effect/src/use-layout-effect.tsx
//
const useLayoutEffect = globalThis.document ? ReactUseLayoutEffect : () => {};

export default useLayoutEffect;
