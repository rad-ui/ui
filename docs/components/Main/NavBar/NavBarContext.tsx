'use client'
import { createContext } from "react";

type NavBarContextType = {
    isDocsNavOpen: boolean;
    setIsDocsNavOpen: (isDocsNavOpen: boolean) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (isSearchOpen: boolean) => void;
    darkMode?: boolean;
}

export const NavBarContext = createContext<NavBarContextType>({
    isDocsNavOpen: false,
    setIsDocsNavOpen: () => {},
    isSearchOpen: false,
    setIsSearchOpen: () => {},
    darkMode: false,
});
