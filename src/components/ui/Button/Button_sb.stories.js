import  Button  from './Button';
import "./css.variables.mock.css"
import SandboxEditor from "@/components/tools/SandboxEditor/SandboxEditor"



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Input/Button',
  component: Button,
  render: (args) => <SandboxEditor>
   <div className='flex space-x-2'>
   
      <Button variant="primary">Primary</Button>
      {/* <Button variant="secondary">Secondary</Button>x */}
      {/* <Button variant="tertiary">Tertiary</Button> */}
   </div>
  </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Storybook = {
  args: {
    className:''
  },
};