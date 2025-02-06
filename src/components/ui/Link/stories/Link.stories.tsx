import React from 'react';
import Link, { LinkProps } from '../Link';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Link',
    component: Link,
    render: (args: React.JSX.IntrinsicAttributes & LinkProps) => <SandboxEditor>
        <div className='text-gray-950'>
            <Link {...args}>Hello</Link>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        href: 'https://www.google.com',
        target: '_blank'
    }
};
