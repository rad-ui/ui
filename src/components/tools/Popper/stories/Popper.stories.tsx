import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Popper from './Popper';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tools/Popper',
    component: Popper,
    render: (args: any) => <SandboxEditor>
        <div className='h-screen overflow-scroll' style={{ height: '200px', width: '400px' }}>
            <div className='p-4 bg-gray-400 ' style={{ width: '800px', height: '1200px' }}>
                <div className='block'>
                    <Popper pop="wassa" className="text-gray-1000">
                        <span>Reference Element</span>
                    </Popper>
                </div>
            </div>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        className: ''
    }
};
