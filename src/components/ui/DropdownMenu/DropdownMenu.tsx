import DropdownMenuRoot from './fragments/DropdownMenuRoot';
import DropdownMenuTrigger from './fragments/DropdownMenuTrigger';
import DropdownMenuContent from './fragments/DropdownMenuContent';
import DropdownMenuPortal from './fragments/DropdownMenuPortal';
import DropdownMenuItem from './fragments/DropdownMenuItem';
import DropdownMenuSub from './fragments/DropdownMenuSub';
import DropdownMenuSubTrigger from './fragments/DropdownMenuSubTrigger';

const DropdownMenu = () => {
    console.warn('Direct usage of DropdownMenu is not supported. Please use DropdownMenu.Root, DropdownMenu.Item instead.');
    return null;
};

DropdownMenu.Root = DropdownMenuRoot;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;

export default DropdownMenu;
