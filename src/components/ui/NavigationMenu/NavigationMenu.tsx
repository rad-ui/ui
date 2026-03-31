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
export default NavigationMenu;
