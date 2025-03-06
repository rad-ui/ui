import React, { JSX } from 'react';
import BlockQuote, { BlockQuoteProps } from '../BlockQuote';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const BLOCKQUOTE_TEXT = `Avian carriers can provide high delay, low throughput, and low altitude
 service. The connection topology is limited to a single point-to-point path
 for each carrier, used with standard carriers, but many carriers can be used
 without significant interference with each other, outside early spring. This
 is because of the 3D ether space available to the carriers, in contrast to
 the 1D ether used by IEEE802.3. The carriers have an intrinsic collision
 avoidance system, which increases availability.`;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const Variants = []; // TODO
const Sizes = ['small', 'medium', 'large', 'x-large'];

export default {
    title: 'Components/BlockQuote',
    component: BlockQuote,
    render: (args: JSX.IntrinsicAttributes & BlockQuoteProps) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>
                <BlockQuote className='space-x-1' {...args}>
                    <div className='text-gray-950'>{BLOCKQUOTE_TEXT} </div>
                </BlockQuote>

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

export const Color = {
    args: {
        color: 'blue'
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>BlockQuote Size</p>
        </div>
        <div>

                <div className='mb-10'>
                    <span className="flex flex-col gap-3">
                        {Sizes.map((size, index) => {
                            return <BlockQuote key={index} size={size} >
                                <div>{BLOCKQUOTE_TEXT} </div>
                            </BlockQuote>;
                        })}
                    </span>
                </div>

        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>BlockQuote Variant</p>
        </div>
        <div className='flex flex-col gap-3'>
            {/* TODO */}
            <BlockQuote>
                <div>{BLOCKQUOTE_TEXT}</div>
            </BlockQuote>
       </div>
    </SandboxEditor>;
};