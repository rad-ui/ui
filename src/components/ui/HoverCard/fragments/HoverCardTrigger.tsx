import React, { useContext } from 'react';
import { clsx } from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';

type HoverCardTriggerProps = {
    children: React.ReactNode,
    props?: React.HTMLAttributes<HTMLElement>
    className?: string
}

const HoverCardTrigger = ({ children, className = '', ...props }: HoverCardTriggerProps) => {
    const { floatingRefs, closeWithDelay, openWithDelay, rootTriggerClass } = useContext(HoverCardContext);

    return <>
        <Primitive.span
            className={clsx(rootTriggerClass, className)}
            onClick={() => {}}
            onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay}
            ref={floatingRefs.setReference}
            {...props}
        >{children}</Primitive.span>
    </>;
};

export default HoverCardTrigger;
