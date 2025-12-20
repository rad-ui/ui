'use client';

import React from 'react';

import ToggleGroup from '@radui/ui/ToggleGroup';
import { Frame as FrameIcon, Crop as CropIcon, Layers as LayersIcon, Columns as ColumnsIcon } from 'lucide-react';

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const items = [
    { label: <FrameIcon/>, value: 'item1' },
    { label: <CropIcon/>, value: 'item2' },
    { label: <LayersIcon/>, value: 'item3' },
    { label: <ColumnsIcon/>, value: 'item4' }
];

const ToggleGroupExampleBasic = () => {
    const handleChange = (newPressed) => {
        console.log(newPressed);
    };

    return <div>
        <ToggleGroup
            defaultPressed={false}
            onPressedChange={handleChange}
            type="multiple"
            items = {items}
        >
        </ToggleGroup>
    </div>;
};

export default ToggleGroupExampleBasic;
