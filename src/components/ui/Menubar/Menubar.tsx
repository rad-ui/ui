import MenubarRoot from './fragments/MenubarRoot';
import MenubarTrigger from './fragments/MenubarTrigger';
import MenubarContent from './fragments/MenubarContent';
import MenubarPortal from './fragments/MenubarPortal';
import MenubarItem from './fragments/MenubarItem';
import MenubarSub from './fragments/MenubarSub';
import MenubarSubTrigger from './fragments/MenubarSubTrigger';
import MenubarMenu from './fragments/MenubarMenu';
import MenubarSeparator from './fragments/MenubarSeparator';
import MenubarCheckboxItem from './fragments/MenubarCheckboxItem';
import MenubarRadioGroup from './fragments/MenubarRadioGroup';
import MenubarRadioItem from './fragments/MenubarRadioItem';
import MenubarItemIndicator from './fragments/MenubarItemIndicator';
import MenubarGroup from './fragments/MenubarGroup';
import MenubarGroupLabel from './fragments/MenubarGroupLabel';

const Menubar = () => {
    console.warn('Direct usage of Menubar is not supported. Please use Menubar.Root, Menubar.Item instead.');
    return null;
};

Menubar.Root = MenubarRoot;
Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
Menubar.Portal = MenubarPortal;
Menubar.Item = MenubarItem;
Menubar.Sub = MenubarSub;
Menubar.SubTrigger = MenubarSubTrigger;
Menubar.Separator = MenubarSeparator;
Menubar.CheckboxItem = MenubarCheckboxItem;
Menubar.RadioGroup = MenubarRadioGroup;
Menubar.RadioItem = MenubarRadioItem;
Menubar.ItemIndicator = MenubarItemIndicator;
Menubar.Group = MenubarGroup;
Menubar.GroupLabel = MenubarGroupLabel;

export type { MenubarRootProps } from './fragments/MenubarRoot';
export type { MenubarMenuProps } from './fragments/MenubarMenu';
export type { MenubarTriggerProps } from './fragments/MenubarTrigger';
export type { MenubarContentProps } from './fragments/MenubarContent';
export type { MenubarPortalProps } from './fragments/MenubarPortal';
export type { MenubarItemProps } from './fragments/MenubarItem';
export type { MenubarSubProps } from './fragments/MenubarSub';
export type { MenubarSubTriggerProps } from './fragments/MenubarSubTrigger';
export type { MenubarSeparatorProps } from './fragments/MenubarSeparator';
export type { MenubarCheckboxItemProps } from './fragments/MenubarCheckboxItem';
export type { MenubarRadioGroupProps } from './fragments/MenubarRadioGroup';
export type { MenubarRadioItemProps } from './fragments/MenubarRadioItem';
export type { MenubarItemIndicatorProps } from './fragments/MenubarItemIndicator';
export type { MenubarGroupProps } from './fragments/MenubarGroup';
export type { MenubarGroupLabelProps } from './fragments/MenubarGroupLabel';
// Named part exports let React Server Components use `import * as Menubar from '@radui/ui/Menubar'`;
// property access on the default export is undefined across the client boundary.
export {
    MenubarRoot as Root,
    MenubarMenu as Menu,
    MenubarTrigger as Trigger,
    MenubarContent as Content,
    MenubarPortal as Portal,
    MenubarItem as Item,
    MenubarSub as Sub,
    MenubarSubTrigger as SubTrigger,
    MenubarSeparator as Separator,
    MenubarCheckboxItem as CheckboxItem,
    MenubarRadioGroup as RadioGroup,
    MenubarRadioItem as RadioItem,
    MenubarItemIndicator as ItemIndicator,
    MenubarGroup as Group,
    MenubarGroupLabel as GroupLabel
};

export default Menubar;
