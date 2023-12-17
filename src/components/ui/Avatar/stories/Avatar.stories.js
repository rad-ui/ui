import Avatar from '../Avatar';
import SandboxEditor from '@/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data-Display/Avatar',
    component: Avatar,
    render: (args) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>
                <Avatar fallback="A" />
                <Avatar fallback="PK" />
                <Avatar fallback="BL" src="https://broken-link" />
                <Avatar fallback="MA" src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" />
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
