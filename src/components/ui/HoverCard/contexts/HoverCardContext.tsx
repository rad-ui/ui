import { createContext } from 'react';

type HoverCardContextType = {
    isOpen: boolean;
    handleOpenChange: (open: boolean) => void;
};

const HoverCardContext = createContext<HoverCardContextType>({
    isOpen: false,
    handleOpenChange: () => {}
});

export default HoverCardContext;
