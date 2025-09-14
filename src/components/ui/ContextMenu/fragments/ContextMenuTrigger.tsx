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

const ContextMenuTrigger = forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(
    ({ children, className, ...props }, ref) => {
        const context = React.useContext(ContextMenuContext);
        const contextTriggerRef = React.useRef<HTMLSpanElement>(null);
        const mergedRef = useMergeRefs([contextTriggerRef, ref]);

        if (!context) {
            console.warn('ContextMenuTrigger should be used in the ContextMenuRoot');
            return null;
        }
        const { rootClass, setCoords, setIsOpen } = context;

        const handleContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            if (!contextTriggerRef.current) return;
            const rect = contextTriggerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = rect.bottom - e.clientY;

            setCoords({ x, y });
            setIsOpen(true);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
                e.preventDefault();
                if (!contextTriggerRef.current) return;
                const rect = contextTriggerRef.current.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                setCoords({ x, y });
                setIsOpen(true);
            }
        };

        return (
            <MenuPrimitive.Trigger
                className={clsx(`${rootClass}-trigger`, className)}
                asChild={true}
                {...props}
            >
                <span
                    ref={mergedRef}
                    onContextMenu={handleContextMenu}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                >
                    {children}
                </span>
            </MenuPrimitive.Trigger>
        );
    }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export default ContextMenuTrigger;
