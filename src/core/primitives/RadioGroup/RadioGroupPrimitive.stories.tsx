import React from 'react';
import RadioGroupPrimitive from './RadioGroupPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { useState, ChangeEvent, FormEvent } from 'react';

interface Option {
    id: string;
    value: string;
    label: string;
}

interface RadioButtonProps {
    // Add any props you want to pass to RadioButton here
}

const RadioButton = (args: RadioButtonProps) => {
    const options: Option[] = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }
    ];

    const [language, setLanguage] = useState<string>('css');

    const handleChange = (item: string) => {
        setLanguage(item);
    };
    return (
        <SandboxEditor>
            <RadioGroupPrimitive.Root  >
                {options.map((option) => (
                    <RadioGroupPrimitive.Item key={option.id} value={option.value}>
                        {option.label}
                    </RadioGroupPrimitive.Item>
                ))}
            </RadioGroupPrimitive.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'Primitives/RadioGroupPrimitive',
    component: RadioGroupPrimitive,
    render: (args: RadioButtonProps) => <RadioButton {...args}/>
};

export const All = {};

const InFormTemplate = () => {
    const options: Option[] = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }
    ];

    const [language, setLanguage] = useState<string>('');

    const handleChange = (data: string) => {
        console.log('change', data);
        setLanguage(data);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit', language);
    };

    return (
        <SandboxEditor>
            <form onSubmit={handleFormSubmit}>
                <RadioGroupPrimitive.Root defaultChecked={language} onChange={handleChange} >
                    {options.map((option) => (
                        <RadioGroupPrimitive.Item key={option.id} value={option.value}>
                            {option.label}
                        </RadioGroupPrimitive.Item>
                    ))}
                </RadioGroupPrimitive.Root>
                <button type="submit">Submit</button>
            </form>
        </SandboxEditor>
    );
};

export const InForm = InFormTemplate.bind({});
