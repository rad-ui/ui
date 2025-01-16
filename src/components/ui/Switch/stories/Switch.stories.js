import { useState } from 'react';
import Switch from '../Switch';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Switch',
    component: Switch,
    render: (args) => <CheckBox {...args}/>
};

const CheckBox = (args) => {
    const variants = ['classic', 'surface', 'solid'];
    
    const [isChecked, setIsChecked] = useState(true);
    const handleChange = (state) => {
        setIsChecked(state);
    };
    return <SandboxEditor className="flex flex-col gap-2">
        {variants.map((variant, index) => (
            <Switch checked={isChecked} key={index} variant={variant} onChange={handleChange} {...args} />
        ))}

    </SandboxEditor>;
};

export const All = {};
