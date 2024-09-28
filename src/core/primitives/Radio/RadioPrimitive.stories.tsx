import React from "react";
import RadioPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/RadioPrimitive',
    component: RadioPrimitive,
    render: (args:any) => <SandboxEditor>

         <RadioPrimitive {...args} />
    </SandboxEditor>
    
    }

export const All = {
     args: {
        role: 'radio',
        children: 'Radio',
     }
}

export const WithAriaLabel = {
     args: {
        role: 'radio',
        label: 'Aria label',
        children: 'Radio',
     }
}

export const WithAriaChecked = {
     args: {
        role: 'radio',
        checked: true,
        children: 'Radio',
     }
}