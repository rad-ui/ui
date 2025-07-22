import Checkbox from '~/components/ui/Checkbox/Checkbox';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Checkbox',
    component: Checkbox
};

const CheckboxStory = () => {
    return <div>
        <Checkbox.Root>
            <Checkbox.Indicator/>

        </Checkbox.Root>
    </div>;
};

export const Default = () => <SandboxEditor>
    <CheckboxStory />
</SandboxEditor>;
