import NavigationMenuRoot from './fragments/NavigationMenuRoot';
import NavigationMenuItem from './fragments/NavigationMenuItem';
import NavigationMenuTrigger from './fragments/NavigationMenuTrigger';
import NavigationMenuContent from './fragments/NavigationMenuContent';
import NavigationMenuLink from './fragments/NavigationMenuLink';

const NavigationMenu = {
    Root: NavigationMenuRoot,
    Item: NavigationMenuItem,
    Trigger: NavigationMenuTrigger,
    Content: NavigationMenuContent,
    Link: NavigationMenuLink
};

export type { NavigationMenuRootProps } from './fragments/NavigationMenuRoot';
export type { NavigationMenuItemProps } from './fragments/NavigationMenuItem';
export type { NavigationMenuTriggerProps } from './fragments/NavigationMenuTrigger';
export type { NavigationMenuContentProps } from './fragments/NavigationMenuContent';
export type { NavigationMenuLinkProps } from './fragments/NavigationMenuLink';
// Named part exports let React Server Components use `import * as NavigationMenu from '@radui/ui/NavigationMenu'`;
// property access on the default export is undefined across the client boundary.
export {
    NavigationMenuRoot as Root,
    NavigationMenuItem as Item,
    NavigationMenuTrigger as Trigger,
    NavigationMenuContent as Content,
    NavigationMenuLink as Link
};

export default NavigationMenu;
