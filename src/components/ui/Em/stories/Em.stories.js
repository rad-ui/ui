import Em from '../Em';
import Heading from '../../Heading/Heading';

import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Em',
    component: Em,
    render: (args) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>

                <Heading className="text-gray-1000">
                    Hello <Em className='text-gray-950'>World,</Em> How you doin?
                </Heading>

            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
