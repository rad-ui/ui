import React, { useContext, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import { HoverCardPortalContext } from '../contexts/HoverCardPortalContext';

export type HoverCardContentElement = ElementRef<'div'>;
export type HoverCardContentProps = ComponentPropsWithoutRef<'div'> & {
    size?: string;
    forceMount?: boolean;
};

const HoverCardContent = forwardRef<HoverCardContentElement, HoverCardContentProps>(({ children, className, forceMount = false, size = '', ...props }, ref) => {
    const {
        isOpen,
        floatingRefs,
        floatingStyles,
        getFloatingProps,
        rootClass,
        closeWithDelay,
        openWithDelay,
        closeWithoutDelay
    } = useContext(HoverCardContext);
    const { forceMount: portalForceMount } = useContext(HoverCardPortalContext);

    useEffect(() => {
        const handleScroll = () => closeWithoutDelay();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [closeWithoutDelay]);

    const mergedRef = Floater.useMergeRefs([floatingRefs.setFloating, ref]);
    const dataAttributes = createDataAttributes('hover-card', { size });

    if (!isOpen && !forceMount && !portalForceMount) return null;

    return <div
        className={clsx(rootClass, className)}
        ref={mergedRef}
        data-state={isOpen ? 'open' : 'closed'}
        aria-hidden={!isOpen ? 'true' : undefined}
        style={{
            ...floatingStyles,
            visibility: isOpen ? undefined : 'hidden',
            pointerEvents: isOpen ? undefined : 'none'
        }}
        {...dataAttributes}
        {...getFloatingProps({
            onPointerEnter: openWithDelay,
            onPointerLeave: closeWithDelay,
            ...props
        })}>{children}</div>;
});

HoverCardContent.displayName = 'HoverCardContent';

export default HoverCardContent;
