'use client';

import React, { forwardRef } from 'react';
import DrawerRoot from './fragments/DrawerRoot';
import DrawerProvider from './fragments/DrawerProvider';
import DrawerIndent from './fragments/DrawerIndent';
import DrawerIndentBackground from './fragments/DrawerIndentBackground';
import DrawerTrigger from './fragments/DrawerTrigger';
import DrawerPortal from './fragments/DrawerPortal';
import DrawerBackdrop from './fragments/DrawerBackdrop';
import DrawerViewport from './fragments/DrawerViewport';
import DrawerPopup from './fragments/DrawerPopup';
import DrawerSwipeArea from './fragments/DrawerSwipeArea';
import DrawerContent from './fragments/DrawerContent';
import DrawerTitle from './fragments/DrawerTitle';
import DrawerDescription from './fragments/DrawerDescription';
import DrawerClose from './fragments/DrawerClose';
import DrawerHandle, { createHandle } from './utils/DrawerHandle';

type DrawerElement = React.ElementRef<'div'>;
type DrawerProps = React.ComponentPropsWithoutRef<'div'>;

const DrawerBase = forwardRef<DrawerElement, DrawerProps>((_props, _ref) => {
    console.warn('Direct usage of Drawer is not supported. Please use Drawer.Root, Drawer.Popup, etc. instead.');
    return null;
});

DrawerBase.displayName = 'Drawer';

interface DrawerComponent extends React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<DrawerElement>> {
    Provider: typeof DrawerProvider;
    Indent: typeof DrawerIndent;
    IndentBackground: typeof DrawerIndentBackground;
    Root: typeof DrawerRoot;
    Trigger: typeof DrawerTrigger;
    Portal: typeof DrawerPortal;
    Backdrop: typeof DrawerBackdrop;
    Viewport: typeof DrawerViewport;
    Popup: typeof DrawerPopup;
    SwipeArea: typeof DrawerSwipeArea;
    Content: typeof DrawerContent;
    Title: typeof DrawerTitle;
    Description: typeof DrawerDescription;
    Close: typeof DrawerClose;
    Handle: typeof DrawerHandle;
    createHandle: typeof createHandle;
}

const Drawer = DrawerBase as DrawerComponent;

Drawer.Provider = DrawerProvider;
Drawer.Indent = DrawerIndent;
Drawer.IndentBackground = DrawerIndentBackground;
Drawer.Root = DrawerRoot;
Drawer.Trigger = DrawerTrigger;
Drawer.Portal = DrawerPortal;
Drawer.Backdrop = DrawerBackdrop;
Drawer.Viewport = DrawerViewport;
Drawer.Popup = DrawerPopup;
Drawer.SwipeArea = DrawerSwipeArea;
Drawer.Content = DrawerContent;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Close = DrawerClose;
Drawer.Handle = DrawerHandle;
Drawer.createHandle = createHandle;

export type { DrawerSwipeDirection } from './context/DrawerContext';
export type { DrawerProviderProps } from './fragments/DrawerProvider';
export type { DrawerIndentProps } from './fragments/DrawerIndent';
export type { DrawerIndentBackgroundProps } from './fragments/DrawerIndentBackground';
export type { DrawerRootProps } from './fragments/DrawerRoot';
export type { DrawerTriggerProps } from './fragments/DrawerTrigger';
export type { DrawerPortalProps } from './fragments/DrawerPortal';
export type { DrawerBackdropProps } from './fragments/DrawerBackdrop';
export type { DrawerViewportProps } from './fragments/DrawerViewport';
export type { DrawerPopupProps } from './fragments/DrawerPopup';
export type { DrawerSwipeAreaProps } from './fragments/DrawerSwipeArea';
export type { DrawerContentProps } from './fragments/DrawerContent';
export type { DrawerTitleProps } from './fragments/DrawerTitle';
export type { DrawerDescriptionProps } from './fragments/DrawerDescription';
export type { DrawerCloseProps } from './fragments/DrawerClose';
export type { DrawerHandleLike } from './context/DrawerContext';

export default Drawer;
