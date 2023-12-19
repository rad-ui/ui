import Callout from './Callout';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Callout',
    component: Callout,
    render: (args) => <>
        <SandboxEditor className="space-y-2">
            <Callout>
                This is a Callout
            </Callout>

            <Callout color="red">
                This is a red Callout. A little bit longer text to see how it behaves.
            </Callout>

            <Callout color="gold">
                This is a Callout
            </Callout>
        </SandboxEditor>
    </>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
    },
};
