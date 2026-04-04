'use client';

import { useCallback, useState } from 'react';
import Button from '@radui/ui/Button';
import Cookies from 'js-cookie';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import NavBar from './NavBar';

import Theme from '@radui/ui/Theme';



const MainLayout = ({ darkModeSsrValue, children }) => {
    const [darkMode, setDarkMode] = useState(darkModeSsrValue === 'true');
    const [isDocsNavOpen, setIsDocsNavOpen] = useState(false);

    const sendValues = {
        isDocsNavOpen,
        setIsDocsNavOpen,
        darkMode,
    };


    return (
        <Theme
            appearance={darkMode ? 'dark' : 'light'}
            accentColor="gray"
        >
            <NavBarContext.Provider value={sendValues}>
                <div className={`flex flex-col flex-1 h-screen ${darkMode ? 'rad-ui-dark-theme bg-black' : 'bg-gray-50'}`} data-accent-color="gray">
                    {/* Navbar start */}
                    <NavBar darkMode={darkMode} setDarkMode={setDarkMode} setThemeCookie={Cookies.set} />
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
