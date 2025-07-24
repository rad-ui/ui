import MenuPrimitiveRoot from './fragments/MenuPrimitiveRoot';
import MenuPrimitiveItem from './fragments/MenuPrimitiveItem';
import MenuPrimitiveTrigger from './fragments/MenuPrimitiveTrigger';
import MenuPrimitiveContent from './fragments/MenuPrimitiveContent';
import MenuPrimitiveSub from './fragments/MenuPrimitiveSub';
import MenuPrimitivePortal from './fragments/MenuPrimitivePortal';

const MenuPrimitive = () => {
    console.warn('Direct usage of MenuPrimitive is not supported. Please use MenuPrimitive.Root, MenuPrimitive.Item instead.');
    return null;
};

MenuPrimitive.Root = MenuPrimitiveRoot;
MenuPrimitive.Item = MenuPrimitiveItem;
MenuPrimitive.Trigger = MenuPrimitiveTrigger;
MenuPrimitive.Content = MenuPrimitiveContent;
MenuPrimitive.Sub = MenuPrimitiveSub;
MenuPrimitive.Portal = MenuPrimitivePortal;

export default MenuPrimitive;
