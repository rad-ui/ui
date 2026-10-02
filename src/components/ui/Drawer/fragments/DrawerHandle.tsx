'use client';
import React, { forwardRef, useCallback, useContext } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DrawerPopupContext } from '../context/DrawerPopupContext';

export type DrawerHandleProps = {
    className?: string;
};

const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(({
    className = '',
}, ref) => {
    const { rootClass } = useContext(DrawerContext);
    const { pointerProps, touchProps, dismissDirection } = useContext(DrawerPopupContext);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
        }
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            data-direction={dismissDirection}
            onKeyDown={handleKeyDown}
            className={clsx(rootClass && `${rootClass}-handle`, className)}
            {...pointerProps}
            {...touchProps}
        >
            <div className={`${rootClass}-handle-grip`} aria-hidden="true" />
        </div>
    );
});

DrawerHandle.displayName = 'DrawerHandle';

export default DrawerHandle;
