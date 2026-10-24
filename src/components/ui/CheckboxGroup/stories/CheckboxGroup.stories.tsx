import React, { useState } from 'react';
import CheckboxGroup from '../CheckboxGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckboxGroupExample = (args:any) => {
    const options = [
        { id: 'notifications', value: 'notifications', label: 'Email notifications' },
        { id: 'marketing', value: 'marketing', label: 'Marketing emails' },
        { id: 'security', value: 'security', label: 'Security alerts' }
    ];
    const [checked, setChecked] = useState(['notifications', 'security']);

    const handleChange = (value: string[]) => {
        setChecked(value);
    };

    return (
        <SandboxEditor>
            <div className="w-full max-w-md space-y-2">
                <h3 id="preferences-heading" className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <CheckboxGroup.Root
                    name="preferences"
                    value={checked}
                    onValueChange={handleChange}
                    aria-labelledby="preferences-heading"
                    {...args}
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
            </div>
        </SandboxEditor>
    );
};

export default {
    title: 'Components/CheckboxGroup',
    component: CheckboxGroup,
    render: (args:any) => <CheckboxGroupExample {...args} />
};

export const Basic = {};

const SelectAllExample = () => {
    const files = ['Invoice.pdf', 'Contract.docx', 'Photo.png'];
    const [selected, setSelected] = useState<string[]>(['Contract.docx']);
    return (
        <SandboxEditor>
            <CheckboxGroup.Root name="files" allValues={files} value={selected} onValueChange={setSelected} aria-label="Files">
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger parent>
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
                    Select all
                </CheckboxGroup.Label>
                {files.map((file) => (
                    <CheckboxGroup.Label key={file}>
                        <CheckboxGroup.Trigger value={file}>
                            <CheckboxGroup.Indicator />
                        </CheckboxGroup.Trigger>
                        {file}
                    </CheckboxGroup.Label>
                ))}
            </CheckboxGroup.Root>
        </SandboxEditor>
    );
};

export const SelectAll = {
    render: () => <SelectAllExample />
};
