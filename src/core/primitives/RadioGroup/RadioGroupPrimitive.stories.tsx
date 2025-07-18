import React, { useState, ChangeEvent, FormEvent } from 'react';
import RadioGroupPrimitive from './RadioGroupPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

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
            <RadioGroupPrimitive.Root
                orientation='horizontal' dir='rtl'
                name='test'
            //  defaultValue='css'
            >
                {options.map((option) => (
                    <label>
                        <RadioGroupPrimitive.Item key={option.id} value={option.value} className='w-4 h-4 rounded-full  bg-gray-1000'>
                            <RadioGroupPrimitive.Indicator className='w-4 h-4 rounded-full flex items-center justify-center bg-gray-500' />

                        </RadioGroupPrimitive.Item>
                        {option.label}
                    </label>
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

export const InForm = () => {
    const options: Option[] = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }
    ];
    const [selected, setSelected] = useState<string>('css');
    const [submitted, setSubmitted] = useState<string | null>(null);

    const handleChange = (value: string) => {
        setSelected(value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(selected);
    };

    return (
        <SandboxEditor>
            <form onSubmit={handleSubmit}>
                <RadioGroupPrimitive.Root
                // orientation="horizontal"
                    name="language"
                    value={selected}
                    onValueChange={handleChange}
                >
                    {options.map((option) => (
                        <label>
                            <RadioGroupPrimitive.Item key={option.id} value={option.value} className='w-4 h-4 rounded-full  bg-gray-1000'>
                                <RadioGroupPrimitive.Indicator className='w-4 h-4 rounded-full flex items-center justify-center bg-gray-500' />

                            </RadioGroupPrimitive.Item>
                            {option.label}
                        </label>
                    ))}
                </RadioGroupPrimitive.Root>
                <button type="submit" style={{ marginTop: 16 }}>Submit</button>
                {submitted && (
                    <div style={{ marginTop: 12 }}>
                        <strong>Submitted value:</strong> {submitted}
                    </div>
                )}
            </form>
        </SandboxEditor>
    );
};
