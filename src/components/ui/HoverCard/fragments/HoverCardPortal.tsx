import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';

export type HoverCardPortalElement = ElementRef<typeof Floater.Portal>;
export type HoverCardPortalProps = ComponentPropsWithoutRef<typeof Floater.Portal> & {
    rootElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>;
};

const HoverCardPortal = forwardRef<HoverCardPortalElement, HoverCardPortalProps>(({ children, rootElement, ...props }, ref) => {
    const { rootTriggerClass } = useContext(HoverCardContext);
    const rootElem = rootElement || document.getElementsByClassName(rootTriggerClass)[0] as HTMLElement;

    return <Floater.Portal
        root={rootElem}
        {...props}
    >{children}</Floater.Portal>;
});

HoverCardPortal.displayName = 'HoverCardPortal';

export default HoverCardPortal;
