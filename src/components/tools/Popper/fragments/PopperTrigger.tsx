import React, { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import usePopper from '../context/usePopper';

export type TriggerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Trigger({ children, className = '', ...props }: TriggerProps) {
    const { rootClass, floating, interactions } = usePopper();
    const { refs: { setReference } } = floating;
    const { getReferenceProps } = interactions;

    return (
        <span className={clsx('rad-ui-popper', `${rootClass}-reference-element`, className)} ref={setReference} {...getReferenceProps({ onClick: () => { console.log('click'); } })} >
            {children}
        </span>)
    ;
}
