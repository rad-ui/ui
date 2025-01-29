import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import RadioCards from './RadioCards';

const RadioCardsTemplate = (args) => {
    const options = [
        { id: 'config-1', value: '8-core CPU', label: '8-core CPU' },
        { id: 'config-2', value: '16-core CPU', label: '16-core CPU' },
        { id: 'config-3', value: '32-core CPU', label: '32-core CPU' }];

    const [language, setLanguage] = useState('css');

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <SandboxEditor>

            <RadioCards.Root defaultChecked={language} onChange={handleChange} >
                {options.map((option) => (
                    <RadioCards.Item key={option.id} value={option.value}>
                        <div>
                            {option.label}
                        </div>
                    </RadioCards.Item>
                ))}
            </RadioCards.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/RadioCards',
    component: RadioCards,
    render: (args) => <RadioCardsTemplate {...args}/>
};

export const All = {};
All.args = {};
