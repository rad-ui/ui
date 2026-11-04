import React, { useContext, forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ButtonPrimitive from '../../Button';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { useHandleTriggerRegistration } from '~/core/utils/popupHandle';
import { stateData } from '~/core/utils/stateAttributes';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
    asChild?: boolean
    /** Open the menu connected to this handle, even when rendered outside its Root. */
    handle?: PopupHandle<any>
    /** Data for the menu's content, such as the row this trigger belongs to. */
    payload?: unknown
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

const MenuPrimitiveTrigger = forwardRef<HTMLButtonElement, MenuPrimitiveTriggerProps>(
    ({ children, className, asChild, handle, payload, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const { ref, index } = Floater.useListItem();
        const mergedRef = Floater.useMergeRefs([
            handle ? undefined : context?.refs.setReference,
            ref,
            propRef
        ]);
        const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
        const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
        const triggerRef = React.useRef<HTMLButtonElement | null>(null);
        // Lets the Root's `triggerId` find this trigger.
        useHandleTriggerRegistration(handle, triggerRef, payload);
        const detachedRef = Floater.useMergeRefs([triggerRef, propRef]);

        if (handle) {
            // A detached trigger is open only when it's the one that opened the menu.
            const open = Boolean(handleState?.open && handleState.trigger === triggerRef.current);
            const { onClick, onKeyDown, ...rest } = props;
            return (
                <ButtonPrimitive
                    ref={detachedRef}
                    {...rest}
                    className={className}
                    asChild={asChild}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    {...stateData(open ? 'open' : 'closed')}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onClick?.(event);
                        if (event.defaultPrevented) return;
                        if (open) handle.close();
                        else handle.open(payload, event.currentTarget);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                        onKeyDown?.(event);
                        if (event.defaultPrevented) return;
                        // Arrow keys open the menu, which then focuses its first item.
                        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                            event.preventDefault();
                            handle.open(payload, event.currentTarget);
                        }
                    }}
                >
                    {children}
                </ButtonPrimitive>
            );
        }

        if (!context) return null;
        const { activeIndex, getReferenceProps, isNested, isOpen } = context;

        return (
            <ButtonPrimitive
                ref={mergedRef}
                {...(getReferenceProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
                    ...props,
                    className,
                    ...stateData(isOpen ? 'open' : 'closed'),
                    // useRole marks any trigger with a floating parent as a menuitem;
                    // only submenu triggers should be menuitems.
                    role: props.role ?? (isNested ? 'menuitem' : undefined),
                    tabIndex: !isNested ? props.tabIndex : activeIndex === index ? 0 : -1
                })}
                asChild={asChild}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

MenuPrimitiveTrigger.displayName = 'MenuPrimitiveTrigger';
export default MenuPrimitiveTrigger;
