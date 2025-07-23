import MenuPrimitiveRoot from './fragments/MenuPrimitiveRoot';
import MenuPrimitiveItem from './fragments/MenuPrimitiveItem';
import MenuPrimitiveTrigger from './fragments/MenuPrimitiveTrigger';
import MenuPrimitiveContent from './fragments/MenuPrimitiveContent';
import MenuPrimitiveGroup from './fragments/MenuPrimitiveGroup';

const MenuPrimitivePrimitive = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

MenuPrimitivePrimitive.Root = MenuPrimitiveRoot;
MenuPrimitivePrimitive.Item = MenuPrimitiveItem;
MenuPrimitivePrimitive.Trigger = MenuPrimitiveTrigger;
MenuPrimitivePrimitive.Content = MenuPrimitiveContent;
MenuPrimitivePrimitive.Group = MenuPrimitiveGroup;

export default MenuPrimitivePrimitive;