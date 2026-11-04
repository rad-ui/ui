import { createContext } from 'react';

type TooltipProviderContextType = {
    openDelay: number;
    closeDelay: number;
};

const TooltipProviderContext = createContext<null | TooltipProviderContextType>(null);

export default TooltipProviderContext;
