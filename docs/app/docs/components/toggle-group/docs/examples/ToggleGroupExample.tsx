'use client';

import React from 'react';
import ToggleGroup from '@radui/ui/ToggleGroup';
import { Columns3, Crop, Layers3, Square } from 'lucide-react';

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const items = [
    { label: <Square size={15} strokeWidth={2} />, value: 'item1' },
    { label: <Crop size={15} strokeWidth={2} />, value: 'item2' },
    { label: <Layers3 size={15} strokeWidth={2} />, value: 'item3' },
    { label: <Columns3 size={15} strokeWidth={2} />, value: 'item4' }
];

const ToggleGroupExampleBasic = () => {
    return <div>
        <ToggleGroup.Root type="multiple" defaultValue={['item1']}>
            {items.map((item) => (
                <ToggleGroup.Item key={item.value} value={item.value} iconOnly aria-label={item.value}>
                    {item.label}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    </div>;
};

export default ToggleGroupExampleBasic;
