import React, { isValidElement, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import usePopper from '../context/usePopper';
import Primitive from '~/core/primitives/Primitive';

export type PopperTriggerProps = PropsWithChildren<{
  className?: string;
  asChild?: boolean
}>;

export default function PopperTrigger({ asChild, children, className = '', ...props }: PopperTriggerProps) {
    const { rootClass, floating, interactions } = usePopper();
    const { refs: { setReference } } = floating;
    const { getReferenceProps } = interactions;

    return (
        <Primitive.span asChild={asChild} className={clsx('rad-ui-popper', `${rootClass}-reference-element`, className)} ref={setReference} {...getReferenceProps()}>
            {children}
        </Primitive.span>)
    ;
}
