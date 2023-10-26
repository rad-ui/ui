import {Theme} from '../../components/layout/index'

import colors from "../../colors/index"


const ColorBubble = ({colorClass})=>{
    return (
        <div className={`${colorClass}`} style={{width: "60px", height: "60px"}}>
        </div>
    )
}

const AllColorsTemplate = ()=>{
  const isDark = false
    return (
        <Theme isDark={isDark}>
          <div className={`p-20 border-2 border-black ${isDark?'bg-black':''}`}>
            <div className='flex'>
              <ColorBubble colorClass='bg-gray-50' />
              <ColorBubble colorClass='bg-gray-100' />
              <ColorBubble colorClass='bg-gray-200' />
              <ColorBubble colorClass='bg-gray-300' />
              <ColorBubble colorClass='bg-gray-400' />
            </div>
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