import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import DropdownMenuRoot from './fragments/DropdownMenuRoot';
import DropdownMenuTrigger from './fragments/DropdownMenuTrigger';
import DropdownMenuContent from './fragments/DropdownMenuContent';
import DropdownMenuPortal from './fragments/DropdownMenuPortal';
import DropdownMenuItem from './fragments/DropdownMenuItem';
import DropdownMenuSub from './fragments/DropdownMenuSub';
import DropdownMenuSubTrigger from './fragments/DropdownMenuSubTrigger';
import DropdownMenuSeparator from './fragments/DropdownMenuSeparator';

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
    Separator : typeof DropdownMenuSeparator;
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
DropdownMenu.Separator = DropdownMenuSeparator;

export type { DropdownMenuRootProps } from './fragments/DropdownMenuRoot';
export type { DropdownMenuTriggerProps } from './fragments/DropdownMenuTrigger';
export type { DropdownMenuContentProps } from './fragments/DropdownMenuContent';
export type { DropdownMenuPortalProps } from './fragments/DropdownMenuPortal';
export type { DropdownMenuItemProps } from './fragments/DropdownMenuItem';
export type { DropdownMenuSubProps } from './fragments/DropdownMenuSub';
export type { DropdownMenuSubTriggerProps } from './fragments/DropdownMenuSubTrigger';
export type { DropdownMenuSeparatorProps } from './fragments/DropdownMenuSeparator';
// Named part exports let React Server Components use `import * as DropdownMenu from '@radui/ui/DropdownMenu'`;
// property access on the default export is undefined across the client boundary.
export {
    DropdownMenuRoot as Root,
    DropdownMenuTrigger as Trigger,
    DropdownMenuContent as Content,
    DropdownMenuPortal as Portal,
    DropdownMenuItem as Item,
    DropdownMenuSub as Sub,
    DropdownMenuSubTrigger as SubTrigger,
    DropdownMenuSeparator as Separator
};

export default DropdownMenu;
