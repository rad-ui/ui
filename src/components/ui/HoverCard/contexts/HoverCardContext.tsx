import { createContext } from 'react';

type HoverCardContextType = {
    isOpen: boolean;
    handleOpenChange: (open: boolean) => void;
    floatingRefs: {
        setReference: (node: HTMLElement | null) => void;
        setFloating: (node: HTMLElement | null) => void;
    };
    getReferenceProps: () => Record<string, any>;
    getFloatingProps: () => Record<string, any>;
    floatingStyles: React.CSSProperties;
    rootClass: string;
    closeWithDelay: () => void;
    closeWithoutDelay: () => void;
    openWithDelay: () => void;
    floatingContext: any;
    arrowRef: any;

};

const HoverCardContext = createContext<HoverCardContextType>({} as HoverCardContextType);

export default HoverCardContext;
