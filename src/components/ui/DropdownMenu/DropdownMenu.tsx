import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import DropdownMenuRoot from './fragments/DropdownMenuRoot';
import DropdownMenuTrigger from './fragments/DropdownMenuTrigger';
import DropdownMenuContent from './fragments/DropdownMenuContent';
import DropdownMenuPortal from './fragments/DropdownMenuPortal';
import DropdownMenuItem from './fragments/DropdownMenuItem';
import DropdownMenuSub from './fragments/DropdownMenuSub';
import DropdownMenuSubTrigger from './fragments/DropdownMenuSubTrigger';

export type DropdownMenuElement = ElementRef<'div'>;
export type DropdownMenuProps = ComponentPropsWithoutRef<'div'>;

type DropdownMenuComponent = React.ForwardRefExoticComponent<DropdownMenuProps & React.RefAttributes<DropdownMenuElement>> & {
    Root: typeof DropdownMenuRoot;
    Trigger: typeof DropdownMenuTrigger;
    Content: typeof DropdownMenuContent;
    Portal: typeof DropdownMenuPortal;
    Item: typeof DropdownMenuItem;
    Sub: typeof DropdownMenuSub;
    SubTrigger: typeof DropdownMenuSubTrigger;
};

const DropdownMenu = forwardRef<DropdownMenuElement, DropdownMenuProps>((_props, _ref) => {
    console.warn('Direct usage of DropdownMenu is not supported. Please use DropdownMenu.Root, DropdownMenu.Item instead.');
    return null;
}) as DropdownMenuComponent;

DropdownMenu.displayName = 'DropdownMenu';

DropdownMenu.Root = DropdownMenuRoot;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;

export default DropdownMenu;
