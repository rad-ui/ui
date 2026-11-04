import { createContext } from 'react';
import type { ContentPositioning } from '~/core/utils/placement';

type TooltipContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean, reason?: import('~/core/utils/openChangeDetails').OpenChangeReason, event?: Event) => void;
    data: any;
    interactions: any;
    context: any;
    arrowRef: React.RefObject<SVGSVGElement>;
    rootClass: string;
    /** True while a provider group is opening tooltips without delay. */
    isInstantPhase?: boolean;
    onOpenChangeComplete?: (open: boolean) => void;
    /** Content reports its `side`, `align` and offsets here. */
    setPositioning?: (positioning: ContentPositioning) => void;
    disabled?: boolean;
    triggerDisabledRef?: React.MutableRefObject<boolean>;
};
const TooltipContext = createContext<null | TooltipContextType>(null);

export default TooltipContext;
