import { createContext } from 'react';

export type DrawerSwipeDirection = 'up' | 'down' | 'left' | 'right';

type DrawerContextType = {
    rootClass: string;
    swipeDirection: DrawerSwipeDirection;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    swipeDirection: 'down'
});
