import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenuPrimitiveRootContext from '~/core/primitives/Menu/contexts/MenuPrimitiveRootContext';
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
        const menuContext = React.useContext(MenuPrimitiveRootContext);
        const contextTriggerRef = React.useRef<HTMLSpanElement>(null);
        const mergedRef = useMergeRefs([contextTriggerRef, ref]);

        if (!context) {
            console.warn('ContextMenuTrigger should be used in the ContextMenuRoot');
            return null;
        }
        const { rootClass, setIsOpen } = context;

        const openAtPoint = (x: number, y: number) => {
            // Use a virtual element at the exact cursor position so floating-ui
            // can correctly flip/shift in any direction without offset math.
            menuContext?.refs.setPositionReference({
                getBoundingClientRect() {
                    return {
                        width: 0,
                        height: 0,
                        x,
                        y,
                        top: y,
                        left: x,
                        right: x,
                        bottom: y,
                        toJSON() { return this; },
                    };
                },
            } as Element);
            setIsOpen(true);
        };

        const handleContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            openAtPoint(e.clientX, e.clientY);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
                e.preventDefault();
                if (!contextTriggerRef.current) return;
                const rect = contextTriggerRef.current.getBoundingClientRect();
                openAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
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
                        setIsOpen(false);
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
