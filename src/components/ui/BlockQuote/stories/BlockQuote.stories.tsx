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

const SHORT_TEXT = 'The best way to predict the future is to invent it.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const Variants = ['outline', 'soft'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

export default {
    title: 'Components/BlockQuote',
    component: BlockQuote,
    render: () => <SandboxEditor className="space-y-4">
        <div>
            <p className='text-gray-950 mb-2'>Default BlockQuote (no color prop)</p>
            <BlockQuote>
                {BLOCKQUOTE_TEXT}
            </BlockQuote>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop</p>
            <BlockQuote color="blue">
                {SHORT_TEXT}
            </BlockQuote>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>Soft Variant</p>
            <BlockQuote variant="soft">
                {SHORT_TEXT}
            </BlockQuote>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const DefaultTemplate = (args: any) => {
    return <SandboxEditor className="space-y-4">
        <div>
            <p className='text-gray-950 mb-2'>Default (no props)</p>
            <BlockQuote>
                {BLOCKQUOTE_TEXT}
            </BlockQuote>
        </div>
    </SandboxEditor>;
};

export const Default = DefaultTemplate.bind({});

const WithColorTemplate = (args: any) => {
    return <SandboxEditor className="space-y-4">
        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Blue</p>
            <BlockQuote color="blue">
                {SHORT_TEXT}
            </BlockQuote>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Red</p>
            <BlockQuote color="red">
                {SHORT_TEXT}
            </BlockQuote>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Gold</p>
            <BlockQuote color="gold">
                {SHORT_TEXT}
            </BlockQuote>
        </div>
    </SandboxEditor>;
};

export const WithColor = WithColorTemplate.bind({});

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-4'>
            <p className='text-gray-950 mb-4'>BlockQuote Sizes</p>
            <div className='space-y-6'>
                <div>
                    <p className='text-sm text-gray-600 mb-2'>Default (no color)</p>
                    <div className="flex flex-col gap-3">
                        {Sizes.map((size, index) => {
                            return (
                                <BlockQuote key={index} size={size}>
                                    {SHORT_TEXT}
                                </BlockQuote>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>With Color Prop</p>
                    <div className="flex flex-col gap-3">
                        {Sizes.map((size, index) => {
                            return (
                                <BlockQuote key={index} size={size} color="blue">
                                    {SHORT_TEXT}
                                </BlockQuote>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-4'>
            <p className='text-gray-950 mb-4'>BlockQuote Variants</p>
            <div className='space-y-4'>
                <div>
                    <p className='text-sm text-gray-600 mb-2'>Default</p>
                    <BlockQuote>
                        {SHORT_TEXT}
                    </BlockQuote>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Outline</p>
                    <BlockQuote variant="outline">
                        {SHORT_TEXT}
                    </BlockQuote>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Soft</p>
                    <BlockQuote variant="soft">
                        {SHORT_TEXT}
                    </BlockQuote>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Outline with Color</p>
                    <BlockQuote variant="outline" color="blue">
                        {SHORT_TEXT}
                    </BlockQuote>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Soft with Color</p>
                    <BlockQuote variant="soft" color="blue">
                        {SHORT_TEXT}
                    </BlockQuote>
                </div>
            </div>
        </div>
    </SandboxEditor>;
};
