import React from 'react';
import Spinner from '../Spinner';

import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const Sizes = ['small', 'medium', 'large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Spinner',
    component: Spinner,
    render: (args: React.JSX.IntrinsicAttributes) => <SandboxEditor>
        <div className=''>
            {Sizes.map((size, index) => {
                return <Spinner key={index} size={size} {...args} />;
            })}
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
