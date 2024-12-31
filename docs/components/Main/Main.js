'use client';
import Theme from '@/components/layout/Theme';
import { useCallback, useState } from 'react';
import Button from '@radui/ui/Button';
import { parseCookies, setCookie } from 'nookies';

import NavBar from './NavBar';



const MainLayout = ({ darkModeSsrValue, children }) => {
    const cookies = parseCookies();
    const [darkMode, setDarkMode] = useState(darkModeSsrValue === 'true');




    return (
        <Theme isDark={darkMode} >
            <div className={`h-screen overflow-hidden ${darkMode ? 'rad-ui-dark-theme bg-black' : 'bg-white'}`} data-accent-color="red">
                {/* Navbar start */}
                <NavBar cookies={cookies} darkMode={darkMode} setDarkMode={setDarkMode} setCookie={setCookie} />
                {/* Navbar end */}
                <div className='h-screen overflow-scroll'>
                    {children}
                </div>
            </div>

        </Theme>
    );
};
export default MainLayout;
