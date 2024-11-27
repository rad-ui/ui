import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/HoverCard',
    component: HoverCard,
    render: (args) => <SandboxEditor>
        <div >
            <div className=' space-y-2'>
                <HoverCard className='text-gray-1000'>
                    The quick brown fox jumps over the lazy dog
                </HoverCard>
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
