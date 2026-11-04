import React, { useMemo } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';

import TooltipProviderContext from '../context/TooltipProviderContext';

export interface TooltipProviderProps {
    children: React.ReactNode;
    /** Delay in ms before a tooltip in the group opens on hover. */
    openDelay?: number;
    /** Delay in ms before a tooltip in the group closes after the pointer leaves. */
    closeDelay?: number;
    /**
     * How long in ms after a tooltip closes that the next one in the group
     * opens instantly, without waiting for `openDelay`.
     */
    timeout?: number;
}

/**
 * Shares hover delays between tooltips. Once one tooltip has opened, moving to
 * another within `timeout` opens it instantly instead of waiting again.
 */
const TooltipProvider = ({ children, openDelay = 600, closeDelay = 0, timeout = 400 }: TooltipProviderProps) => {
    const value = useMemo(() => ({ openDelay, closeDelay }), [openDelay, closeDelay]);

    return (
        <TooltipProviderContext.Provider value={value}>
            <FloatingDelayGroup delay={{ open: openDelay, close: closeDelay }} timeoutMs={timeout}>
                {children}
            </FloatingDelayGroup>
        </TooltipProviderContext.Provider>
    );
};

TooltipProvider.displayName = 'TooltipProvider';

export default TooltipProvider;
