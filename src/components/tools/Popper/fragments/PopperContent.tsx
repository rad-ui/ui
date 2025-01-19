import React, { PropsWithChildren } from 'react';
import usePopper from '../context/usePopper';
import clsx from 'clsx';
import { FloatingPortal, FloatingArrow } from '@floating-ui/react';

export type PopperContentProps = PropsWithChildren<{
    showArrow?: boolean;
}>;

export default function PopperContent({ showArrow, children }: PopperContentProps) {
    const { isOpen, rootClass, floatingArrowRef: arrowRef, floating, interactions: { getFloatingProps } } = usePopper();

    const { refs: { setFloating }, floatingStyles, context } = floating;

    return (
        <>
            {
                isOpen && <FloatingPortal> <div className={clsx(`${rootClass}-floating-element`)} ref={setFloating} style={floatingStyles} {...getFloatingProps()} >
                    {showArrow && <FloatingArrow className={clsx(`rad-ui-arrow ${rootClass}-arrow`)} ref={arrowRef} context={context} />}
                    {children}</div>
                </FloatingPortal>
            }
        </>
    );
}
