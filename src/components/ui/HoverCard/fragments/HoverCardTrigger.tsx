import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';

export type HoverCardTriggerElement = ElementRef<typeof Primitive.span>;
export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof Primitive.span>;

const HoverCardTrigger = forwardRef<HoverCardTriggerElement, HoverCardTriggerProps>(({ children, className = '', ...props }, ref) => {
    const { floatingRefs, closeWithDelay, openWithDelay, rootTriggerClass } = useContext(HoverCardContext);

    const mergedRef = Floater.useMergeRefs([floatingRefs.setReference, ref]);

    return <Primitive.span
        className={clsx(rootTriggerClass, className)}
        onClick={() => {}}
        onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay}
        ref={mergedRef}
        {...props}
    >{children}</Primitive.span>;
});

HoverCardTrigger.displayName = 'HoverCardTrigger';

export default HoverCardTrigger;
