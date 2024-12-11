import React from 'react';

import ToggleGroupRoot from './fragments/ToggleGroupRoot';
import ToggleItem from './fragments/ToggleItem';

const COMPONENT_NAME = 'ToggleGroup';

const ToggleGroup = ({ type = 'single', items = [] }) => {
    return (
        <ToggleGroupRoot type={type} componentName={COMPONENT_NAME}>
            {
                items.map((item, index) => {
                    return (
                        <ToggleItem key={index} value={item.value}>
                            {item.label}
                        </ToggleItem>
                    );
                })
            }

        </ToggleGroupRoot>
    );
};

ToggleGroup.displayName = COMPONENT_NAME;

ToggleGroup.Root = ToggleGroupRoot;
ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
