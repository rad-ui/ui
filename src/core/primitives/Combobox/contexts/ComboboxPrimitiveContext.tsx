import { createContext } from 'react';
import type { TransitionStatus } from '~/core/hooks/useTransitionStatus';

export type ComboboxPrimitiveContextType = {
    isOpen: boolean,
    /** While open, lock page scroll and keep outside presses from reaching the page. */
    modal?: boolean,
    setIsOpen: (open: boolean | ((previous: boolean) => boolean)) => void,
    handleSelect: (index: number | null) => void,
    refs: {
        reference: React.RefObject<any>;
        floating: React.RefObject<any>;
        setReference: (node: any) => void;
        setFloating: (node: any) => void;
    };
    isPositioned: boolean;
    updatePosition: () => void;
    middlewareData: any;
    placedPlacement: string;
    floatingStyles: React.CSSProperties;
    floatingContext: any;
    getReferenceProps: (userProps?: any) => any;
    getFloatingProps: () => any;
    getItemProps: (userProps?: any) => any;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    selectedIndex: number | null;
    elementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
    labelsRef: React.MutableRefObject<(string | null)[]>;
    displayLabelsRef: React.MutableRefObject<(string | null)[]>;
    valuesRef: React.MutableRefObject<(string | null)[]>;
    disabledIndices: number[];
    setDisabledIndices: React.Dispatch<React.SetStateAction<number[]>>;
    selectedLabel: string;
    selectedValue: string;
    isTypingRef: React.RefObject<boolean>;
    selectedItemRef: React.MutableRefObject<HTMLElement | null>;
    virtualItemRef: React.RefObject<HTMLElement | null>;
    hasSearch: boolean;
    setHasSearch: React.Dispatch<React.SetStateAction<boolean>>;
    search: string;
    setSearch: (value: string) => void;
    /** Clears the selection and the typed text, then focuses the trigger or input. */
    clearValue: () => void;
    hiddenIndices: number[];
    labelsVersion: number;
    bumpLabelsVersion: () => void;
    /** Per-root prefix that keeps option ids unique across instances. */
    idPrefix: string;
    disabled: boolean;
    /** Reading direction, applied to the (portaled) listbox content. */
    dir?: string;
    /** Whether several values can be selected. */
    multiple: boolean;
    /** Every selected value when `multiple`; empty otherwise. */
    selectedValues: string[];
    /** Labels for `selectedValues`, in the same order. */
    selectedLabels: string[];
    /** Deselects one value (multiple only), for chip remove buttons. */
    removeValue: (value: string) => void;
    /** True when a text input is the anchor (Autocomplete): focus stays in it while open. */
    referenceIsInput: boolean;
    setReferenceIsInput: React.Dispatch<React.SetStateAction<boolean>>;
    /** True while open or running an exit animation. */
    transitionMounted: boolean;
    transitionStatus: TransitionStatus;
}

export const ComboboxPrimitiveContext = createContext<ComboboxPrimitiveContextType>({} as ComboboxPrimitiveContextType);
