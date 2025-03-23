import Badge from '../Badge';
import Separator from '../../Separator/Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const ArrowIcon = ({ className }: { className:string}) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};
const BadgeText = 'Badge';
const Variants = ['soft', 'outline'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Badge',
    component: Badge,
    render: () => <SandboxEditor>
        <div className='flex space-x-2'>
            <Badge >Plum</Badge>
            <Separator orientation="vertical" />
            <Badge color="plum">Plum</Badge>
            <Badge color="red" >Red</Badge>
            <Badge color="gray" >Gray</Badge>
            <Separator orientation="vertical" />
            <Badge >

                <div>
                    With Icon
                </div>
                <ArrowIcon className=''/>
            </Badge>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Badge Size</p>
        </div>
        <div className=''>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Badge key={index} size={size} variant={variant} >
                                <div>{BadgeText} </div>
                            </Badge>;
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
            <p className='text-gray-950'>Badge Variant</p>
        </div>
        <div className='flex space-x-2'>

            {Variants.map((variant, index) => {
                return <Badge key={index} variant={variant} >
                    <div>{BadgeText} </div>
                </Badge>;
            })}

        </div>
    </SandboxEditor>;
};
