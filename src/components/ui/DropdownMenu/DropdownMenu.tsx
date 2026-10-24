import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import DropdownMenuRoot from './fragments/DropdownMenuRoot';
import DropdownMenuTrigger from './fragments/DropdownMenuTrigger';
import DropdownMenuContent from './fragments/DropdownMenuContent';
import DropdownMenuPortal from './fragments/DropdownMenuPortal';
import DropdownMenuItem from './fragments/DropdownMenuItem';
import DropdownMenuSub from './fragments/DropdownMenuSub';
import DropdownMenuSubTrigger from './fragments/DropdownMenuSubTrigger';
import DropdownMenuSeparator from './fragments/DropdownMenuSeparator';
import DropdownMenuCheckboxItem from './fragments/DropdownMenuCheckboxItem';
import DropdownMenuRadioGroup from './fragments/DropdownMenuRadioGroup';
import DropdownMenuRadioItem from './fragments/DropdownMenuRadioItem';
import DropdownMenuItemIndicator from './fragments/DropdownMenuItemIndicator';
import DropdownMenuGroup from './fragments/DropdownMenuGroup';
import DropdownMenuGroupLabel from './fragments/DropdownMenuGroupLabel';
import { createPopupHandle } from '~/core/utils/popupHandle';

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
    CheckboxItem: typeof DropdownMenuCheckboxItem;
    RadioGroup: typeof DropdownMenuRadioGroup;
    RadioItem: typeof DropdownMenuRadioItem;
    ItemIndicator: typeof DropdownMenuItemIndicator;
    Group: typeof DropdownMenuGroup;
    GroupLabel: typeof DropdownMenuGroupLabel;
    /** Creates a handle that connects triggers rendered outside DropdownMenu.Root. */
    createHandle: typeof createPopupHandle;
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
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenu.RadioItem = DropdownMenuRadioItem;
DropdownMenu.ItemIndicator = DropdownMenuItemIndicator;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.GroupLabel = DropdownMenuGroupLabel;
DropdownMenu.createHandle = createPopupHandle;

export type { DropdownMenuRootProps } from './fragments/DropdownMenuRoot';
export type { DropdownMenuTriggerProps } from './fragments/DropdownMenuTrigger';
export type { DropdownMenuContentProps } from './fragments/DropdownMenuContent';
export type { DropdownMenuPortalProps } from './fragments/DropdownMenuPortal';
export type { DropdownMenuItemProps } from './fragments/DropdownMenuItem';
export type { DropdownMenuSubProps } from './fragments/DropdownMenuSub';
export type { DropdownMenuSubTriggerProps } from './fragments/DropdownMenuSubTrigger';
export type { DropdownMenuSeparatorProps } from './fragments/DropdownMenuSeparator';
export type { DropdownMenuCheckboxItemProps } from './fragments/DropdownMenuCheckboxItem';
export type { DropdownMenuRadioGroupProps } from './fragments/DropdownMenuRadioGroup';
export type { DropdownMenuRadioItemProps } from './fragments/DropdownMenuRadioItem';
export type { DropdownMenuItemIndicatorProps } from './fragments/DropdownMenuItemIndicator';
export type { DropdownMenuGroupProps } from './fragments/DropdownMenuGroup';
export type { DropdownMenuGroupLabelProps } from './fragments/DropdownMenuGroupLabel';
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
    DropdownMenuSeparator as Separator,
    DropdownMenuCheckboxItem as CheckboxItem,
    DropdownMenuRadioGroup as RadioGroup,
    DropdownMenuRadioItem as RadioItem,
    DropdownMenuItemIndicator as ItemIndicator,
    DropdownMenuGroup as Group,
    DropdownMenuGroupLabel as GroupLabel,
    createPopupHandle as createHandle
};

export default DropdownMenu;
