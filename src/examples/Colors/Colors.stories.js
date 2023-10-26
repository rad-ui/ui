import {Theme} from '../../components/layout/index'
import React, { useState } from 'react'

import colors from "../../colors/index"


import ColorsTemplate from './ColorsTemplate'



const AllColorsTemplate = ()=>{
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)

  
  }
    return (
      <div>
        <button className='text-gray-900' onClick={toggleDarkMode}>
          {darkMode ? 'Go To Light Mode' : 'Go To Dark Mode'}
        </button>
        <div className={`flex ${darkMode?'bg-black':''} `}>
          
          <Theme isDark={darkMode}>
           <ColorsTemplate isDark={darkMode}/>
         </Theme>
       </div>
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