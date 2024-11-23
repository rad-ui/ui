import React, { useState } from 'react';
import TogglePrimitive from '../index';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/TogglePrimitive',
    component: TogglePrimitive,
    render: (args:any) => {
        const [pressed, setPressed] = useState(false);
        return <SandboxEditor>
            <TogglePrimitive.Root {...args} pressed={pressed} onPressedChange={setPressed}>
             toggle - {pressed ? 'on' : 'off'}
            </TogglePrimitive.Root>
        </SandboxEditor>;
    }
};

export const All = {
    args: {
        className: ''
    }
};
