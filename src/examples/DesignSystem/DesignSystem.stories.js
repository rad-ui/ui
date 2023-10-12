import "./mock.css"
import  {Button}  from '@/index';



const AllButtonsTemplate = ()=>{
    return (
        <div isDark={true}>
           <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
           </div>
        </div>
    )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/DesignSystem',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  render: (args) => <AllButtonsTemplate/>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
  args: {
  },
};