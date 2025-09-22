import React, { useContext } from 'react';
import { FloatingArrow, useMergeRefs } from '@floating-ui/react';
import PopoverContext from '../context/PopoverContext';
import clsx from 'clsx';

export type PopoverArrowElement = React.ElementRef<typeof FloatingArrow>;
export interface PopoverArrowProps extends Omit<React.ComponentPropsWithoutRef<typeof FloatingArrow>, 'context'> {}

const PopoverArrow = React.forwardRef<PopoverArrowElement, PopoverArrowProps>((props, ref) => {
    const popover = useContext(PopoverContext);
    if (!popover) {
        throw new Error('PopoverArrow must be used within a PopoverRoot component');
    }
    const mergedRef = useMergeRefs([popover.arrowRef, ref]);
    return <FloatingArrow ref={mergedRef} context={popover.context} className={clsx('rad-ui-popover-arrow', props.className)} {...props} />;
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
