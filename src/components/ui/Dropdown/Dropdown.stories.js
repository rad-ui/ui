
import Heading from '~/components/ui/Heading/Heading';
import Dropdown from '~/components/ui/Dropdown/Dropdown';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Input/Dropdown',
    component: Dropdown,
    render: (args) => <SandboxEditor>
        <div className=' bg-gray-400 p-4 overflow-auto' style={{height: '200px'}}>
            <div className='block' style={{height: '400px'}}>
                <div style={{marginBottom: '200px'}}>
                    <Heading className="text-gray-1000"> Dropdown</Heading>
                </div>

                <Dropdown
                    onSelect={() => {}} label={'Bello'} list={[
                        {value: `hello Hello this is a dropdown. Hello this is a dropdown. 
                        Hello this is a dropdown. Hello`, label: 'hello'},
                    ]}>
                    <div>
                        Hello this is a dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello this is a
                        dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello
                        this is a dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello this is a
                        dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello this is a dropdown. Hello
                    </div>
                </Dropdown>

                <div style={{marginTop: '200px'}}>
                    <Heading className="text-gray-1000"> Dropdown End</Heading>
                </div>
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
