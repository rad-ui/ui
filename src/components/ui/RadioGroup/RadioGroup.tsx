// No need for React import since JSX is not used directly in this file

import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';

// Define the type with the properties we'll add
type RadioGroupType = {
    Root: typeof RadioGroupRoot;
    Item: typeof RadioGroupItem;
};

const RadioGroup = {} as RadioGroupType;

RadioGroup.Root = RadioGroupRoot;
RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
