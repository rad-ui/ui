import { createContext } from 'react';

export type PopoverContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any;
    interactions: any;
    context: any;
    arrowRef: React.RefObject<SVGSVGElement>;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export default PopoverContext;
