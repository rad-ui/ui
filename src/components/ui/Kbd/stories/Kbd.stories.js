import Kbd from '../Kbd';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Kbd',
    component: Kbd,
    render: (args) => <SandboxEditor>
        <div className='flex space-x-2'>
            <Kbd className='text-xs' >Ctrl + X</Kbd>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
