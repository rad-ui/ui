import RadioGroup from './RadioGroup';
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
            <RadioGroup.Root defaultValue={language} items={options} onChange={handleChange} >
                {options.map((option) => (
                    <RadioGroup.Item key={option.id} value={option.value}>
                        {option.label}
                    </RadioGroup.Item>
                ))}
            </RadioGroup.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'UI/Input/RadioGroup',
    component: RadioGroup,
    render: (args) => <RadioButton {...args}/>
};

export const All = {};
