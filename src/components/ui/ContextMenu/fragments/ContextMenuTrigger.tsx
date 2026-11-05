import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenuPrimitiveRootContext from '~/core/primitives/Menu/contexts/MenuPrimitiveRootContext';
import { isContextMenuKey } from '~/core/utils/keyboard';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';
import { useMergeRefs } from '@floating-ui/react';

export type ContextMenuTriggerElement = HTMLSpanElement;
export type ContextMenuTriggerProps = {
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

// Touch devices without a native context menu gesture (iOS Safari) open the
// menu after holding a finger still for this long.
const LONG_PRESS_DELAY = 500;
// Moving further than this cancels the long press, so scrolling still works.
const LONG_PRESS_MOVE_TOLERANCE = 10;

const ContextMenuTrigger = forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(
    ({ children, className, ...props }, ref) => {
        const context = React.useContext(ContextMenuContext);
        const menuContext = React.useContext(MenuPrimitiveRootContext);
        const contextTriggerRef = React.useRef<HTMLSpanElement>(null);
        const mergedRef = useMergeRefs([contextTriggerRef, ref]);
        const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
        const longPressStartRef = React.useRef<{ x: number; y: number } | null>(null);
        const openedByLongPressRef = React.useRef(false);

        const cancelLongPress = React.useCallback(() => {
            if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
            longPressStartRef.current = null;
        }, []);

        React.useEffect(() => cancelLongPress, [cancelLongPress]);

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
            cancelLongPress();
            openAtPoint(e.clientX, e.clientY);
        };

        const handlePointerDown = (e: React.PointerEvent) => {
            openedByLongPressRef.current = false;
            if (e.pointerType !== 'touch') return;
            cancelLongPress();
            const { clientX: x, clientY: y } = e;
            longPressStartRef.current = { x, y };
            longPressTimerRef.current = setTimeout(() => {
                longPressTimerRef.current = null;
                openedByLongPressRef.current = true;
                openAtPoint(x, y);
            }, LONG_PRESS_DELAY);
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            const start = longPressStartRef.current;
            if (!start) return;
            if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > LONG_PRESS_MOVE_TOLERANCE) {
                cancelLongPress();
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (isContextMenuKey(e.key, e.shiftKey)) {
                e.preventDefault();
                if (!contextTriggerRef.current) return;
                const rect = contextTriggerRef.current.getBoundingClientRect();
                openAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
                // Keyboard users land on the first item, matching the menu button pattern.
                menuContext?.setActiveIndex(0);
            }
        };

        return (
            <MenuPrimitive.Trigger
                className={clsx(rootClass && `${rootClass}-trigger`, className)}
                asChild={true}
                {...props}
            >
                <span
                    ref={mergedRef}
                    onContextMenu={handleContextMenu}
                    onKeyDown={handleKeyDown}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={cancelLongPress}
                    onPointerCancel={cancelLongPress}
                    onClick={(e) => {
                        e.preventDefault();
                        // Lifting the finger after a long press can fire a click;
                        // it must not close the menu that just opened.
                        if (openedByLongPressRef.current) {
                            openedByLongPressRef.current = false;
                            return;
                        }
                        setIsOpen(false);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    // The trigger renders a <span>; drop the button-only `type`
                    // attribute the underlying button primitive adds.
                    {...({ type: undefined } as Record<string, unknown>)}
                >
                    {children}
                </span>
            </MenuPrimitive.Trigger>
        );
    }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export default ContextMenuTrigger;
