import MenuPrimitiveRoot, { MenuPrimitiveRootProps } from './fragments/MenuPrimitiveRoot';
import MenuPrimitiveItem, { MenuPrimitiveItemProps } from './fragments/MenuPrimitiveItem';
import MenuPrimitiveTrigger, { MenuPrimitiveTriggerProps } from './fragments/MenuPrimitiveTrigger';
import MenuPrimitiveContent, { MenuPrimitiveContentProps } from './fragments/MenuPrimitiveContent';
import MenuPrimitiveSub, { MenuPrimitiveSubProps } from './fragments/MenuPrimitiveSub';
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

export namespace MenuPrimitiveProps {
    export type Root = MenuPrimitiveRootProps;
    export type Item = MenuPrimitiveItemProps;
    export type Trigger = MenuPrimitiveTriggerProps;
    export type Content = MenuPrimitiveContentProps;
    export type Sub = MenuPrimitiveSubProps;
}

export default MenuPrimitive;
