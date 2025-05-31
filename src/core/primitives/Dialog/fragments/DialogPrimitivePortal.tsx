'use client';
import React from 'react';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitivePortalProps = {
  children: React.ReactNode;
};

const DialogPrimitivePortal = ({ children }: DialogPrimitivePortalProps) => {
    const fallback = typeof document !== 'undefined' ? document.body : null;
    const rootElement = typeof document !== 'undefined' ? document.querySelector('#rad-ui-theme-container') || fallback : null;

    if (!rootElement) {
        return null;
    }

    return (
        <Floater.Portal
            root={rootElement}

        >
            {children}
        </Floater.Portal>
    );
};

export default DialogPrimitivePortal;
