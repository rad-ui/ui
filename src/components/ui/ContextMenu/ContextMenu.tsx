import ContextMenuRoot from './fragments/ContextMenuRoot';
import ContextMenuTrigger from './fragments/ContextMenuTrigger';
import ContextMenuContent from './fragments/ContextMenuContent';
import ContextMenuPortal from './fragments/ContextMenuPortal';
import ContextMenuItem from './fragments/ContextMenuItem';
import ContextMenuSub from './fragments/ContextMenuSub';
import ContextMenuSubTrigger from './fragments/ContextMenuSubTrigger';

const ContextMenu = () => {
    console.warn('Direct usage of ContextMenu is not supported. Please use ContextMenu.Root, ContextMenu.Item instead.');
    return null;
};

ContextMenu.Root = ContextMenuRoot;
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Portal = ContextMenuPortal;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.SubTrigger = ContextMenuSubTrigger;

export default ContextMenu;
