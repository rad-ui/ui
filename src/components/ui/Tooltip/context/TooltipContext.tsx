import { createContext } from 'react';

type TooltipContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data: any;
    interactions: any;
    context: any;
    arrowRef: React.RefObject<SVGSVGElement>;
    rootClass: string;
    /** True while a provider group is opening tooltips without delay. */
    isInstantPhase?: boolean;
    onOpenChangeComplete?: (open: boolean) => void;
};
const TooltipContext = createContext<null | TooltipContextType>(null);

export default TooltipContext;
