import { useState } from 'react';
import Switch from './Switch'
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckBox = (args) => {
    const [isChecked, setIsChecked] = useState(true);
    const handleChange = (state) => {
        setIsChecked(state);
    };
    return <SandboxEditor className="space-x-1">
              <Switch defaultChecked={isChecked} onChange={handleChange} {...args} />
        
           </SandboxEditor>;
          
};

export default {
    title: 'UI/Input/Switch',
    component: Switch,
    render: (args) => <CheckBox {...args}/>   
};

export const All = {};