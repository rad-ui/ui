import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import RadioCards from './RadioCards';

const RadioCardsTemplate = () => {
    const options = [
        {
            id: 'plus',
            value: 'plus',
            title: 'Plus',
            description: 'For individuals and small teams.'
        },
        {
            id: 'pro',
            value: 'pro',
            title: 'Pro',
            description: 'For growing businesses.'
        },
        {
            id: 'enterprise',
            value: 'enterprise',
            title: 'Enterprise',
            description: 'For large teams and enterprises.'
        }
    ];

    return (
        <SandboxEditor>
            <RadioCards.Root
                defaultValue="plus"
                aria-label="Plan"
                className="[&>[role=group]]:flex [&>[role=group]]:w-full [&>[role=group]]:flex-col [&>[role=group]]:gap-4"
            >
                {options.map((option) => (
                    <RadioCards.Item key={option.id} value={option.value}>
                        <div className="rad-ui-radio-cards-title">{option.title}</div>
                        <div className="rad-ui-radio-cards-description">{option.description}</div>
                    </RadioCards.Item>
                ))}
            </RadioCards.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'Components/RadioCards',
    component: RadioCards,
    render: () => <RadioCardsTemplate />
} as any;

export const All = {};
