import Text from '../Text';

import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Text',
    component: Text,
    render: (args) => <SandboxEditor>
        <div >
            <Text {...args}>  {`I'm not a monkey
I will not dance even if the beat's funky`}  </Text>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithoutAs = {
    args: {
        className: 'text-gray-950'
    }
};

export const WithAs = {
    args: {
        className: 'text-gray-950',
        as: 'div'
    }
};

export const FaultyAs = {
    args: {
        className: 'text-gray-950',
        as: 'form'
    }
};
