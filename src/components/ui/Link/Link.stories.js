import Link from './Link';
import {Text} from '@/';
import SandboxEditor from '@/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Typography/Link',
    component: Link,
    render: (args) => <SandboxEditor>
        <div className='text-gray-950'>
            <Link href="https://www.google.com" target="_blank">Hello</Link>
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
    },
};
