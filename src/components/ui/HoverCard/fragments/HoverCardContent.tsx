import React, { useContext, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';

export type HoverCardContentElement = ElementRef<'div'>;
export type HoverCardContentProps = ComponentPropsWithoutRef<'div'>;

const HoverCardContent = forwardRef<HoverCardContentElement, HoverCardContentProps>(({ children, className, ...props }, ref) => {
    const {
        isOpen,
        floatingRefs,
        floatingStyles,
        getFloatingProps,
        rootClass,
        closeWithDelay,
        closeWithoutDelay,
        openWithDelay
    } = useContext(HoverCardContext);

    useEffect(() => {
        const handleScroll = () => closeWithoutDelay();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [closeWithoutDelay]);

    const mergedRef = Floater.useMergeRefs([floatingRefs.setFloating, ref]);
    if (!isOpen) return null;

    return <div
        onPointerEnter={openWithDelay}
        onPointerLeave={closeWithDelay}
        className={clsx(rootClass, className)}
        ref={mergedRef}
        style={floatingStyles}
        {...props}
        {...getFloatingProps()}>{children}</div>;
});

HoverCardContent.displayName = 'HoverCardContent';

export default HoverCardContent;
