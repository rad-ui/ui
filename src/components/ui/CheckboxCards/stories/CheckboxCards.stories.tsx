import React, { useState } from 'react';
import CheckboxCards from '../CheckboxCards';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckboxCardsExample = (args:any) => {
    const options = [
        {
            id: 'notifications',
            value: 'notifications',
            title: 'Enable notifications',
            description: 'You can enable or disable notifications at any time.'
        },
        {
            id: 'updates',
            value: 'updates',
            title: 'Receive product updates',
            description: 'Get occasional release notes and product announcements.'
        }
    ];
    const [checked, setChecked] = useState(['notifications']);

    const handleChange = (value: string[]) => {
        setChecked(value);
    };

    return (
        <SandboxEditor>
            <div className="w-full max-w-[29rem] space-y-4">
                <CheckboxCards.Root
                    name="preferences"
                    value={checked}
                    onValueChange={handleChange}
                    {...args}
                >
                    {options.map((option) => (
                        <CheckboxCards.Item key={option.id} value={option.value}>
                            <CheckboxCards.Content>
                                <CheckboxCards.Indicator />
                            </CheckboxCards.Content>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1 text-gray-950">{option.title}</h3>
                                <p className="text-sm text-gray-700">{option.description}</p>
                            </div>
                        </CheckboxCards.Item>
                    ))}
                </CheckboxCards.Root>
            </div>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/CheckboxCards',
    component: CheckboxCards,
    render: (args:any) => <CheckboxCardsExample {...args} />
};

export const Basic = {};
