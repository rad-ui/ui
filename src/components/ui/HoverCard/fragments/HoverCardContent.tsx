import React, { useContext, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';

export type HoverCardContentElement = ElementRef<'div'>;
export type HoverCardContentProps = ComponentPropsWithoutRef<'div'> & {
    size?: string;
};

const HoverCardContent = forwardRef<HoverCardContentElement, HoverCardContentProps>(({ children, className, size = '', ...props }, ref) => {
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

    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => closeWithoutDelay();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [closeWithoutDelay, isOpen]);

    const mergedRef = Floater.useMergeRefs([floatingRefs.setFloating, ref]);
    const dataAttributes = createDataAttributes('hover-card', { size });

    if (!isOpen) return null;

    return <div
        className={clsx(rootClass, className)}
        ref={mergedRef}
        style={floatingStyles}
        {...dataAttributes}
        {...getFloatingProps({
            onPointerEnter: openWithDelay,
            onPointerLeave: closeWithDelay,
            ...props
        })}>{children}</div>;
});

HoverCardContent.displayName = 'HoverCardContent';

export default HoverCardContent;
