import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarContext, { MenubarItem } from '../contexts/MenubarContext';

export type MenubarRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
};

const COMPONENT_NAME = 'Menubar';

const MenubarRoot = ({ children, customRootClass, className, dir, loop, ...props }:MenubarRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [items, setItems] = React.useState<MenubarItem[]>([]);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const registerItem = (id: string, state: 'open' | 'closed' = 'closed') => {
        setItems((prev) => {
            // if already exists, just update its state
            const existing = prev.find((item) => item.id === id);
            if (existing) {
                return prev.map((item) =>
                    item.id === id ? { ...item, state } : item
                );
            }
            // else add new item
            return [...prev, { id, state }];
        });
    };

    const updateItemState = (id: string, newState: 'open' | 'closed') => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, state: newState } : item))
        );
    };

    const handleOnNavigate = (newIndex: number) => {
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
    };

    return (
        <MenubarContext.Provider value={{ rootClass, registerItem, items, updateItemState }} >
            <Floater.Composite
                className={clsx(`${rootClass}-root`, className)} dir={dir} loop={loop} {...props} activeIndex={activeIndex}
                onNavigate={handleOnNavigate}
            >
                {children}
            </Floater.Composite>
        </MenubarContext.Provider>
    );
};

export default MenubarRoot;
