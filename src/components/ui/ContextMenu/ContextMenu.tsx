import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import ContextMenuRoot from './fragments/ContextMenuRoot';
import ContextMenuTrigger from './fragments/ContextMenuTrigger';
import ContextMenuContent from './fragments/ContextMenuContent';
import ContextMenuPortal from './fragments/ContextMenuPortal';
import ContextMenuItem from './fragments/ContextMenuItem';
import ContextMenuSub from './fragments/ContextMenuSub';
import ContextMenuSubTrigger from './fragments/ContextMenuSubTrigger';
import ContextMenuSeparator from './fragments/ContextMenuSeparator';
import ContextMenuCheckboxItem from './fragments/ContextMenuCheckboxItem';
import ContextMenuRadioGroup from './fragments/ContextMenuRadioGroup';
import ContextMenuRadioItem from './fragments/ContextMenuRadioItem';
import ContextMenuItemIndicator from './fragments/ContextMenuItemIndicator';
import ContextMenuGroup from './fragments/ContextMenuGroup';
import ContextMenuGroupLabel from './fragments/ContextMenuGroupLabel';

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
    Separator: typeof ContextMenuSeparator;
    CheckboxItem: typeof ContextMenuCheckboxItem;
    RadioGroup: typeof ContextMenuRadioGroup;
    RadioItem: typeof ContextMenuRadioItem;
    ItemIndicator: typeof ContextMenuItemIndicator;
    Group: typeof ContextMenuGroup;
    GroupLabel: typeof ContextMenuGroupLabel;
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
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.CheckboxItem = ContextMenuCheckboxItem;
ContextMenu.RadioGroup = ContextMenuRadioGroup;
ContextMenu.RadioItem = ContextMenuRadioItem;
ContextMenu.ItemIndicator = ContextMenuItemIndicator;
ContextMenu.Group = ContextMenuGroup;
ContextMenu.GroupLabel = ContextMenuGroupLabel;

export type { ContextMenuRootProps } from './fragments/ContextMenuRoot';
export type { ContextMenuTriggerProps } from './fragments/ContextMenuTrigger';
export type { ContextMenuContentProps } from './fragments/ContextMenuContent';
export type { ContextMenuPortalProps } from './fragments/ContextMenuPortal';
export type { ContextMenuItemProps } from './fragments/ContextMenuItem';
export type { ContextMenuSubProps } from './fragments/ContextMenuSub';
export type { ContextMenuSubTriggerProps } from './fragments/ContextMenuSubTrigger';
export type { ContextMenuSeparatorProps } from './fragments/ContextMenuSeparator';
export type { ContextMenuCheckboxItemProps } from './fragments/ContextMenuCheckboxItem';
export type { ContextMenuRadioGroupProps } from './fragments/ContextMenuRadioGroup';
export type { ContextMenuRadioItemProps } from './fragments/ContextMenuRadioItem';
export type { ContextMenuItemIndicatorProps } from './fragments/ContextMenuItemIndicator';
export type { ContextMenuGroupProps } from './fragments/ContextMenuGroup';
export type { ContextMenuGroupLabelProps } from './fragments/ContextMenuGroupLabel';
// Named part exports let React Server Components use `import * as ContextMenu from '@radui/ui/ContextMenu'`;
// property access on the default export is undefined across the client boundary.
export {
    ContextMenuRoot as Root,
    ContextMenuTrigger as Trigger,
    ContextMenuContent as Content,
    ContextMenuPortal as Portal,
    ContextMenuItem as Item,
    ContextMenuSub as Sub,
    ContextMenuSubTrigger as SubTrigger,
    ContextMenuSeparator as Separator,
    ContextMenuCheckboxItem as CheckboxItem,
    ContextMenuRadioGroup as RadioGroup,
    ContextMenuRadioItem as RadioItem,
    ContextMenuItemIndicator as ItemIndicator,
    ContextMenuGroup as Group,
    ContextMenuGroupLabel as GroupLabel
};

export default ContextMenu;
