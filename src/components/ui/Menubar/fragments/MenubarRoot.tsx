import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarContext, { MenubarItem } from '../contexts/MenubarContext';

export type MenubarRootElement = ElementRef<typeof Floater.Composite>;
export type MenubarRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof Floater.Composite>;

const COMPONENT_NAME = 'Menubar';

const MenubarRoot = forwardRef<MenubarRootElement, MenubarRootProps>(({ children, customRootClass, className, dir, loop, rtl, onKeyDown, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [items, setItems] = React.useState<MenubarItem[]>([]);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [contentInitialFocus, setContentInitialFocus] = React.useState<number | undefined>();
    const triggersRef = React.useRef<Record<string, HTMLButtonElement | null>>({});

    // Keeps registered menus in document order (by trigger position) so keyboard
    // navigation follows the rendered order even when menus mount late.
    const sortByTriggerPosition = React.useCallback((list: MenubarItem[]) => {
        return [...list].sort((a, b) => {
            const nodeA = triggersRef.current[a.id];
            const nodeB = triggersRef.current[b.id];
            if (!nodeA || !nodeB) return 0;
            const position = nodeA.compareDocumentPosition(nodeB);
            if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });
    }, []);

    const registerItem = React.useCallback((id: string, state: 'open' | 'closed' = 'closed') => {
        setItems((prev) => {
            // if already exists, just update its state
            const existing = prev.find((item) => item.id === id);
            if (existing) {
                if (existing.state === state) return prev;
                return prev.map((item) =>
                    item.id === id ? { ...item, state } : item
                );
            }
            // else add new item
            return sortByTriggerPosition([...prev, { id, state }]);
        });
    }, [sortByTriggerPosition]);

    const unregisterItem = React.useCallback((id: string) => {
        setItems((prev) => prev.some((item) => item.id === id) ? prev.filter((item) => item.id !== id) : prev);
    }, []);

    const updateItemState = React.useCallback((id: string, newState: 'open' | 'closed') => {
        // A menu opened by the user (click, Enter, ArrowDown...) moves focus into its content.
        // Callers that switch menus while keeping focus on the trigger set -1 afterwards.
        if (newState === 'open') {
            setContentInitialFocus(undefined);
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, state: newState } : item))
        );
    }, []);

    const updateItemTrigger = React.useCallback((id: string, trigger: HTMLButtonElement | null) => {
        if (trigger) {
            triggersRef.current[id] = trigger;
        } else {
            delete triggersRef.current[id];
        }
    }, []);

    const handleOnNavigate = React.useCallback((newIndex: number) => {
        if (newIndex === activeIndex) return;
        const prevItem = items[activeIndex];
        const nextItem = items[newIndex];

        if (prevItem) {
            // Always close the previous item
            updateItemState(prevItem.id, 'closed');
        }

        if (nextItem) {
            // Open next only if the previous was open
            const shouldOpen = prevItem?.state === 'open';
            updateItemState(nextItem.id, shouldOpen ? 'open' : 'closed');
            if (shouldOpen) {
                // Keep focus on the newly active trigger, matching navigation from inside content.
                setContentInitialFocus(-1);
            }
        }

        setActiveIndex(newIndex);
    }, [activeIndex, items, updateItemState]);

    // Opens the menu at `index` (closing every other one) while focus stays on its trigger.
    const switchToMenu = React.useCallback((index: number) => {
        const nextItem = items[index];
        if (!nextItem) return;

        setContentInitialFocus(-1);
        setItems((prev) => prev.map((item, itemIndex) => ({
            ...item,
            state: itemIndex === index ? 'open' : 'closed'
        })));
        setActiveIndex(index);
        triggersRef.current[nextItem.id]?.focus();
    }, [items]);

    const navigateMenu = React.useCallback((delta: 1 | -1) => {
        if (items.length === 0) return;

        const currentIndex = activeIndex >= 0 ? activeIndex : items.findIndex((item) => item.state === 'open');
        if (currentIndex === -1) return;

        switchToMenu((currentIndex + delta + items.length) % items.length);
    }, [activeIndex, items, switchToMenu]);

    // Pointer moving onto another trigger while a menu is open switches to that menu,
    // matching native application menubars.
    const openMenuOnHover = React.useCallback((id: string) => {
        const index = items.findIndex((item) => item.id === id);
        if (index === -1) return;
        const anotherMenuIsOpen = items.some((item) => item.id !== id && item.state === 'open');
        if (!anotherMenuIsOpen || items[index].state === 'open') return;
        switchToMenu(index);
    }, [items, switchToMenu]);

    // Keeps the roving tab stop in sync when a trigger receives focus (pointer
    // or programmatic), without opening or closing any menu.
    const setActiveItem = React.useCallback((id: string) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) setActiveIndex(index);
    }, [items]);

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key !== 'Home' && event.key !== 'End') return;

        // Home/End only apply when focus is on a menubar trigger, not inside menu content.
        if (!Object.values(triggersRef.current).includes(event.target as HTMLButtonElement)) return;

        const targetIndex = event.key === 'Home' ? 0 : items.length - 1;
        const targetItem = items[targetIndex];
        if (!targetItem) return;

        event.preventDefault();
        handleOnNavigate(targetIndex);
        triggersRef.current[targetItem.id]?.focus();
    }, [handleOnNavigate, items, onKeyDown]);

    const contextValue = React.useMemo(() => ({
        rootClass,
        registerItem,
        unregisterItem,
        items,
        updateItemState,
        updateItemTrigger,
        navigateMenu,
        openMenuOnHover,
        activeIndex,
        setActiveItem,
        contentInitialFocus
    }), [rootClass, registerItem, unregisterItem, items, updateItemState, updateItemTrigger, navigateMenu, openMenuOnHover, activeIndex, setActiveItem, contentInitialFocus]);

    return (
        <MenubarContext.Provider value={contextValue} >
            <Floater.Composite
                ref={ref}
                role="menubar"
                className={clsx(rootClass && `${rootClass}-root`, className)}
                dir={dir}
                loop={loop}
                rtl={rtl ?? dir === 'rtl'}
                orientation="horizontal"
                {...props}
                activeIndex={activeIndex}
                onNavigate={handleOnNavigate}
                onKeyDown={handleKeyDown}
            >
                {children}
            </Floater.Composite>
        </MenubarContext.Provider>
    );
});

MenubarRoot.displayName = 'MenubarRoot';

export default MenubarRoot;
