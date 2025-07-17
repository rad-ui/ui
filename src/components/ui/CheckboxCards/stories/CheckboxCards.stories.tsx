import React, { useState } from 'react';
import CheckboxCards from '../CheckboxCards';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckboxCardsExample = (args:any) => {
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
            <CheckboxCards.Root
                className="flex gap-4"
                name="fruits"
                value={checked}
                onValueChange={handleChange}
            >
                {options.map((option) => (
                    <>

                        <CheckboxCards.Item value={option.value}>

                            {option.label}

                            <CheckboxCards.Content >
                                <CheckboxCards.Indicator />
                            </CheckboxCards.Content>
                        </CheckboxCards.Item>
                    </>
                ))}
            </CheckboxCards.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/CheckboxCards',
    component: CheckboxCards,
    render: (args:any) => <CheckboxCardsExample {...args} />
};

export const Basic = {};
