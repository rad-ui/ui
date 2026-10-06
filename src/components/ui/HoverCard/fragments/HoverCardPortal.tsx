import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import { HoverCardPortalContext } from '../contexts/HoverCardPortalContext';

export type HoverCardPortalElement = ElementRef<typeof Floater.Portal>;
export type HoverCardPortalProps = ComponentPropsWithoutRef<typeof Floater.Portal> & {
    /** Element to portal into. Defaults to the Theme's portal root, then the Theme container, then `document.body`. */
    container?: HTMLElement | null;
    /** Keep the content mounted while closed, e.g. for exit animations. */
    forceMount?: boolean;
    /** @deprecated Use `container`. */
    rootElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>;
};

const HoverCardPortal = forwardRef<HoverCardPortalElement, HoverCardPortalProps>(({ children, container, forceMount = false, rootElement, ...props }, ref) => {
    const themeContext = useContext(ThemeContext);
    const [rootElem, setRootElem] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const explicitRoot = container
            ?? (rootElement && 'current' in rootElement ? rootElement.current : rootElement);

        const resolvedRoot = explicitRoot
            || themeContext?.portalRootRef.current
            || themeContext?.containerRef.current
            || document.body;

        setRootElem(resolvedRoot);
    }, [container, rootElement, themeContext]);

    if (!rootElem) {
        return null;
    }

    return (
        <HoverCardPortalContext.Provider value={{ forceMount }}>
            <Floater.Portal root={rootElem} {...props}>
                {children}
            </Floater.Portal>
        </HoverCardPortalContext.Provider>
    );
});

HoverCardPortal.displayName = 'HoverCardPortal';

export default HoverCardPortal;
