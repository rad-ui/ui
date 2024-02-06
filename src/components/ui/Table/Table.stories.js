
import Table from './Table';
import Heading from '~/components/ui/Heading/Heading';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';


export default {
    title: 'UI/Data Display/Table',
    component: Table,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <SandboxEditor>
    <div className='mx-auto my-10' style={{maxWidth: '720px'}}>
        <Heading as="h6" className="mb-4 text-gray-1000"> Table Example</Heading>
        <Table {...args} />
    </div>
</SandboxEditor>;

export const Default = Template.bind({});
Default.args = {
    className: '',
};
