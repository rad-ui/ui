import React from 'react';

export interface NavigationMenuItemContextProps {
   itemOpen: boolean,
   handleTrigger: (event?: React.MouseEvent<HTMLElement>) => void,
   triggerRef: React.RefObject<HTMLButtonElement>,
   contentId?: string,
   /** Links register here so the item can move focus into the panel without querying the DOM. */
   registerLink?: (node: HTMLElement) => () => void,
   /** Opens the panel (if needed) and focuses its first link once it is rendered. */
   openAndFocusFirstLink?: () => void,
   /** Called by the content once it is mounted to flush a pending "focus first link" request. */
   flushPendingFocus?: () => void
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextProps>({
    itemOpen: false,
    handleTrigger: () => {},
    triggerRef: { current: null }
});

export default NavigationMenuItemContext;
