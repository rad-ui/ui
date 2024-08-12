import Switch from './Switch';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckBox = (args) => {

    const variants = ['classic','surface','solid']
    const handleChange = (state) => {
        setIsChecked(state);
    };
    return <SandboxEditor className="space-x-1">
            {variants.map((variant,index) => (
              <Switch defaultChecked={args} key={index} variant={variant} onChange={handleChange} {...args} /> 
            ))}  
             
           </SandboxEditor>;
          
};

export default {
    title: 'UI/Input/Switch',
    component: Switch,
    render: (args) => <CheckBox {...args}/>   
};

export const All = {};