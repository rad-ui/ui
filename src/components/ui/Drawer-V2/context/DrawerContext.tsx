import { createContext } from 'react';

type DrawerContextType = {
    rootClass: string;
    swipeDirection: 'left' | 'right' | 'top' | 'bottom';
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    swipeDirection: 'right'
});
