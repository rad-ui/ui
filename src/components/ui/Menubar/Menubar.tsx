import MenubarRoot from './fragments/MenubarRoot';
import MenubarTrigger from './fragments/MenubarTrigger';
import MenubarContent from './fragments/MenubarContent';
import MenubarPortal from './fragments/MenubarPortal';
import MenubarItem from './fragments/MenubarItem';
import MenubarSub from './fragments/MenubarSub';
import MenubarSubTrigger from './fragments/MenubarSubTrigger';
import MenubarMenu from './fragments/MenubarMenu';
import MenubarSeparator from './fragments/MenubarSeparator';

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

export type { MenubarRootProps } from './fragments/MenubarRoot';
export type { MenubarMenuProps } from './fragments/MenubarMenu';
export type { MenubarTriggerProps } from './fragments/MenubarTrigger';
export type { MenubarContentProps } from './fragments/MenubarContent';
export type { MenubarPortalProps } from './fragments/MenubarPortal';
export type { MenubarItemProps } from './fragments/MenubarItem';
export type { MenubarSubProps } from './fragments/MenubarSub';
export type { MenubarSubTriggerProps } from './fragments/MenubarSubTrigger';
export type { MenubarSeparatorProps } from './fragments/MenubarSeparator';
export default Menubar;
