import React from 'react';

import AlertDialog from '../AlertDialog';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data-Display/AlertDialog',
    component: AlertDialog,
    render: (args:any) => <SandboxEditor>
        <AlertDialog
            {...args} content={
                <div className="flex flex-col gap-4 text-gray-100">
                    <h1>This is content</h1>
                </div>
            } />
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        children: 'This is trigger',
    },
};
