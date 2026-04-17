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
export default TabNav;
