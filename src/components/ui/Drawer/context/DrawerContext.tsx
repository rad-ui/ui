import { createContext } from 'react';

export type DrawerSwipeDirection = 'up' | 'down' | 'left' | 'right';
export type DrawerSnapPoint = number | string;

export type DrawerHandleLike<Payload = any> = {
    isOpen: boolean;
    triggerId?: string | null;
    payload?: Payload | undefined;
    open: (triggerId?: string | null) => void;
    openWithPayload: (payload: Payload) => void;
    close: () => void;
    subscribe: (listener: () => void) => () => void;
};

export type DrawerRootChangeEventReason =
    | 'trigger-press'
    | 'outside-press'
    | 'escape-key'
    | 'close-watcher'
    | 'close-press'
    | 'focus-out'
    | 'imperative-action'
    | 'swipe'
    | 'none';

export type DrawerRootChangeEventDetails = {
    reason: DrawerRootChangeEventReason;
    event: Event;
    cancel: () => void;
    allowPropagation: () => void;
    isCanceled: boolean;
    isPropagationAllowed: boolean;
    trigger: Element | undefined;
    preventUnmountOnClose: () => void;
};

export type DrawerContextType<Payload = any> = {
    rootClass: string;
    swipeDirection: DrawerSwipeDirection;
    open: boolean;
    modal: boolean | 'trap-focus';
    nested: boolean;
    nestingLevel: number;
    nestedDrawerCount: number;
    nestedDrawerOpen: boolean;
    nestedDrawerSwiping: boolean;
    snapPoints: DrawerSnapPoint[];
    snapPoint: DrawerSnapPoint | null;
    expanded: boolean;
    setSnapPoint: (snapPoint: DrawerSnapPoint | null) => void;
    payload: Payload | undefined;
    setPayload: (payload: Payload | undefined) => void;
    registerNestedDrawerOpen: (open: boolean) => () => void;
    registerNestedDrawerSwiping: (swiping: boolean) => () => void;
    handle: DrawerHandleLike<Payload> | null;
    activeTriggerId: string | null;
    setActiveTriggerId: (triggerId: string | null) => void;
    requestOpenChange: (open: boolean, details?: Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>>) => void;
    setPendingChangeDetails: (details?: Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>>) => void;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    swipeDirection: 'down',
    open: false,
    modal: true,
    nested: false,
    nestingLevel: 0,
    nestedDrawerCount: 0,
    nestedDrawerOpen: false,
    nestedDrawerSwiping: false,
    snapPoints: [],
    snapPoint: null,
    expanded: true,
    setSnapPoint: () => {},
    payload: undefined,
    setPayload: () => {},
    registerNestedDrawerOpen: () => () => {},
    registerNestedDrawerSwiping: () => () => {},
    handle: null,
    activeTriggerId: null,
    setActiveTriggerId: () => {},
    requestOpenChange: () => {},
    setPendingChangeDetails: () => {}
});
