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
            id: 'marketing',
            value: 'marketing',
            title: 'Marketing emails',
            description: 'Receive occasional product news, feature updates, and launch announcements.'
        },
        {
            id: 'security',
            value: 'security',
            title: 'Security alerts',
            description: 'Get notified about important account activity and security-related changes.'
        }
    ];
    const [checked, setChecked] = useState(['notifications', 'security']);

    const handleChange = (value: string[]) => {
        setChecked(value);
    };

    return (
        <SandboxEditor>
            <div className="w-full max-w-[48rem] space-y-4">
                <CheckboxCards.Root
                    {...args}
                    name="preferences"
                    value={checked}
                    onValueChange={handleChange}
                >
                    {options.map((option) => (
                        <CheckboxCards.Item key={option.id} value={option.value}>
                            <CheckboxCards.Content>
                                <CheckboxCards.Indicator />
                            </CheckboxCards.Content>
                            <div className="flex-1">
                                <h3 className="mb-0.5 text-[0.75rem] font-semibold text-[var(--rad-ui-text-primary)]">{option.title}</h3>
                                <p className="text-[0.6875rem] leading-4 text-[var(--rad-ui-text-secondary)]">{option.description}</p>
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
