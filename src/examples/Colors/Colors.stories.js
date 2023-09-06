import {Theme} from '../../components/layout/index'

import colors from "../../colors/index"


const ColorBubble = ({colorClass})=>{
    return (
        <div className={`${colorClass}`} style={{width: "60px", height: "60px"}}>
        </div>
    )
}

const PaletteTemplate = ({isDark})=>{
  return <div>
     <div className={`p-4 border-2 border-black ${isDark?'bg-black':''}`}>
            <div className='flex'>
              <ColorBubble colorClass='bg-gray-50'/>
              <ColorBubble colorClass='bg-gray-100'/>
              <ColorBubble colorClass='bg-gray-200'/>
              <ColorBubble colorClass='bg-gray-300'/>
              <ColorBubble colorClass='bg-gray-400'/>
              <ColorBubble colorClass='bg-gray-500'/>
              <ColorBubble colorClass='bg-gray-600'/>
              <ColorBubble colorClass='bg-gray-700'/>
              <ColorBubble colorClass='bg-gray-800'/>
              <ColorBubble colorClass='bg-gray-900'/>
              <ColorBubble colorClass='bg-gray-950'/>
              <ColorBubble colorClass='bg-gray-1000'/>
            </div>
          </div>
  </div>
}

const AllColorsTemplate = ()=>{
  const isDark = true
    return (
        <div>
          <div className='text-gray-900 mb-2'>Let's go!</div>
          <Theme isDark={isDark}>
          <PaletteTemplate isDark={isDark}/>
        </Theme>
         <Theme isDark={false}>
          <PaletteTemplate isDark={false}/>
          </Theme>
        </div>
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