
import Popper from './Popper';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tools/Popper',
    component: Popper,
    render: (args) => <SandboxEditor>
        <div className='overflow-scroll' style={{height: '200px', width: '400px'}}>
            <div className=' bg-gray-400 p-4' style={{width: '800px', height: '1200px'}}>
                <div className='block'>
                    <Popper pop="wassa" className="text-gray-1000">
                        <span>Reference Element</span>
                    </Popper>
                </div>
            </div>
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        className: '',
    },
};
