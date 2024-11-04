import RadioGroup from './RadioGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { useState } from 'react';

const RadioButton = (args) => {
    const options = [
        { id: 'html', value: 'html', label: 'HTML' },
        { id: 'css', value: 'css', label: 'CSS' },
        { id: 'javascript', value: 'javascript', label: 'JavaScript' }];

    const [language, setLanguage] = useState({});

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <SandboxEditor>
            {options.map((option) => (
                <RadioGroup
                    className='radioItems'{...args}
                    key={option.id}
                    id={option.id}
                    name='language'
                    value={option.value}
                    checked={language === option.value}
                    onChange={handleChange} >
                    <span id={option.id} >{option.label}</span>
                </RadioGroup>
            ))}
        </SandboxEditor>
    );
};

export default {
    title: 'UI/Input/RadioGroup',
    component: RadioGroup,
    render: (args) => <RadioButton {...args}/>
};

export const All = {};
