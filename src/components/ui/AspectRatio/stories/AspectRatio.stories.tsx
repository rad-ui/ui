import React, { JSX } from 'react';
import AspectRatio, { AspectRatioProps } from '../AspectRatio';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AspectRatio',
    component: AspectRatio,
    render: (args: JSX.IntrinsicAttributes & AspectRatioProps) => <SandboxEditor>
        <AspectRatio {...args} >
            <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="Image"
                src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg"
                alt="Landscape photograph"
            />
        </AspectRatio>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        className: '',
        ratio: '16/9'
    }
};
