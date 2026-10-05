'use client';

import { useCallback, useState } from 'react';
import Button from '@radui/ui/Button';
import Cookies from 'js-cookie';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import NavBar from './NavBar';

import Theme from '@radui/ui/Theme';
import { SourceClassNamespaceProvider } from '@/components/SourceClassNamespaceProvider';



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
            classNamespace="rad-ui"
        >
            <SourceClassNamespaceProvider>
                <NavBarContext.Provider value={sendValues}>
                    <div className="flex h-screen flex-1 flex-col bg-gray-50" data-accent-color="gray">
                        {/* Navbar start */}
                        <header>
                            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} setThemeCookie={Cookies.set} />
                        </header>
                        {/* Navbar end */}
                        <main className="min-h-0 flex-1">
                            {children}
                        </main>
                    </div>
                </NavBarContext.Provider>
            </SourceClassNamespaceProvider>


        </Theme>
    );
};
export default MainLayout;
