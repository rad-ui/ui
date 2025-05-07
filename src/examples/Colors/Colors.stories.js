import React, { useState } from 'react';

import colors from '~/design-systems/clarity/tokens/colors';

import ColorsTemplate from './ColorsTemplate';
import Theme from '~/components/ui/Theme/Theme';

const AllColorsTemplate = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <Theme appearance={darkMode ? 'dark' : 'light'}>
            <button className='text-gray-900' onClick={toggleDarkMode}>
                {darkMode ? 'Go To Light Mode' : 'Go To Dark Mode'}
            </button>
            <div className={`flex ${darkMode ? 'bg-black' : ''} `}>

                <div isDark={darkMode}>
                    <ColorsTemplate isDark={darkMode}/>
                </div>
            </div>
        </Theme>

    );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Colors',
    component: 'AllColorsTemplate',
    render: (args) => <AllColorsTemplate/>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
    }
};
