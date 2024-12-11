import React, { useContext, useEffect } from 'react';
import { clsx } from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';

type HoverCardContentProps = {
    children: React.ReactNode,
    props?: React.HTMLAttributes<HTMLElement>
}

const HoverCardContent = ({ children, ...props }: HoverCardContentProps) => {
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

    if (!isOpen) return null;
    return <div
        onPointerEnter={openWithDelay}
        onPointerLeave={closeWithDelay}
        className={clsx(rootClass)} {...props}
        ref={floatingRefs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}>{children}</div>;
};

export default HoverCardContent;
