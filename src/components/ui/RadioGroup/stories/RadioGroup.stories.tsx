import React from 'react';
import RadioGroup from '../RadioGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const RadioButton = () => {
    const options = [
        { id: 'default', value: 'default', label: 'Default' },
        { id: 'comfortable', value: 'comfortable', label: 'Comfortable' },
        { id: 'compact', value: 'compact', label: 'Compact' }
    ];

    return (
        <SandboxEditor>
            <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
                {options.map((option) => (
                    <RadioGroup.Label key={option.id}>
                        <RadioGroup.Item value={option.value}>
                            <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        {option.label}
                    </RadioGroup.Label>
                ))}
            </RadioGroup.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    render: () => <RadioButton />
};

export const All = {};
