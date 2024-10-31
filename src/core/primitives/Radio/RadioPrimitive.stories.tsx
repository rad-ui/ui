import React from "react";
import RadioPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/RadioPrimitive',
    component: RadioPrimitive,
    render: (args:React.ComponentProps<typeof RadioPrimitive>) => <SandboxEditor>

         <RadioPrimitive {...args} />
    </SandboxEditor>
    
    }

export const All = {
     args: {
        role: 'radio',
        children: 'Radio',
        checked: false,
     }
}

export const WithAriaLabel = {
     args: {
        role: 'radio',
        'aria-label': 'Aria label',
        children: 'Radio',
     }
}

export const Checked = {

     args: {
        role: 'radio',
        checked: true,
        children: 'Radio',
     }
}