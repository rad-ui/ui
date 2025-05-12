import SelectPrimitiveContent from "./fragments/SelectPrimitiveContent";
import SelectPrimitiveItem from "./fragments/SelectPrimitiveItem";
import SelectPrimitiveTrigger from "./fragments/SelectPrimitiveTrigger";
import SelectPrimitiveRoot from "./fragments/SelectPrimitiveRoot";

const SelectPrimitive = () =>{
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
}

SelectPrimitive.Root = SelectPrimitiveRoot;
SelectPrimitive.Content = SelectPrimitiveContent;
SelectPrimitive.Item = SelectPrimitiveItem;
SelectPrimitive.Trigger = SelectPrimitiveTrigger;

export default SelectPrimitive;