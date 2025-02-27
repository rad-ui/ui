import { createContext } from "react";

type NavBarContextType = {
    isDocsNavOpen: boolean;
    setIsDocsNavOpen: (isDocsNavOpen: boolean) => void;
}

export const NavBarContext = createContext<NavBarContextType>({
    isDocsNavOpen: false,
    setIsDocsNavOpen: () => {}
});
