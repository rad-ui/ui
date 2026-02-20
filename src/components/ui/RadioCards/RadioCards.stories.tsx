import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import RadioCards from './RadioCards';

const RadioCardsTemplate = () => {
    const options = [
        { id: 'config-1', value: '8-core CPU', label: '8-core CPU' },
        { id: 'config-2', value: '16-core CPU', label: '16-core CPU' },
        { id: 'config-3', value: '32-core CPU', label: '32-core CPU' }];

    return (
        <SandboxEditor>

            <RadioCards.Root >
                {options.map((option) => (
                    <RadioCards.Item key={option.id} value={option.value}>

                        {option.label}

                    </RadioCards.Item>
                ))}
            </RadioCards.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/RadioCards',
    component: RadioCards,
    render: () => <RadioCardsTemplate />
} as any;

export const All = {};
