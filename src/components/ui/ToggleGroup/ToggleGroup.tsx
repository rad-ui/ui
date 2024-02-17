import React from 'react';

import ToggleGroupRoot from './shards/ToggleGroupRoot';
import ToggleItem from './shards/ToggleItem';

const ToggleGroup = () => {
    return <ToggleGroupRoot>
       this is group
        <ToggleItem value="one">item 1</ToggleItem>
        <ToggleItem value="two">item 2</ToggleItem>
        <ToggleItem value="three">item 3</ToggleItem>
        <ToggleItem value="four">item 4</ToggleItem>
    </ToggleGroupRoot>;
};


ToggleGroup.Root = ToggleGroupRoot;
ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
