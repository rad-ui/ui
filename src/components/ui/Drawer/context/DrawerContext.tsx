import { createContext } from 'react';

type DrawerContextType = {
    rootClass: string;
    side: 'top' | 'right' | 'bottom' | 'left';
    transitionDuration: number;
    transitionTimingFunction: string;
    isOpen: boolean;
    handleOverlayClick: () => void;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    side: 'bottom',
    transitionDuration: 350,
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
    isOpen: false,
    handleOverlayClick: () => {}
});
