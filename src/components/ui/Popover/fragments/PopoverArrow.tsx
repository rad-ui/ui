import React from 'react';
import { FloatingArrow, useMergeRefs } from '@floating-ui/react';
import { usePopoverContext } from '../context/PopoverContext';
import clsx from 'clsx';

export type PopoverArrowElement = React.ElementRef<typeof FloatingArrow>;
export interface PopoverArrowProps extends Omit<React.ComponentPropsWithoutRef<typeof FloatingArrow>, 'context'> {}

const PopoverArrow = React.forwardRef<PopoverArrowElement, PopoverArrowProps>((props, ref) => {
    const popover = usePopoverContext();
    const mergedRef = useMergeRefs([popover.arrowRef, ref]);
    const { className, ...rest } = props;
    return <FloatingArrow ref={mergedRef} context={popover.context} {...rest} className={clsx('rad-ui-popover-arrow', className)} />;
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
