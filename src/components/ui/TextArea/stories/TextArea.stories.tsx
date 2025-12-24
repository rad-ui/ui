import React from 'react';
import TextArea from '../TextArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const Variants = ['solid', 'soft', 'outline', 'ghost'];
const Sizes = ['small', 'medium', 'large'];
const Resizes: Array<'none' | 'vertical' | 'horizontal' | 'both' | undefined> = ['none', 'vertical', 'horizontal', 'both', undefined ];
const Radius = ['none', 'small', 'medium', 'large'];
const Template = (args:any) => {
    return <SandboxEditor className="space-y-4 pt-4">
        <TextArea {...args} >

        </TextArea>

        <TextArea disabled placeholder='this textarea is disabled'/>
           

        <TextArea readonly className='w-10' placeholder='this textarea is readonly'/>
    </SandboxEditor>;
};

export default {
    title: 'WIP/TextArea',
    component: TextArea,
    render: (args: React.JSX.IntrinsicAttributes) => <Template {...args} />
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        placeholder: 'Type something here'
    }
};

export const Size = () =>{
    return <SandboxEditor className="space-y-4 pt-4">
        {Sizes.map((size) => (
            <TextArea key={size} size={size} placeholder={size} />
        ))}
    </SandboxEditor>;
}

export const Variant = () =>{
    return <SandboxEditor className="space-y-4 pt-4">
        {Variants.map((variant) => (
            <TextArea key={variant} variant={variant} placeholder={variant} />
        ))}
    </SandboxEditor>;
}

export const Resize = () =>{
    return <SandboxEditor className="space-y-4 pt-4">
        {Resizes.map((resize) => (
            <TextArea key={resize} resize={resize} placeholder={resize} />
        ))}
    </SandboxEditor>;
}

export const TextAreaRadius = () =>{
    return <SandboxEditor className="space-y-4 pt-4">
        {Radius.map((radius) => (
            <TextArea key={radius} radius={radius} placeholder={radius} />
        ))}
    </SandboxEditor>;
}
