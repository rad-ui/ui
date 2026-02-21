import { createContext, useContext } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { FloatingContext, UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';

export interface PopoverContextValue {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: UseFloatingReturn;
    interactions: UseInteractionsReturn;
    context: FloatingContext;
    arrowRef: RefObject<SVGSVGElement>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopoverContext = (): PopoverContextValue => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error('Popover components must be used within a Popover.Root component');
    }
    return context;
};

export default PopoverContext;
