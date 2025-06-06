'use client';

import DrawerRoot from './fragments/DrawerRoot';
import DrawerTrigger from './fragments/DrawerTrigger';
import DrawerPortal from './fragments/DrawerPortal';
import DrawerOverlay from './fragments/DrawerOverlay';
import DrawerContent from './fragments/DrawerContent';
import DrawerTitle from './fragments/DrawerTitle';
import DrawerDescription from './fragments/DrawerDescription';
import DrawerClose from './fragments/DrawerClose';

const Drawer = () => {
    console.warn('Direct usage of Drawer is not supported. Please use Drawer.Root, Drawer.Content, etc. instead.');
    return null;
};

Drawer.Root = DrawerRoot;
Drawer.Trigger = DrawerTrigger;
Drawer.Portal = DrawerPortal;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Close = DrawerClose;

export default Drawer;
