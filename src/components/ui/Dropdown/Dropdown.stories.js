
import {Dropdown} from '@/';
import SandboxEditor from '@/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Input/Dropdown',
    component: Dropdown,
    render: (args) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>
                Dropdown here
                <Dropdown onSelect={() => {}} label={'Bello'} options={[
                    {value: 'hello', label: 'hello'},
                ]}>Hello</Dropdown>

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
