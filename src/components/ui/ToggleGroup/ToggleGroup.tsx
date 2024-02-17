import React from 'react';

import ToggleGroupRoot from './shards/ToggleGroupRoot';
import ToggleItem from './shards/ToggleItem';

const ToggleGroup = () => {
    return <ToggleGroupRoot>
       this is group
        <ToggleItem>item 1</ToggleItem>
    </ToggleGroupRoot>;
};


ToggleGroup.Root = ToggleGroupRoot;

export default ToggleGroup;
