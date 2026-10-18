'use client';

import { useEffect, useState } from 'react';
import Button from '@radui/ui/Button';
import Cookies from 'js-cookie';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import NavBar from './NavBar';

import Theme from '@radui/ui/Theme';

export const DARK_MODE_COOKIE = 'darkMode';

// Pages can preview a theme without touching the user's saved choice:
//   window.dispatchEvent(new CustomEvent(THEME_PREVIEW_EVENT, { detail: 'light' | 'dark' | null }))
// null ends the preview. The FX hero uses this to flip the site mid-story.
export const THEME_PREVIEW_EVENT = 'rad-docs:theme-preview';



// Pages are prerendered, so the server always renders the default (dark) theme.
// This runs while the HTML is parsed, before first paint, and switches the
// Theme container to light for visitors who chose it, so they never see a
// dark flash. React then syncs to the same value in the effect below.
const THEME_SCRIPT = `try{if(document.cookie.split('; ').indexOf('${DARK_MODE_COOKIE}=false')!==-1){document.currentScript.parentElement.setAttribute('data-rad-ui-theme','light')}}catch(e){}`;

const MainLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [isDocsNavOpen, setIsDocsNavOpen] = useState(false);
    const [previewAppearance, setPreviewAppearance] = useState(null);

    useEffect(() => {
        if (Cookies.get(DARK_MODE_COOKIE) === 'false') {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        const onPreview = (event) => setPreviewAppearance(event.detail === 'light' || event.detail === 'dark' ? event.detail : null);
        window.addEventListener(THEME_PREVIEW_EVENT, onPreview);
        return () => window.removeEventListener(THEME_PREVIEW_EVENT, onPreview);
    }, []);

    const sendValues = {
        isDocsNavOpen,
        setIsDocsNavOpen,
        darkMode,
    };


    return (
        <Theme
            appearance={previewAppearance ?? (darkMode ? 'dark' : 'light')}
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
