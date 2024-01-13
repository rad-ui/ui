import Card from '~/components/ui/Card/Card';
import Avatar from '~/components/ui/Avatar/Avatar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CardStory = () => {
    return <Card className="bg-gray-200" >
        <div className='flex items-center space-x-4'>
            <Avatar
                src='https://i.pravatar.cc/64'
                alt='avatar'
                size='lg'
            />
            <div>
                <p className='font-bold text-gray-1000'>John Doe</p>
                <p className='text-xs text-gray-800'>
                    1 hour ago
                </p>
            </div>

        </div>
    </Card>;
};
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Layout/Card',
    component: Card,
    render: (args) => <SandboxEditor><CardStory/></SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};

const Template = (args) => <div>
    <SandboxEditor className="gap-3 grid grid-cols-4">
        {Array(10).fill(0).map((_, i) => <CardStory key={i}/>)}
    </SandboxEditor>
</div>;
export const MultipleCards = Template.bind({});
