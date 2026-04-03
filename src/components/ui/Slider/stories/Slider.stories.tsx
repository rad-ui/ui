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
