import TabNavLink from './fragments/TabNavLink';
import TabNavRoot from './fragments/TabNavRoot';

const TabNav = () => {
    console.warn('Direct usage of TabNav is not supported. Please use TabNav.Root, TabNav.Link instead.');
    return null;
};

TabNav.Root = TabNavRoot;
TabNav.Link = TabNavLink;

export type { TabNavRootProps } from './fragments/TabNavRoot';
export type { TabNavLinkProps } from './fragments/TabNavLink';
// Named part exports let React Server Components use `import * as TabNav from '@radui/ui/TabNav'`;
// property access on the default export is undefined across the client boundary.
export {
    TabNavRoot as Root,
    TabNavLink as Link
};

export default TabNav;
