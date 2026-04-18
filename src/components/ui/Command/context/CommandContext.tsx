'use client';

import React from 'react';

export type CommandFilter = (value: string, search: string, keywords: string[]) => number;

export type CommandItemRecord = {
    id: string;
    value: string;
    keywords: string[];
    disabled: boolean;
    forceMount: boolean;
    groupId: string | null;
    ref: React.RefObject<HTMLElement | null>;
    onSelect?: (value: string) => void;
    order: number;
};

export type CommandSeparatorRecord = {
    id: string;
    order: number;
};

export type CommandContextValue = {
    rootClass: string;
    label: string;
    listId: string;
    inputId: string;
    search: string;
    setSearch: (value: string) => void;
    loop: boolean;
    shouldFilter: boolean;
    registerItem: (item: Omit<CommandItemRecord, 'order'>) => () => void;
    updateItem: (id: string, item: Omit<CommandItemRecord, 'order'>) => void;
    unregisterItem: (id: string) => void;
    registerSeparator: (id: string) => () => void;
    activeItemId: string | null;
    setActiveItemId: (id: string | null) => void;
    moveActive: (direction: 1 | -1) => void;
    moveToBoundary: (location: 'start' | 'end') => void;
    selectActiveItem: () => void;
    getItemState: (id: string) => {
        active: boolean;
        visible: boolean;
        selected: boolean;
    };
    visibleItemCount: number;
    getVisibleGroupItemCount: (groupId: string) => number;
    getSeparatorVisible: (id: string) => boolean;
};

export const CommandContext = React.createContext<CommandContextValue | null>(null);

export const useCommandContext = () => {
    const context = React.useContext(CommandContext);

    if (!context) {
        throw new Error('Command components must be used within Command.Root or Command.Dialog.');
    }

    return context;
};
