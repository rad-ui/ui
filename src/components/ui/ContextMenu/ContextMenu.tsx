import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import ContextMenuRoot from './fragments/ContextMenuRoot';
import ContextMenuTrigger from './fragments/ContextMenuTrigger';
import ContextMenuContent from './fragments/ContextMenuContent';
import ContextMenuPortal from './fragments/ContextMenuPortal';
import ContextMenuItem from './fragments/ContextMenuItem';
import ContextMenuSub from './fragments/ContextMenuSub';
import ContextMenuSubTrigger from './fragments/ContextMenuSubTrigger';

export type ContextMenuElement = ElementRef<'div'>;
export type ContextMenuProps = ComponentPropsWithoutRef<'div'>;

type ContextMenuComponent = React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<ContextMenuElement>> & {
    Root: typeof ContextMenuRoot;
    Trigger: typeof ContextMenuTrigger;
    Content: typeof ContextMenuContent;
    Portal: typeof ContextMenuPortal;
    Item: typeof ContextMenuItem;
    Sub: typeof ContextMenuSub;
    SubTrigger: typeof ContextMenuSubTrigger;
};

const ContextMenu = forwardRef<ContextMenuElement, ContextMenuProps>((_props, _ref) => {
    console.warn('Direct usage of ContextMenu is not supported. Please use ContextMenu.Root, ContextMenu.Item instead.');
    return null;
}) as ContextMenuComponent;

ContextMenu.displayName = 'ContextMenu';

ContextMenu.Root = ContextMenuRoot;
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Portal = ContextMenuPortal;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.SubTrigger = ContextMenuSubTrigger;

export default ContextMenu;
