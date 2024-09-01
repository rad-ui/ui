import Skeleton from './Skeleton';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data Display/Skeleton',
    component: Skeleton,
    render: (args) => {
        return <SandboxEditor>
            <div className='mt-5'>
                <div>
                    <Skeleton>
                Hello, how you doing?
                    </Skeleton>
                </div>

                <div>
                    <Skeleton>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </Skeleton>
                </div>

                <div>
                    <Skeleton>
                        <button>Click me</button>
                    </Skeleton>
                </div>
            </div>
        </SandboxEditor>;
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
    },
};
