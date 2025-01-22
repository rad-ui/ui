import React from 'react';

import ToggleGroupRoot from './fragments/ToggleGroupRoot';
import ToggleItem from './fragments/ToggleItem';

const COMPONENT_NAME = 'ToggleGroup';

const ToggleGroup = ({ type = 'single', items = [] as { value: any; label: any }[], color=''}) => {
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }
    return (
        <ToggleGroupRoot type={type} componentName={COMPONENT_NAME} >
            {
                items.map((item, index) => {
                    return (
                        <ToggleItem key={index} value={item.value} {...data_attributes}>
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
