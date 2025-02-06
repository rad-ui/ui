import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import SelectPrimitive from '.';

const options = ['New Tab','New Window','New InPrivate Window']
   
export default {
    title: 'Primitives/SelectPrimitive',
    component: SelectPrimitive,
    render: (args: React.JSX.IntrinsicAttributes) => <SandboxEditor>
       <div>
        <SelectPrimitive options={options} onChange={() => {}} {...args} />
        
     </div>   
    </SandboxEditor>

}

export const All = {
    args: {
        children: 'Select Option',
    }
}