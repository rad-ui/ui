import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarMenuContext from '../contexts/MenubarMenuContext';

export type MenubarTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type MenubarTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const MenubarTrigger = forwardRef<MenubarTriggerElement, MenubarTriggerProps>(({ children, className, onFocus, onPointerEnter, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const menuContext = React.useContext(MenubarMenuContext);

    if (!context) {
        console.warn('MenubarTrigger should be used in the MenubarRoot');
        return null;
    }
    const { rootClass, updateItemTrigger, items, activeIndex, setActiveItem, openMenuOnHover } = context;

    if (!menuContext) {
        console.warn('MenubarTrigger should be used in the MenubarMenu');
        return null;
    }
    const { id, isOpen } = menuContext;

    const setTriggerRef = React.useCallback((node: HTMLButtonElement | null) => {
        updateItemTrigger(id, node);
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
    }, [id, ref, updateItemTrigger]);

    // Roving tab stop: only the active trigger is in the tab order.
    const itemIndex = items.findIndex((item) => item.id === id);
    const isTabStop = itemIndex === activeIndex || (itemIndex === 0 && (activeIndex < 0 || activeIndex >= items.length));

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
        setActiveItem(id);
    };

    const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented || event.pointerType === 'touch') return;
        openMenuOnHover(id);
    };

    return (
        <Floater.CompositeItem
            render={() => (
                <MenuPrimitive.Trigger
                    ref={setTriggerRef}
                    className={clsx(rootClass && `${rootClass}-trigger`, className)}
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    tabIndex={isTabStop ? 0 : -1}
                    data-state={isOpen ? 'open' : 'closed'}
                    data-active={isOpen}
                    onFocus={handleFocus}
                    onPointerEnter={handlePointerEnter}
                    {...props}
                >
                    {children}
                </MenuPrimitive.Trigger>
            )}
        />

    );
});

MenubarTrigger.displayName = 'MenubarTrigger';

export default MenubarTrigger;
