
import {Tooltip, Heading} from '~/';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Input/Tooltip',
    component: Tooltip,
    render: (args) => <SandboxEditor>
        <div className=' bg-gray-400 p-4' >
            <div className='block'>
                <Heading className="text-gray-1000 mb-4">Tooltip</Heading>
                <Tooltip className="text-gray-1000" label="This is a tooltip">
                    Hello, hover me!
                </Tooltip>
            </div>
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
    },
};
