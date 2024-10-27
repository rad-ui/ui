import Table from '../Table';
import Heading from '~/components/ui/Heading/Heading';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/Table',
    component: Table
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => {
    const columns = [
        { name: 'Name', key: 'name' },
        { name: 'Age', key: 'age' }
    ];

    const data = [
        { name: 'John Doe', age: 25, key: '1' },
        { name: 'Jane Doe', age: 24, key: '2' },
        { name: 'John Smith', age: 30, key: '3' },
        { name: 'Jane Smith', age: 29, key: '4' }
    ];

    return <SandboxEditor>
        <div className='mx-auto my-10' style={{ maxWidth: '720px' }}>
            <Heading as="h6" className="mb-4 text-gray-1000"> Table Example</Heading>
            <Table
                columns={columns}
                data={data}
                {...args}
            />
        </div>
    </SandboxEditor>;
};

export const Default = Template.bind({});
Default.args = {
    className: ''
};
