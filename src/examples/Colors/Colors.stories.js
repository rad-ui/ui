import {Theme} from '../../components/layout/index'


const ColorBubble = ({color})=>{
    return (
        <div style={{width: "60px", height: "60px", backgroundColor: color}}>
        </div>
    )
}

const AllColorsTemplate = ()=>{
    return (
        <Theme isDark={true}>
           <div className='flex space-x-2'>
                <ColorBubble color="black" />
                <ColorBubble color="black" />
           </div>
        </Theme>
    )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Colors',
  component: 'AllColorsTemplate',
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
  render: (args) => <AllColorsTemplate/>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
  args: {
  },
};