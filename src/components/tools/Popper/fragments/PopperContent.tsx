import React, { PropsWithChildren } from 'react';
import usePopper from '../context/usePopper';
import clsx from 'clsx';
import { FloatingPortal, FloatingArrow } from '@floating-ui/react';

export type PopperContentProps = PropsWithChildren<{
    showArrow?: boolean;
    className?: string
}>;

export default function PopperContent({ showArrow = true, className = '', children }: PopperContentProps) {
    const { isOpen, rootClass, floatingArrowRef: arrowRef, floating, interactions: { getFloatingProps } } = usePopper();

    const { refs: { setFloating }, floatingStyles, context } = floating;

    if (!isOpen) return null;

    return (
        <FloatingPortal root={document.body}>
            <div className={clsx(`${rootClass}-floating-element`, className)} ref={setFloating} style={floatingStyles} {...getFloatingProps()} >
                {showArrow && <FloatingArrow className={clsx(`rad-ui-arrow ${rootClass}-arrow`)} ref={arrowRef} context={context} />}
                {children}
            </div>
        </FloatingPortal>
    );
}
