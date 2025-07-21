import React, { useState } from 'react';
import CheckboxGroup from '../CheckboxGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckboxGroupExample = (args:any) => {
    const options = [
        { id: 'apple', value: 'apple', label: 'Apple' },
        { id: 'banana', value: 'banana', label: 'Banana' },
        { id: 'cherry', value: 'cherry', label: 'Cherry' }
    ];
    const [checked, setChecked] = useState(['apple']);

    const handleChange = (value: string[]) => {
        setChecked(value);
    };

    return (
        <SandboxEditor>
            <CheckboxGroup.Root
                className="flex gap-4"
                name="fruits"
                value={checked}
                onValueChange={handleChange}
            >
                {options.map((option) => (

                    <CheckboxGroup.Label key={option.id}>
                        <CheckboxGroup.Trigger value={option.value}>
                            <CheckboxGroup.Indicator />
                        </CheckboxGroup.Trigger>
                        {option.label}
                    </CheckboxGroup.Label>

                ))}
            </CheckboxGroup.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/CheckboxGroup',
    component: CheckboxGroup,
    render: (args:any) => <CheckboxGroupExample {...args} />
};

export const Basic = {};
