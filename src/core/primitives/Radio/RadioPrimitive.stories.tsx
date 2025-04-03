import React from 'react';
import RadioPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/RadioPrimitive',
    component: RadioPrimitive,
    render: (args:React.ComponentProps<typeof RadioPrimitive>) => <SandboxEditor>

        <div className='flex flex-col gap-2'>
            <span>
                <RadioPrimitive name='radio' value='radio' checked={true} />
                <label htmlFor='radio'>Radio 1</label>
            </span>
            <span>
                <RadioPrimitive name='radio' value='radio2'/>
                <label htmlFor='radio2'>Radio 2</label>
            </span>
        </div>
    </SandboxEditor>

};

export const All = {
    args: {
        onClick: (data: any) => {
            console.log('data', data);
        }
    }
};
