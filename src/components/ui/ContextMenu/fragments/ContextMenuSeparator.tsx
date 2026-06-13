import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Separator from '../../Separator/Separator';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuSeparatorElement = ElementRef<typeof Separator>;
export type ContextMenuSeparatorProps = {
    className?: string
}& ComponentPropsWithoutRef<typeof Separator>;
const ContextMenuSeparator = forwardRef<ContextMenuSeparatorElement, ContextMenuSeparatorProps>(({ className, ...props }: ContextMenuSeparatorProps, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuSeparator should be used within ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <Separator ref={ref} customRootClass={rootClass} className={className} {...props}/>
    );
});

ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export default ContextMenuSeparator;
