'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useControllableState from '~/core/hooks/useControllableState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { CommandContext, CommandFilter, CommandItemRecord, CommandSeparatorRecord } from '../context/CommandContext';

const COMPONENT_NAME = 'Command';

const defaultFilter: CommandFilter = (value, search, keywords) => {
    const query = search.trim().toLowerCase();

    if (!query) {
        return 1;
    }

    const haystacks = [value, ...keywords].map((entry) => entry.toLowerCase());
    return haystacks.some((entry) => entry.includes(query)) ? 1 : 0;
};

type CommandRootElement = React.ElementRef<typeof Primitive.div>;

export type CommandRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    label?: string;
    shouldFilter?: boolean;
    filter?: CommandFilter;
    loop?: boolean;
};

const CommandRoot = React.forwardRef<CommandRootElement, CommandRootProps>(({
    children,
    className,
    customRootClass = '',
    value,
    defaultValue = '',
    onValueChange,
    label = 'Command menu',
    shouldFilter = true,
    filter = defaultFilter,
    loop = false,
    ...props
}, forwardedRef) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [search, setSearchState] = useControllableState(value, defaultValue, onValueChange);
    const [items, setItems] = React.useState<CommandItemRecord[]>([]);
    const [separators, setSeparators] = React.useState<CommandSeparatorRecord[]>([]);
    const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
    const orderRef = React.useRef(0);
    const listId = React.useId();
    const inputId = React.useId();

    const setSearch = React.useCallback((nextValue: string) => {
        setSearchState(nextValue.trimStart());
    }, [setSearchState]);

    const registerItem = React.useCallback((item: Omit<CommandItemRecord, 'order'>) => {
        const order = orderRef.current++;

        setItems((current) => {
            const next = current.filter((entry) => entry.id !== item.id);
            next.push({ ...item, order });
            next.sort((a, b) => a.order - b.order);
            return next;
        });

        return () => {
            setItems((current) => current.filter((entry) => entry.id !== item.id));
        };
    }, []);

    const updateItem = React.useCallback((id: string, item: Omit<CommandItemRecord, 'order'>) => {
        setItems((current) => current.map((entry) => (
            entry.id === id
                ? { ...entry, ...item }
                : entry
        )));
    }, []);

    const unregisterItem = React.useCallback((id: string) => {
        setItems((current) => current.filter((entry) => entry.id !== id));
    }, []);

    const registerSeparator = React.useCallback((id: string) => {
        const order = orderRef.current++;

        setSeparators((current) => {
            const next = current.filter((entry) => entry.id !== id);
            next.push({ id, order });
            next.sort((a, b) => a.order - b.order);
            return next;
        });

        return () => {
            setSeparators((current) => current.filter((entry) => entry.id !== id));
        };
    }, []);

    const normalizedSearch = search.trim();

    const itemMetadata = React.useMemo(() => {
        return items.map((item) => {
            const score = !shouldFilter || !normalizedSearch ? 1 : filter(item.value, normalizedSearch, item.keywords);
            const visible = item.forceMount || score > 0;
            return {
                ...item,
                score,
                visible
            };
        });
    }, [filter, items, normalizedSearch, shouldFilter]);

    const visibleItems = React.useMemo(() => {
        return itemMetadata.filter((item) => item.visible && !item.disabled);
    }, [itemMetadata]);

    const visibleItemIds = React.useMemo(() => visibleItems.map((item) => item.id), [visibleItems]);

    const visibleItemsByGroup = React.useMemo(() => {
        return itemMetadata.reduce<Record<string, number>>((accumulator, item) => {
            if (!item.groupId || !item.visible) {
                return accumulator;
            }

            accumulator[item.groupId] = (accumulator[item.groupId] || 0) + 1;
            return accumulator;
        }, {});
    }, [itemMetadata]);

    React.useEffect(() => {
        if (visibleItemIds.length === 0) {
            setActiveItemId(null);
            return;
        }

        setActiveItemId((current) => {
            if (current && visibleItemIds.includes(current)) {
                return current;
            }

            return visibleItemIds[0];
        });
    }, [visibleItemIds]);

    React.useEffect(() => {
        if (!activeItemId) {
            return;
        }

        const activeItem = items.find((item) => item.id === activeItemId);
        const element = activeItem?.ref.current;

        if (!element || typeof element.scrollIntoView !== 'function') {
            return;
        }

        element.scrollIntoView({
            block: 'nearest',
            inline: 'nearest'
        });
    }, [activeItemId, items]);

    const moveActive = React.useCallback((direction: 1 | -1) => {
        if (visibleItems.length === 0) {
            return;
        }

        const currentIndex = activeItemId ? visibleItems.findIndex((item) => item.id === activeItemId) : -1;
        let nextIndex = currentIndex + direction;

        if (currentIndex === -1) {
            nextIndex = direction === 1 ? 0 : visibleItems.length - 1;
        }

        if (loop) {
            if (nextIndex < 0) {
                nextIndex = visibleItems.length - 1;
            }

            if (nextIndex >= visibleItems.length) {
                nextIndex = 0;
            }
        } else {
            nextIndex = Math.max(0, Math.min(visibleItems.length - 1, nextIndex));
        }

        setActiveItemId(visibleItems[nextIndex]?.id || null);
    }, [activeItemId, loop, visibleItems]);

    const moveToBoundary = React.useCallback((location: 'start' | 'end') => {
        if (visibleItems.length === 0) {
            return;
        }

        setActiveItemId(location === 'start' ? visibleItems[0].id : visibleItems[visibleItems.length - 1].id);
    }, [visibleItems]);

    const selectActiveItem = React.useCallback(() => {
        if (!activeItemId) {
            return;
        }

        const item = visibleItems.find((entry) => entry.id === activeItemId);

        if (!item || item.disabled) {
            return;
        }

        item.onSelect?.(item.value);
    }, [activeItemId, visibleItems]);

    const getItemState = React.useCallback((id: string) => {
        const item = itemMetadata.find((entry) => entry.id === id);
        const visible = Boolean(item?.visible);
        const active = activeItemId === id;

        return {
            active,
            visible,
            selected: active
        };
    }, [activeItemId, itemMetadata]);

    const getVisibleGroupItemCount = React.useCallback((groupId: string) => {
        return visibleItemsByGroup[groupId] || 0;
    }, [visibleItemsByGroup]);

    const getSeparatorVisible = React.useCallback((id: string) => {
        const separator = separators.find((entry) => entry.id === id);

        if (!separator) {
            return false;
        }

        const hasVisibleBefore = itemMetadata.some((item) => item.visible && item.order < separator.order);
        const hasVisibleAfter = itemMetadata.some((item) => item.visible && item.order > separator.order);

        return hasVisibleBefore && hasVisibleAfter;
    }, [itemMetadata, separators]);

    const contextValue = React.useMemo(() => ({
        rootClass,
        label,
        listId,
        inputId,
        search,
        setSearch,
        loop,
        shouldFilter,
        registerItem,
        updateItem,
        unregisterItem,
        registerSeparator,
        activeItemId,
        setActiveItemId,
        moveActive,
        moveToBoundary,
        selectActiveItem,
        getItemState,
        visibleItemCount: itemMetadata.filter((item) => item.visible).length,
        getVisibleGroupItemCount,
        getSeparatorVisible
    }), [
        activeItemId,
        getItemState,
        getSeparatorVisible,
        getVisibleGroupItemCount,
        inputId,
        label,
        listId,
        loop,
        moveActive,
        moveToBoundary,
        registerItem,
        registerSeparator,
        rootClass,
        search,
        selectActiveItem,
        setSearch,
        shouldFilter,
        itemMetadata,
        unregisterItem,
        updateItem
    ]);

    return (
        <CommandContext.Provider value={contextValue}>
            <Primitive.div
                ref={forwardedRef}
                className={clsx(rootClass, className)}
                data-slot="command-root"
                data-value={normalizedSearch || undefined}
                {...props}
            >
                {children}
            </Primitive.div>
        </CommandContext.Provider>
    );
});

CommandRoot.displayName = 'Command';

export default CommandRoot;
