import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';
import { useMergeRefs } from '@floating-ui/react';

export type ContextMenuTriggerElement = HTMLSpanElement;
export type ContextMenuTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const ContextMenuTrigger = forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuTrigger should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass, setCoords, setIsOpen } = context;
    const contextTriggerRef = React.useRef<HTMLSpanElement>(null);
    const mergedRef = useMergeRefs([contextTriggerRef, ref]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!contextTriggerRef.current) return;
        const rect = contextTriggerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = rect.bottom - e.clientY;

        setCoords({ x, y });
        setIsOpen(true);
    };

    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} asChild={true} {...props}>
            <span ref={mergedRef} onContextMenu={handleContextMenu} onClick={(e) => { e.preventDefault(); }}>
                {children}
            </span>
        </MenuPrimitive.Trigger>
    );
});

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export default ContextMenuTrigger;
