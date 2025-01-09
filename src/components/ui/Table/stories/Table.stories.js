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
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' }
    ];

    const data = [
        { name: 'John Doe', age: 25, id: '1' },
        { name: 'Jane Doe', age: 24, id: '2' },
        { name: 'John Smith', age: 30, id: '3' },
        { name: 'Jane Smith', age: 29, id: '4' }
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
