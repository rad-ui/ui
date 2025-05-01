import React, { useState } from 'react';
import Theme from '../Theme';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const CardComponent = ({ appearance }: { appearance: 'light' | 'dark' }) => {
    return <div className="bg-gray-50 p-4 rounded-lg">
        <h1 className="text-gray-950">Hello World, This is in {appearance} mode</h1>
    </div>;
};

export default {
    title: 'WIP/Theme',
    component: Theme,
    render: (args: React.JSX.IntrinsicAttributes) => {
        const [toggle, setToggle] = useState(false);
        return <SandboxEditor>
            <div>
                <Button onClick={() => setToggle(!toggle)}>Toggle Theme</Button>
            </div>
            <div className={'flex space-x-4 p-10'}>
                <div >
                    <Theme appearance={toggle ? 'dark' : 'light'}>
                        <CardComponent appearance={toggle ? 'dark' : 'light'} />
                    </Theme>
                </div>
                {/* Inverted */}
                <div >
                    <Theme appearance={toggle ? 'light' : 'dark'}>
                        <CardComponent appearance={toggle ? 'light' : 'dark'} />
                    </Theme>
                </div>
            </div>
        </SandboxEditor>;
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
};
