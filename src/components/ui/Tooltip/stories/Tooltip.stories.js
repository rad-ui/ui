import Tooltip from '../Tooltip';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import ScrollPlayground from '~/components/tools/ScrollPlayground/ScrollPlayground';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    render: (args) => <SandboxEditor>
        <ScrollPlayground>
            <Tooltip className="text-gray-1000" label="This is a tooltip" placement='left'>
                    Hello, hover me!
            </Tooltip>
        </ScrollPlayground>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
