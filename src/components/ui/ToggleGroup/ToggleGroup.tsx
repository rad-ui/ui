import ToggleGroupRoot from './fragments/ToggleGroupRoot';
import ToggleItem from './fragments/ToggleItem';

const ToggleGroup = () => {
    console.warn('Direct usage of ToggleGroup is not supported. Please use ToggleGroup.Root, ToggleGroup.Item, etc. instead.');
    return null;
};

ToggleGroup.Root = ToggleGroupRoot;
ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
