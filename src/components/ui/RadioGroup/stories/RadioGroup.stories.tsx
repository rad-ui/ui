import React from 'react';
import RadioGroup from '../RadioGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const RadioButton = () => {
    const options = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }];

    return (
        <SandboxEditor>
            <RadioGroup.Root >
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
    title: 'WIP/RadioGroup',
    component: RadioGroup,
    render: () => <RadioButton />
};

export const All = {};
