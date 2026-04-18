'use client';

import React, { forwardRef } from 'react';
import DrawerRoot from './fragments/DrawerRoot';
import DrawerTrigger from './fragments/DrawerTrigger';
import DrawerPortal from './fragments/DrawerPortal';
import DrawerBackdrop from './fragments/DrawerBackdrop';
import DrawerViewport from './fragments/DrawerViewport';
import DrawerPopup from './fragments/DrawerPopup';
import DrawerContent from './fragments/DrawerContent';
import DrawerTitle from './fragments/DrawerTitle';
import DrawerDescription from './fragments/DrawerDescription';
import DrawerClose from './fragments/DrawerClose';

type DrawerElement = React.ElementRef<'div'>;
type DrawerProps = React.ComponentPropsWithoutRef<'div'>;

const DrawerBase = forwardRef<DrawerElement, DrawerProps>((_props, _ref) => {
    console.warn('Direct usage of Drawer is not supported. Please use Drawer.Root, Drawer.Popup, etc. instead.');
    return null;
});

DrawerBase.displayName = 'Drawer';

interface DrawerComponent extends React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<DrawerElement>> {
    Root: typeof DrawerRoot;
    Trigger: typeof DrawerTrigger;
    Portal: typeof DrawerPortal;
    Backdrop: typeof DrawerBackdrop;
    Viewport: typeof DrawerViewport;
    Popup: typeof DrawerPopup;
    Content: typeof DrawerContent;
    Title: typeof DrawerTitle;
    Description: typeof DrawerDescription;
    Close: typeof DrawerClose;
}

const Drawer = DrawerBase as DrawerComponent;

Drawer.Root = DrawerRoot;
Drawer.Trigger = DrawerTrigger;
Drawer.Portal = DrawerPortal;
Drawer.Backdrop = DrawerBackdrop;
Drawer.Viewport = DrawerViewport;
Drawer.Popup = DrawerPopup;
Drawer.Content = DrawerContent;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Close = DrawerClose;

export type { DrawerSwipeDirection } from './context/DrawerContext';
export type { DrawerRootProps } from './fragments/DrawerRoot';
export type { DrawerTriggerProps } from './fragments/DrawerTrigger';
export type { DrawerPortalProps } from './fragments/DrawerPortal';
export type { DrawerBackdropProps } from './fragments/DrawerBackdrop';
export type { DrawerViewportProps } from './fragments/DrawerViewport';
export type { DrawerPopupProps } from './fragments/DrawerPopup';
export type { DrawerContentProps } from './fragments/DrawerContent';
export type { DrawerTitleProps } from './fragments/DrawerTitle';
export type { DrawerDescriptionProps } from './fragments/DrawerDescription';
export type { DrawerCloseProps } from './fragments/DrawerClose';

export default Drawer;
