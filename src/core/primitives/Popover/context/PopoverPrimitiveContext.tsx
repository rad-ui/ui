'use client';

import { createContext } from 'react';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverSticky = 'partial' | 'always';

export type PopoverPositioning = {
    side: PopoverSide;
    align: PopoverAlign;
    sideOffset: number;
    alignOffset: number;
    avoidCollisions: boolean;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding: number | Partial<Record<PopoverSide, number>>;
    arrowPadding: number;
    sticky: PopoverSticky;
    hideWhenDetached: boolean;
};

export type PopoverOutsideInteractionEvent<T extends Event> = {
    originalEvent: T;
    defaultPrevented: boolean;
    preventDefault: () => void;
};

type PopoverPrimitiveContextType = {
    isOpen: boolean;
    modal: boolean;
    contentId: string;
    triggerNode: HTMLElement | null;
    anchorNode: HTMLElement | null;
    handleOpenChange: (open: boolean) => void;
    setTriggerNode: (node: HTMLElement | null) => void;
    setAnchorNode: (node: HTMLElement | null) => void;
    setArrowNode: (node: SVGSVGElement | null) => void;
    positioning: PopoverPositioning;
    setPositioning: (value: Partial<PopoverPositioning>) => void;
    getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
    getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
    setContentEventHandlers: (handlers: {
        onEscapeKeyDown?: (event: KeyboardEvent) => void;
        onPointerDownOutside?: (event: PopoverOutsideInteractionEvent<PointerEvent>) => void;
        onFocusOutside?: (event: PopoverOutsideInteractionEvent<FocusEvent>) => void;
        onInteractOutside?: (event: PopoverOutsideInteractionEvent<PointerEvent | FocusEvent>) => void;
    }) => void;
    refs: {
        setFloating: React.RefCallback<HTMLElement>;
        floating: React.MutableRefObject<HTMLElement | null>;
    };
    isPositioned: boolean;
    floatingStyles: React.CSSProperties;
    floatingContext: any;
};

export const defaultPopoverPositioning: PopoverPositioning = {
    side: 'bottom',
    align: 'center',
    sideOffset: 0,
    alignOffset: 0,
    avoidCollisions: true,
    collisionBoundary: undefined,
    collisionPadding: 0,
    arrowPadding: 0,
    sticky: 'partial',
    hideWhenDetached: false
};

export const PopoverPrimitiveContext = createContext<PopoverPrimitiveContextType>({
    isOpen: false,
    modal: false,
    contentId: '',
    triggerNode: null,
    anchorNode: null,
    handleOpenChange: () => {},
    setTriggerNode: () => {},
    setAnchorNode: () => {},
    setArrowNode: () => {},
    positioning: defaultPopoverPositioning,
    setPositioning: () => {},
    getReferenceProps: (userProps = {}) => userProps,
    getFloatingProps: (userProps = {}) => userProps,
    setContentEventHandlers: () => {},
    refs: {
        setFloating: () => {},
        floating: { current: null }
    },
    isPositioned: false,
    floatingStyles: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    floatingContext: null
});
