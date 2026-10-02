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

const MenubarRoot = forwardRef<MenubarRootElement, MenubarRootProps>(({ children, customRootClass, className, dir, loop, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [items, setItems] = React.useState<MenubarItem[]>([]);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [contentInitialFocus, setContentInitialFocus] = React.useState<number | undefined>();
    const triggersRef = React.useRef<Record<string, HTMLButtonElement | null>>({});

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
            return [...prev, { id, state }];
        });
    }, []);

    const updateItemState = React.useCallback((id: string, newState: 'open' | 'closed') => {
        if (newState === 'open') {
            setContentInitialFocus((current) => current === -1 ? current : undefined);
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
        }

        setActiveIndex(newIndex);
    }, [activeIndex, items, updateItemState]);

    const navigateMenu = React.useCallback((delta: 1 | -1) => {
        if (items.length === 0) return;

        const currentIndex = activeIndex >= 0 ? activeIndex : items.findIndex((item) => item.state === 'open');
        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + delta + items.length) % items.length;
        const nextItem = items[nextIndex];
        if (!nextItem) return;

        setContentInitialFocus(-1);
        setItems((prev) => prev.map((item, index) => ({
            ...item,
            state: index === nextIndex ? 'open' : 'closed'
        })));
        setActiveIndex(nextIndex);
        triggersRef.current[nextItem.id]?.focus();
    }, [activeIndex, items]);

    const contextValue = React.useMemo(() => ({
        rootClass,
        registerItem,
        items,
        updateItemState,
        updateItemTrigger,
        navigateMenu,
        contentInitialFocus
    }), [rootClass, registerItem, items, updateItemState, updateItemTrigger, navigateMenu, contentInitialFocus]);

    return (
        <MenubarContext.Provider value={contextValue} >
            <Floater.Composite
                ref={ref}
                className={clsx(rootClass && `${rootClass}-root`, className)} dir={dir} loop={loop} {...props} activeIndex={activeIndex}
                onNavigate={handleOnNavigate}
            >
                {children}
            </Floater.Composite>
        </MenubarContext.Provider>
    );
});

MenubarRoot.displayName = 'MenubarRoot';

export default MenubarRoot;
