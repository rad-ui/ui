'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

const SelectPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    { children: React.ReactNode } & React.ComponentPropsWithoutRef<typeof Floater.Portal>
>(({ children, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(SelectPrimitiveContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = (document.querySelector('#rad-ui-theme-container') || document.body) as HTMLElement | null;

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

SelectPrimitivePortal.displayName = 'SelectPrimitivePortal';

export default SelectPrimitivePortal;
