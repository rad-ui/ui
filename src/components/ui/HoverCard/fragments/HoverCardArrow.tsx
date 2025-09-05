import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';

export type HoverCardArrowElement = ElementRef<typeof Floater.Arrow>;
export type HoverCardArrowProps = Omit<ComponentPropsWithoutRef<typeof Floater.Arrow>, 'context'>;

const HoverCardArrow = forwardRef<HoverCardArrowElement, HoverCardArrowProps>((props, ref) => {
    const { floatingContext, arrowRef, rootClass } = useContext(HoverCardContext);
    const mergedRef = Floater.useMergeRefs([arrowRef, ref]);

    return <Floater.Arrow className={clsx(`${rootClass}-arrow`)} {...props} context={floatingContext} ref={mergedRef} />;
});

HoverCardArrow.displayName = 'HoverCardArrow';

export default HoverCardArrow;
