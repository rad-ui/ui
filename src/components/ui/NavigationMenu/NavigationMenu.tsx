import NavigationMenuRoot from './fragments/NavigationMenuRoot';
import NavigationMenuItem from './fragments/NavigationMenuItem';
import NavigationMenuTrigger from './fragments/NavigationMenuTrigger';
import NavigationMenuContent from './fragments/NavigationMenuContent';
import NavigationMenuLink from './fragments/NavigationMenuLink';
import NavigationMenuViewport from './fragments/NavigationMenuViewport';

const NavigationMenu = {
    Root: NavigationMenuRoot,
    Item: NavigationMenuItem,
    Trigger: NavigationMenuTrigger,
    Content: NavigationMenuContent,
    Link: NavigationMenuLink,
    Viewport: NavigationMenuViewport
};

export type { NavigationMenuRootProps } from './fragments/NavigationMenuRoot';
export type { NavigationMenuItemProps } from './fragments/NavigationMenuItem';
export type { NavigationMenuTriggerProps } from './fragments/NavigationMenuTrigger';
export type { NavigationMenuContentProps } from './fragments/NavigationMenuContent';
export type { NavigationMenuLinkProps } from './fragments/NavigationMenuLink';
export type { NavigationMenuViewportProps } from './fragments/NavigationMenuViewport';
// Named part exports let React Server Components use `import * as NavigationMenu from '@radui/ui/NavigationMenu'`;
// property access on the default export is undefined across the client boundary.
export {
    NavigationMenuRoot as Root,
    NavigationMenuItem as Item,
    NavigationMenuTrigger as Trigger,
    NavigationMenuContent as Content,
    NavigationMenuLink as Link,
    NavigationMenuViewport as Viewport
};

export default NavigationMenu;
