import { createContext, useContext } from 'react';

type DrawerContextType = {
    rootClass: string;
    side: 'top' | 'right' | 'bottom' | 'left';
    transitionDuration: number;
    transitionTimingFunction: string;
    isOpen: boolean;
    handleOverlayClick: () => void;
    nestingLevel: number;
    zIndex: number;
    dragProgress: number;
    handleDragProgress: (progress: number) => void;
    handleDragEnd: (finalProgress: number) => void;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    side: 'bottom',
    transitionDuration: 350,
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
    isOpen: false,
    handleOverlayClick: () => {},
    nestingLevel: 0,
    zIndex: 50,
    dragProgress: 0,
    handleDragProgress: () => {},
    handleDragEnd: () => {}
});

// Hook to get the current nesting level from parent drawer contexts
export const useDrawerNesting = () => {
    try {
        const parentContext = useContext(DrawerContext);
        // Check if we're actually in a parent drawer context (not the default)
        if (parentContext && parentContext.rootClass && parentContext.rootClass !== '') {
            return {
                nestingLevel: parentContext.nestingLevel + 1,
                zIndex: parentContext.zIndex + 10
            };
        }
        return {
            nestingLevel: 0,
            zIndex: 50
        };
    } catch {
        return {
            nestingLevel: 0,
            zIndex: 50
        };
    }
};
