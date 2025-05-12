import SelectContent from "./fragments/SelectContent";
import SelectItem from "./fragments/SelectItem";
import SelectTrigger from "./fragments/SelectTrigger";
import SelectRoot from "./fragments/SelectRoot";
// import SelectGroup from "./fragments/SelectGroup";
// import SelectSeparator from "./fragments/SelectSeparator";

const Select = () => {
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
}

Select.Root = SelectRoot;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Trigger = SelectTrigger;
// Select.Group = SelectGroup;
// Select.Separator = SelectSeparator;

export default Select