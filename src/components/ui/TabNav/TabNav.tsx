import TabNavLink from './fragments/TabNavLink';
import TabNavRoot from './fragments/TabNavRoot';

const TabNav = () => {
    console.warn('Direct usage of TabNav is not supported. Please use TabNav.Root, TabNav.Link instead.');
    return null;
};

export default TabNav;

TabNav.Root = TabNavRoot;
TabNav.Link = TabNavLink;
