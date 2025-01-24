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
    const [isChecked, setIsChecked] = useState(true)
    
    const handleChange = (state) => {
        setIsChecked(state);
    };
    return <SandboxEditor className="flex flex-col gap-2">
        {variants.map((variant, index) => (
            <Switch defaultChecked={args} key={index} variant={variant} onChange={handleChange} {...args}/>
        ))}

    </SandboxEditor>;
};

export const All = {};

export const controlled = () => {
    const [checked, setChecked] = useState(true);

    const handleToggle = () => {
         setChecked((prev) => !prev)
    }
         return <SandboxEditor>
            <Switch checked={checked} onChange={handleToggle}/>
        </SandboxEditor>
}

export const Uncontrolled = () => {
    
        return <SandboxEditor>
            <Switch defaultChecked ={true} onChange={() => {}}/>

        </SandboxEditor>
}
export const Color = {
    args: {
        color:"blue"
    }
}
