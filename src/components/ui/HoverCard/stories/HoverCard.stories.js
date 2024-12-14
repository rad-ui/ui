import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/HoverCard',
    component: HoverCard,
    render: (args) => {
        const Content = () => {
            return <div>
                <div className=' space-y-2'>
                The quick brown fox jumps over the lazy dog
                </div>
            </div>;
        };
        return <SandboxEditor className='bg-gray-200 h-[400px] flex items-center justify-center'>
            <HoverCard className='text-gray-900 text-center' content={<Content />} {...args} >
                <div className="p-10 bg-gray-100 rounded-md shadow">Hover me</div>
            </HoverCard>
        </SandboxEditor>;
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {

};

export const Controlled = {
    args: {
        open: true
    }
};
