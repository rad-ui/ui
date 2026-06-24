import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import { HoverCardPortalContext } from '../contexts/HoverCardPortalContext';

export type HoverCardPortalElement = ElementRef<typeof Floater.Portal>;
export type HoverCardPortalProps = Omit<ComponentPropsWithoutRef<typeof Floater.Portal>, 'root'> & {
    container?: HTMLElement | null;
    forceMount?: boolean;
    /** @deprecated Use `container` instead. */
    rootElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>;
};

const HoverCardPortal = forwardRef<HoverCardPortalElement, HoverCardPortalProps>(({ children, container, forceMount = false, rootElement, ...props }, ref) => {
    const { rootTriggerClass, isOpen } = useContext(HoverCardContext);
    const themeContext = useContext(ThemeContext);
    const [rootElem, setRootElem] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const legacyRoot = rootElement && 'current' in rootElement
            ? rootElement.current
            : rootElement;

        const resolvedRoot = container
            || legacyRoot
            || themeContext?.portalRootRef.current
            || themeContext?.containerRef.current
            || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
            || document.querySelector('#rad-ui-theme-container') as HTMLElement | null
            || document.getElementsByClassName(rootTriggerClass)[0] as HTMLElement | undefined
            || document.body;

        setRootElem(resolvedRoot);
    }, [container, rootElement, rootTriggerClass, themeContext]);

    if (!rootElem) {
        return null;
    }

    if (!isOpen && !forceMount) {
        return null;
    }

    return (
        <HoverCardPortalContext.Provider value={{ forceMount }}>
            <Floater.Portal
                root={rootElem}
                {...props}
            >
                {children}
            </Floater.Portal>
        </HoverCardPortalContext.Provider>
    );
});

HoverCardPortal.displayName = 'HoverCardPortal';

export default HoverCardPortal;
