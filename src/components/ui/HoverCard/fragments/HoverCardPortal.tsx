import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type HoverCardPortalElement = ElementRef<typeof Floater.Portal>;
export type HoverCardPortalProps = ComponentPropsWithoutRef<typeof Floater.Portal> & {
    rootElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>;
};

const HoverCardPortal = forwardRef<HoverCardPortalElement, HoverCardPortalProps>(({ children, rootElement, ...props }, ref) => {
    const { rootTriggerClass } = useContext(HoverCardContext);
    const themeContext = useContext(ThemeContext);
    const [rootElem, setRootElem] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const explicitRoot = rootElement && 'current' in rootElement
            ? rootElement.current
            : rootElement;

        const resolvedRoot = explicitRoot
            || themeContext?.portalRootRef.current
            || themeContext?.containerRef.current
            || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
            || document.querySelector('#rad-ui-theme-container') as HTMLElement | null
            || document.getElementsByClassName(rootTriggerClass)[0] as HTMLElement | undefined
            || document.body;

        setRootElem(resolvedRoot);
    }, [rootElement, rootTriggerClass, themeContext]);

    if (!rootElem) {
        return null;
    }

    return <Floater.Portal
        root={rootElem}
        {...props}
    >{children}</Floater.Portal>;
});

HoverCardPortal.displayName = 'HoverCardPortal';

export default HoverCardPortal;
