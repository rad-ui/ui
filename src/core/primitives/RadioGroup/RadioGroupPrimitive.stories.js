import RadioGroupPrimitive from './RadioGroupPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { useState } from 'react';

const RadioButton = (args) => {
    const options = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }];

    const [language, setLanguage] = useState('css');

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <SandboxEditor>
            <RadioGroupPrimitive.Root defaultChecked={language} items={options} onChange={handleChange} >
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
    render: (args) => <RadioButton {...args}/>
};

export const All = {};

const InFormTemplate = () => {
    const options = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }];

    const [language, setLanguage] = useState('');

    const handleChange = (data) => {
        console.log('change', data);
        setLanguage(data);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('submit', language);
    };

    return (
        <SandboxEditor>
            <form onSubmit={handleFormSubmit}>
                <RadioGroupPrimitive.Root defaultChecked={language} items={options} onChange={handleChange} >
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
InForm.args = {
    defaultValue: 'css'
};
