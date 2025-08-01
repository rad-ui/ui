import SelectPrimitiveContent from './fragments/SelectPrimitiveContent';
import SelectPrimitiveItem from './fragments/SelectPrimitiveItem';
import SelectPrimitiveTrigger from './fragments/SelectPrimitiveTrigger';
import SelectPrimitiveRoot from './fragments/SelectPrimitiveRoot';
import SelectPrimitivePortal from './fragments/SelectPrimitivePortal';
import SelectPrimitiveGroup from './fragments/SelectPrimitiveGroup';
import SelectPrimitiveSearch from './fragments/SelectPrimitiveSearch';

const SelectPrimitive = () => {
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
};

SelectPrimitive.Root = SelectPrimitiveRoot;
SelectPrimitive.Content = SelectPrimitiveContent;
SelectPrimitive.Portal = SelectPrimitivePortal;
SelectPrimitive.Item = SelectPrimitiveItem;
SelectPrimitive.Trigger = SelectPrimitiveTrigger;
SelectPrimitive.Group = SelectPrimitiveGroup;
SelectPrimitive.Search = SelectPrimitiveSearch;

export default SelectPrimitive;
