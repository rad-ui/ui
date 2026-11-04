import { createContext } from 'react';
import type { ContentPositioning } from '~/core/utils/placement';

type HoverCardContextType = {
    isOpen: boolean;
    handleOpenChange: (open: boolean, reason?: import('~/core/utils/openChangeDetails').OpenChangeReason, event?: Event) => void;
    floatingRefs: {
        setReference: (node: HTMLElement | null) => void;
        setPositionReference?: (node: any) => void;
        setFloating: (node: HTMLElement | null) => void;
    };
    getReferenceProps: (userProps?: Record<string, any>) => Record<string, any>;
    getFloatingProps: (userProps?: Record<string, any>) => Record<string, any>;
    floatingStyles: React.CSSProperties;
    rootClass: string;
    rootTriggerClass: string;
    closeWithDelay: (event?: Event, delay?: number) => void;
    closeWithoutDelay: () => void;
    openWithDelay: (event?: Event, delay?: number) => void;
    floatingContext: any;
    arrowRef: any;
    onOpenChangeComplete?: (open: boolean) => void;
    /** Content reports its `side`, `align` and offsets here. */
    setPositioning?: (positioning: ContentPositioning) => void;
    /** Where the card ended up, after flipping. */
    resolvedPlacement?: string;

};

const HoverCardContext = createContext<HoverCardContextType>({} as HoverCardContextType);

export default HoverCardContext;
