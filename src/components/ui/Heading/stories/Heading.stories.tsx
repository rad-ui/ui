import React from "react"
import Heading from '../Heading';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Heading',
    component: Heading,
    render: () => <SandboxEditor>
        <div >
            <div className=' space-y-2'>
                <Heading className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

                <Heading as="h2" className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

                <Heading as="h3" className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

                <Heading as="h4" className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

                <Heading as="h5" className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

                <Heading as="h6" className='text-gray-1000'>
                The quick brown fox jumps over the lazy dog
                </Heading>

            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
