import React from 'react';
import RadioPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/RadioPrimitive',
    component: RadioPrimitive,
    render: (args:React.ComponentProps<typeof RadioPrimitive>) => <SandboxEditor>

        <div className='flex flex-col gap-2'>

            <span>
                <form>
                    <RadioPrimitive {...args}/>
                    <label htmlFor='radio'>Radio 1</label>
                </form>
            </span>
        </div>
    </SandboxEditor>

};

export const All = {
    args: {
        onClick: (data: any) => {
            console.log('data', data);
        },
        name: 'radio',
        value: 'radio1',
        checked: true,
        required: true
    }
};

export const Disabled = {
    args: {
        disabled: true,
        name: 'radio',
        value: 'radio1',
        onClick: (data: any) => {
            console.log('data', data);
        }

    }
};
