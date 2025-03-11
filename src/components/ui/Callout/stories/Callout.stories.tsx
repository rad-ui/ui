import Callout from '../Callout';
import Text from '~/components/ui/Text/Text';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const InfoIcon = () => {
    return (<svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>);
};
const Variants = ['soft', 'outline'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Callout',
    component: Callout,
    render: () => <>
        <SandboxEditor className="space-y-2">
            <Callout>
                <InfoIcon/> <span>This is a Callout</span>
            </Callout>

            <Callout color="red">
                This is a red Callout. A little bit longer text to see how it behaves.
            </Callout>

            <Callout color="gold">
                This is a Callout
            </Callout>
        </SandboxEditor>
    </>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

const DefaultTextTemplate = (args: any) => {
    return <SandboxEditor className="space-y-2">
        <Callout>
            <InfoIcon/> <span>This is a Callout</span>
        </Callout>
    </SandboxEditor>;
};

export const DefaultText = DefaultTextTemplate.bind();

const RedTextTemplate = (args: any) => {
    return <SandboxEditor className="space-y-2">
        <Callout color="red">
        This is a red Callout. A little bit longer text to see how it behaves.
        </Callout>
    </SandboxEditor>;
};
export const RedText = RedTextTemplate.bind();

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Callout Size</p>
        </div>
        <div>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Callout key={index} size={size} variant={variant} >
                                 <InfoIcon/> <span>This is a Callout</span>
                            </Callout>;
                        })}
                    </span>
                </div>
            ))}

        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Callout Variant</p>
        </div>
        <div className='flex space-x-2'>

                        {Variants.map((variant, index) => {
                            return <Callout key={index}  variant={variant} >
                                 <InfoIcon/> <span>This is a Callout</span>
                            </Callout>;
                        })}

        </div>
    </SandboxEditor>;
};
