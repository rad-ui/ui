import RadioGroup from '../RadioGroup';
import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const RadioButton = () => {
    const options = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }];

    return (
        <SandboxEditor>
            <RadioGroup.Root>
                {options.map((option) => (
                    <RadioGroup.Item key={option.id} value={option.value} >
                        {option.label}
                    </RadioGroup.Item>
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
