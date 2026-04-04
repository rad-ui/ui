import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Slider from '../Slider';

export default {
    title: 'WIP/Slider',
    component: Slider
} as any;

export const Basic = {
    render: () => {
        return <SandboxEditor>
            <div className="flex justify-center py-16">
                <Slider defaultValue={45} min={0} max={100} aria-label="Slider" />
            </div>
        </SandboxEditor>;
    }
};

export const VerticalWithMarks = {
    render: () => {
        return <SandboxEditor>
            <div className="flex h-[24rem] justify-center py-8">
                <Slider
                    aria-label="Vertical slider with marks"
                    orientation="vertical"
                    defaultValue={40}
                    min={0}
                    max={100}
                    marks={[0, 25, 50, 75, 100]}
                />
            </div>
        </SandboxEditor>;
    }
};
