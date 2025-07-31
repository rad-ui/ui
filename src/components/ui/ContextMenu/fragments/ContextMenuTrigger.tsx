import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const ContextMenuTrigger = ({ children, className, ...props }:ContextMenuTriggerProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuTrigger should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass, setCoords, setIsOpen } = context;
    const contextTriggerRef = React.useRef<HTMLSpanElement>(null);

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
            <span ref={contextTriggerRef} onContextMenu={handleContextMenu} onClick={(e) => { e.preventDefault(); }}>
                {children}
            </span>
        </MenuPrimitive.Trigger>
    );
};

export default ContextMenuTrigger;
