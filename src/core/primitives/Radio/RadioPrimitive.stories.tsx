import React from 'react';
import RadioPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/RadioPrimitive',
    component: RadioPrimitive,
    render: (args:React.ComponentProps<typeof RadioPrimitive>) => <SandboxEditor>

        <div className='flex flex-col gap-2'>
            <span>
                <RadioPrimitive name='radio' value='radio' onClick={() => {}} />
                <label htmlFor='radio'>Radio 1</label>
            </span>
            <span>
                <RadioPrimitive name='radio' value='radio2' onClick={() => {}} />
                <label htmlFor='radio2'>Radio 2</label>
            </span>
        </div>
    </SandboxEditor>

};

export const All = {
    args: {
        checked: true,
        value: 'radio',
        onClick: (data: any) => {
            console.log('data', data);
        }
    }
};
