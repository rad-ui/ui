import React, { Children } from 'react';
import VisuallyHidden, { VisuallyHiddenProps } from '../VisuallyHidden';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/VisuallyHidden',
    component: VisuallyHidden,
    render: (args: VisuallyHiddenProps) => <SandboxEditor>
        <VisuallyHidden {...args}>
                {args.children}
            </VisuallyHidden>
    </SandboxEditor>
};


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        className:"",
        children: "This is a visually hidden text",
    }
};

export const WithAsChild = {
    args: {
        asChild: true, 
        children: <span>This is a visually hidden text </span>,       
    }
};
