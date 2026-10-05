'use client';

import { useEffect, useState } from 'react';
import Button from '@radui/ui/Button';
import Cookies from 'js-cookie';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import NavBar from './NavBar';

import Theme from '@radui/ui/Theme';

export const DARK_MODE_COOKIE = 'darkMode';



// Pages are prerendered, so the server always renders the default (dark) theme.
// This runs while the HTML is parsed, before first paint, and switches the
// Theme container to light for visitors who chose it, so they never see a
// dark flash. React then syncs to the same value in the effect below.
const THEME_SCRIPT = `try{if(document.cookie.split('; ').indexOf('${DARK_MODE_COOKIE}=false')!==-1){document.currentScript.parentElement.setAttribute('data-rad-ui-theme','light')}}catch(e){}`;

const MainLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [isDocsNavOpen, setIsDocsNavOpen] = useState(false);

    useEffect(() => {
        if (Cookies.get(DARK_MODE_COOKIE) === 'false') {
            setDarkMode(false);
        }
    }, []);

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
            // THEME_SCRIPT may change data-rad-ui-theme before hydration.
            suppressHydrationWarning
        >
            <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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


        </Theme>
    );
};
export default MainLayout;
