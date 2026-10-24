import MenuPrimitiveRoot, { MenuPrimitiveRootProps } from './fragments/MenuPrimitiveRoot';
import MenuPrimitiveItem, { MenuPrimitiveItemProps } from './fragments/MenuPrimitiveItem';
import MenuPrimitiveTrigger, { MenuPrimitiveTriggerProps } from './fragments/MenuPrimitiveTrigger';
import MenuPrimitiveContent, { MenuPrimitiveContentProps } from './fragments/MenuPrimitiveContent';
import MenuPrimitiveSub, { MenuPrimitiveSubProps } from './fragments/MenuPrimitiveSub';
import MenuPrimitivePortal from './fragments/MenuPrimitivePortal';
import MenuPrimitiveCheckboxItem, { MenuPrimitiveCheckboxItemProps } from './fragments/MenuPrimitiveCheckboxItem';
import MenuPrimitiveRadioGroup, { MenuPrimitiveRadioGroupProps } from './fragments/MenuPrimitiveRadioGroup';
import MenuPrimitiveRadioItem, { MenuPrimitiveRadioItemProps } from './fragments/MenuPrimitiveRadioItem';
import MenuPrimitiveItemIndicator from './fragments/MenuPrimitiveItemIndicator';
import MenuPrimitiveGroup from './fragments/MenuPrimitiveGroup';
import MenuPrimitiveGroupLabel from './fragments/MenuPrimitiveGroupLabel';

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
MenuPrimitive.CheckboxItem = MenuPrimitiveCheckboxItem;
MenuPrimitive.RadioGroup = MenuPrimitiveRadioGroup;
MenuPrimitive.RadioItem = MenuPrimitiveRadioItem;
MenuPrimitive.ItemIndicator = MenuPrimitiveItemIndicator;
MenuPrimitive.Group = MenuPrimitiveGroup;
MenuPrimitive.GroupLabel = MenuPrimitiveGroupLabel;

export namespace MenuPrimitiveProps {
    export type Root = MenuPrimitiveRootProps;
    export type Item = MenuPrimitiveItemProps;
    export type Trigger = MenuPrimitiveTriggerProps;
    export type Content = MenuPrimitiveContentProps;
    export type Sub = MenuPrimitiveSubProps;
    export type CheckboxItem = MenuPrimitiveCheckboxItemProps;
    export type RadioGroup = MenuPrimitiveRadioGroupProps;
    export type RadioItem = MenuPrimitiveRadioItemProps;
}

export default MenuPrimitive;
