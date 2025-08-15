import MenubarRoot from './fragments/MenubarRoot';
import MenubarTrigger from './fragments/MenubarTrigger';
import MenubarContent from './fragments/MenubarContent';
import MenubarPortal from './fragments/MenubarPortal';
import MenubarItem from './fragments/MenubarItem';
import MenubarSub from './fragments/MenubarSub';
import MenubarSubTrigger from './fragments/MenubarSubTrigger';
import MenubarMenu from './fragments/MenubarMenu';

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

export default Menubar;
