import React from 'react';

export interface NavigationMenuRootContextProps {
    isOpen: string;
    setIsOpen: React.Dispatch<React.SetStateAction<string>>;
    rootClass: string;
    contentLoop: boolean;
    dir?: 'ltr' | 'rtl';
    /** The shared `Viewport` element, when one is rendered. Open content portals into it. */
    viewport?: HTMLElement | null;
    setViewport?: (node: HTMLElement | null) => void;
    /** The open content panel, so the viewport can size itself to it. */
    activeContent?: HTMLElement | null;
    setActiveContent?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    /** Every trigger, so Tab can leave a viewport panel to the next trigger. */
    triggersRef?: React.MutableRefObject<Set<HTMLElement>>;
    /** ms the pointer rests on a trigger before its panel opens. */
    delay?: number;
    /** ms after the pointer leaves before the panel closes. */
    closeDelay?: number;
    orientation?: 'horizontal' | 'vertical';
    onOpenChangeComplete?: (open: boolean) => void;
}

const NavigationMenuRootContext = React.createContext<NavigationMenuRootContextProps>({
    isOpen: '',
    setIsOpen: () => {},
    rootClass: '',
    contentLoop: true
});

export default NavigationMenuRootContext;
