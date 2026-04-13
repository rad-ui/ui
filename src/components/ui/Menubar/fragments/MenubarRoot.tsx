import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { customClassSwitcher } from '~/core';
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
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [items, setItems] = React.useState<MenubarItem[]>([]);
    const [activeIndex, setActiveIndex] = React.useState(0);

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
        setItems((prev) =>
            prev.map((item) => (item.id === id && item.state !== newState ? { ...item, state: newState } : item))
        );
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

    const contextValue = React.useMemo(
        () => ({ rootClass, registerItem, items, updateItemState }),
        [rootClass, registerItem, items, updateItemState]
    );

    return (
        <MenubarContext.Provider value={contextValue} >
            <Floater.Composite
                ref={ref}
                className={clsx(`${rootClass}-root`, className)} dir={dir} loop={loop} {...props} activeIndex={activeIndex}
                onNavigate={handleOnNavigate}
            >
                {children}
            </Floater.Composite>
        </MenubarContext.Provider>
    );
});

MenubarRoot.displayName = 'MenubarRoot';

export default MenubarRoot;
