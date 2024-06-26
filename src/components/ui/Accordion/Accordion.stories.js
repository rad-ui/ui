import Accordion from './Accordion';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data-Display/Accordion',
    component: Accordion,
    render: (args) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>
                <Accordion {...args} />

            </div>
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        items: [
            {title: 'Section 1', content: 'Content for Section 1'},
            {title: 'Section 2', content: 'Content for Section 2'},
            // Add more items as needed
        ],
    },
};
