import RadioGroup from './RadioGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const RadioButton = (args) => {
      return (
        <SandboxEditor>
              <RadioGroup />
        </SandboxEditor>
      )
}

export default {
    title: 'UI/Input/RadioGroup',
    component: RadioGroup,
    render: (args) => <RadioButton {...args}/>   
};

export const All = {};