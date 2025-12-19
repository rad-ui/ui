import Callout from '../Callout';
import Text from '~/components/ui/Text/Text';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const InfoIcon = () => {
    return (<svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>);
};

const CheckIcon = () => {
    return (<svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2104L3.70446 8.51041C3.44905 8.26722 3.43023 7.86094 3.67342 7.60553C3.91661 7.35012 4.32289 7.33129 4.5783 7.57449L6.75267 9.70448L10.6018 4.40792C10.7907 4.11902 11.178 4.03795 11.4669 4.22684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>);
};

const AlertIcon = () => {
    return (<svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980363 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.77563 7.5 3.77563C7.88217 3.77563 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99152 8.766 6.98079 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.726 7.49989 9.726C7.9141 9.726 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>);
};

const Variants = ['soft', 'outline'] as const;
const Sizes = ['small', 'medium', 'large', 'x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Callout',
    component: Callout,
    render: () => <>
        <SandboxEditor className="space-y-4">
            <div>
                <p className='text-gray-950 mb-2'>Default Callout (no color prop)</p>
                <Callout.Root>
                    <Callout.Icon>
                        <InfoIcon/>
                    </Callout.Icon>
                    <Callout.Text>This is a default Callout with icon, title and description.</Callout.Text>
                </Callout.Root>
            </div>

            <div>
                <p className='text-gray-950 mb-2'>With Color Prop</p>
                <Callout.Root color="blue">
                    <Callout.Icon>
                        <InfoIcon/>
                    </Callout.Icon>
                    <Callout.Text>This is a blue Callout with accent colors.</Callout.Text>
                </Callout.Root>
            </div>

            <div>
                <p className='text-gray-950 mb-2'>Destructive Intent</p>
                <Callout.Root intent="destructive">
                    <Callout.Icon>
                        <AlertIcon/>
                    </Callout.Icon>
                    <Callout.Text>This is a destructive Callout for errors and warnings.</Callout.Text>
                </Callout.Root>
            </div>

            <div>
                <p className='text-gray-950 mb-2'>Destructive Intent with Outline Variant</p>
                <Callout.Root intent="destructive" variant="outline">
                    <Callout.Icon>
                        <AlertIcon/>
                    </Callout.Icon>
                    <Callout.Text>Destructive intent with outline visual treatment.</Callout.Text>
                </Callout.Root>
            </div>

            <div>
                <p className='text-gray-950 mb-2'>Destructive Intent with Soft Variant</p>
                <Callout.Root intent="destructive" variant="soft">
                    <Callout.Icon>
                        <AlertIcon/>
                    </Callout.Icon>
                    <Callout.Text>Destructive intent with soft visual treatment.</Callout.Text>
                </Callout.Root>
            </div>
        </SandboxEditor>
    </>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

const DefaultTemplate = (args: any) => {
    return <SandboxEditor className="space-y-4">
        <div>
            <p className='text-gray-950 mb-2'>Default (no props)</p>
            <Callout.Root>
                <Callout.Icon>
                    <InfoIcon/>
                </Callout.Icon>
                <Callout.Text>This is a default Callout with icon and text.</Callout.Text>
            </Callout.Root>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>Without Icon</p>
            <Callout.Root>
                <Callout.Text>This is a Callout without an icon.</Callout.Text>
            </Callout.Root>
        </div>
    </SandboxEditor>;
};

export const Default = DefaultTemplate.bind({});

const WithColorTemplate = (args: any) => {
    return <SandboxEditor className="space-y-4">
        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Blue</p>
            <Callout.Root color="blue">
                <Callout.Icon>
                    <InfoIcon/>
                </Callout.Icon>
                <Callout.Text>This is a blue Callout with accent colors applied.</Callout.Text>
            </Callout.Root>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Red</p>
            <Callout.Root color="red">
                <Callout.Icon>
                    <InfoIcon/>
                </Callout.Icon>
                <Callout.Text>This is a red Callout with accent colors applied.</Callout.Text>
            </Callout.Root>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Gold</p>
            <Callout.Root color="gold">
                <Callout.Icon>
                    <InfoIcon/>
                </Callout.Icon>
                <Callout.Text>This is a gold Callout with accent colors applied.</Callout.Text>
            </Callout.Root>
        </div>

        <div>
            <p className='text-gray-950 mb-2'>With Color Prop - Green (Success)</p>
            <Callout.Root color="green">
                <Callout.Icon>
                    <CheckIcon/>
                </Callout.Icon>
                <Callout.Text>This is a green success Callout with check icon.</Callout.Text>
            </Callout.Root>
        </div>
    </SandboxEditor>;
};

export const WithColor = WithColorTemplate.bind({});

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-4'>
            <p className='text-gray-950 mb-4'>Callout Sizes</p>
            <div className='space-y-6'>
                <div>
                    <p className='text-sm text-gray-600 mb-2'>Default Variant</p>
                    <div className="flex flex-wrap items-start gap-2">
                        {Sizes.map((size, index) => {
                            return (
                                <Callout.Root key={index} size={size}>
                                    <Callout.Icon>
                                        <InfoIcon/>
                                    </Callout.Icon>
                                    <Callout.Text>Size {size}</Callout.Text>
                                </Callout.Root>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>With Color Prop</p>
                    <div className="flex flex-wrap items-start gap-2">
                        {Sizes.map((size, index) => {
                            return (
                                <Callout.Root key={index} size={size} color="blue">
                                    <Callout.Icon>
                                        <InfoIcon/>
                                    </Callout.Icon>
                                    <Callout.Text>Size {size}</Callout.Text>
                                </Callout.Root>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Destructive Variant</p>
                    <div className="flex flex-wrap items-start gap-2">
                        {Sizes.map((size, index) => {
                            return (
                                <Callout.Root key={index} size={size} intent="destructive">
                                    <Callout.Icon>
                                        <AlertIcon/>
                                    </Callout.Icon>
                                    <Callout.Text>Size {size}</Callout.Text>
                                </Callout.Root>
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
            <p className='text-gray-950 mb-4'>Callout Variants</p>
            <div className='space-y-4'>
                <div>
                    <p className='text-sm text-gray-600 mb-2'>Default</p>
                    <Callout.Root>
                        <Callout.Icon>
                            <InfoIcon/>
                        </Callout.Icon>
                        <Callout.Text>This is a default Callout.</Callout.Text>
                    </Callout.Root>
                </div>

                {Variants.map((variant) => (
                    <div key={variant}>
                        <p className='text-sm text-gray-600 mb-2'>{variant.charAt(0).toUpperCase() + variant.slice(1)}</p>
                        <Callout.Root variant={variant}>
                            <Callout.Icon>
                                <InfoIcon/>
                            </Callout.Icon>
                            <Callout.Text>This is a {variant} Callout.</Callout.Text>
                        </Callout.Root>
                    </div>
                ))}

                <div>
                    <p className='text-sm text-gray-600 mb-2'>Destructive</p>
                    <Callout.Root intent="destructive">
                        <Callout.Icon>
                            <AlertIcon/>
                        </Callout.Icon>
                        <Callout.Text>This is a destructive Callout.</Callout.Text>
                    </Callout.Root>
                </div>

                {Variants.map((variant) => (
                    <div key={`${variant}-with-color`}>
                        <p className='text-sm text-gray-600 mb-2'>{variant.charAt(0).toUpperCase() + variant.slice(1)} with Color</p>
                        <Callout.Root variant={variant} color="blue">
                            <Callout.Icon>
                                <InfoIcon/>
                            </Callout.Icon>
                            <Callout.Text>This is a {variant} Callout with accent color.</Callout.Text>
                        </Callout.Root>
                    </div>
                ))}
            </div>
        </div>
    </SandboxEditor>;
};
