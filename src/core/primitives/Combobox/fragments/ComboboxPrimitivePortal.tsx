'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';

const ComboboxPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    { children: React.ReactNode; container?: HTMLElement | null } & React.ComponentPropsWithoutRef<typeof Floater.Portal>
>(({ children, container, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(ComboboxPrimitiveContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = (container || document.querySelector('#rad-ui-theme-container') || document.body) as HTMLElement | null;

    useEffect(() => {
        if (rootElement) {
            setRootElementFound(true);
        }
    }, [rootElement]);

    if (!isOpen || !rootElementFound) return null;

    return (
        <Floater.Portal root={rootElement} {...props}>
            {children}
        </Floater.Portal>
    );
});

ComboboxPrimitivePortal.displayName = 'ComboboxPrimitivePortal';

export default ComboboxPrimitivePortal;
