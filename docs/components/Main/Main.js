'use client';
import Theme from '@/components/layout/Theme';
import { useCallback, useState } from 'react';
import Button from '@radui/ui/Button';
import { parseCookies, setCookie } from 'nookies';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import NavBar from './NavBar';



const MainLayout = ({ darkModeSsrValue, children }) => {
    const cookies = parseCookies();
    const [darkMode, setDarkMode] = useState(darkModeSsrValue === 'true');
    const [isDocsNavOpen, setIsDocsNavOpen] = useState(false);

    const sendValues = {
        isDocsNavOpen,
        setIsDocsNavOpen,
    }


    return (
        <Theme isDark={darkMode} >
                <NavBarContext.Provider value={sendValues}>
                <div className={`flex flex-col flex-1 h-screen ${darkMode ? 'rad-ui-dark-theme bg-black' : ''}`} data-accent-color="gray">
                    {/* Navbar start */}
                <NavBar cookies={cookies} darkMode={darkMode} setDarkMode={setDarkMode} setCookie={setCookie} />
                {/* Navbar end */}
                <>
                    {children}
                </>
            </div>
                </NavBarContext.Provider>


        </Theme>
    );
};
export default MainLayout;
