import React from 'react';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { mergeRefs } from '~/core/utils/mergeRefs';

export type NavigationMenuItemElement = React.ElementRef<'div'>;

export interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
}

const NavigationMenuItem = React.forwardRef<NavigationMenuItemElement, NavigationMenuItemProps>(
    ({ value, children, className, onMouseEnter, onMouseLeave, onBlur, ...props }, ref) => {
        const { isOpen, setIsOpen, rootClass, delay = 0, closeDelay = 150 } = React.useContext(NavigationMenuRootContext);
        const itemRef = React.useRef<HTMLDivElement>(null);
        const triggerRef = React.useRef<HTMLButtonElement>(null);
        const contentId = React.useId();
        const contentNodeRef = React.useRef<HTMLElement | null>(null);
        // The panel may be portaled into NavigationMenu.Viewport, outside this item's DOM.
        const containsNode = (node: Node) => !!itemRef.current?.contains(node) || !!contentNodeRef.current?.contains(node);

        const itemOpen = isOpen === value;

        // True while the item is open only because the pointer hovered it. The pointer click that
        // naturally follows a hover should then keep the menu open instead of toggling it closed.
        const openedByHoverRef = React.useRef(false);

        const handleTrigger = (event?: React.MouseEvent<HTMLElement>) => {
            // `detail === 0` means the click came from the keyboard (Enter/Space), which always toggles.
            const isPointerClick = !!event && event.detail > 0;
            if (itemOpen && openedByHoverRef.current && isPointerClick) {
                openedByHoverRef.current = false;
                return;
            }
            openedByHoverRef.current = false;
            setIsOpen(itemOpen ? '' : value);
        };

        // Closing on mouseleave is deferred so the pointer can cross the gap between the trigger and
        // the content panel (or briefly overshoot it) without the menu disappearing.
        const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
        const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
        const cancelPendingClose = () => {
            if (closeTimerRef.current !== null) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
        };
        const cancelPendingOpen = () => {
            if (openTimerRef.current !== null) {
                clearTimeout(openTimerRef.current);
                openTimerRef.current = null;
            }
        };
        // Disabled triggers don't open on hover either.
        const triggerDisabled = () => Boolean(triggerRef.current?.disabled);

        // Hover opens/closes explicitly instead of toggling, so a menu dismissed while the pointer
        // is still over it (Escape) is not re-opened when the pointer leaves.
        const handleMouseEnter = () => {
            cancelPendingClose();
            if (itemOpen || triggerDisabled()) return;
            const open = () => {
                openTimerRef.current = null;
                openedByHoverRef.current = true;
                setIsOpen(value);
            };
            // Moving between items while one is open switches at once; the first open waits `delay`.
            if (delay <= 0 || isOpen) open();
            else openTimerRef.current = setTimeout(open, delay);
        };

        const handleMouseLeave = () => {
            cancelPendingClose();
            cancelPendingOpen();
            if (!itemOpen) return;
            closeTimerRef.current = setTimeout(() => {
                closeTimerRef.current = null;
                openedByHoverRef.current = false;
                setIsOpen((current: string) => (current === value ? '' : current));
            }, closeDelay);
        };

        React.useEffect(() => {
            if (!itemOpen) {
                openedByHoverRef.current = false;
                cancelPendingClose();
            }
        }, [itemOpen]);

        React.useEffect(() => () => {
            cancelPendingClose();
            cancelPendingOpen();
        }, []);

        // Links inside the panel, kept in a ref so focus can move into the panel without querySelector.
        const linksRef = React.useRef(new Set<HTMLElement>());
        const pendingFocusFirstLinkRef = React.useRef(false);

        const registerLink = React.useCallback((node: HTMLElement) => {
            linksRef.current.add(node);
            return () => {
                linksRef.current.delete(node);
            };
        }, []);

        const focusFirstLink = () => {
            const links = Array.from(linksRef.current).filter((node) => node.isConnected);
            if (links.length === 0) return false;
            links.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
            links[0].focus();
            return true;
        };

        const flushPendingFocus = () => {
            if (!pendingFocusFirstLinkRef.current) return;
            pendingFocusFirstLinkRef.current = false;
            focusFirstLink();
        };

        const openAndFocusFirstLink = () => {
            cancelPendingClose();
            openedByHoverRef.current = false;
            if (itemOpen) {
                focusFirstLink();
                return;
            }
            pendingFocusFirstLinkRef.current = true;
            setIsOpen(value);
        };

        React.useEffect(() => {
            if (!itemOpen) pendingFocusFirstLinkRef.current = false;
        }, [itemOpen]);

        // Dismiss the open item on Escape (anywhere in the document) and on pointerdown outside it.
        React.useEffect(() => {
            if (!itemOpen) return;
            const itemNode = itemRef.current;
            const ownerDocument = itemNode?.ownerDocument ?? (typeof document !== 'undefined' ? document : null);
            if (!ownerDocument) return;

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key !== KEYBOARD_KEYS.ESCAPE || event.defaultPrevented) return;
                const activeElement = ownerDocument.activeElement;
                const focusWasInside = !!activeElement && containsNode(activeElement);
                const focusWasNowhere = !activeElement || activeElement === ownerDocument.body;
                setIsOpen('');
                // Return focus to the trigger unless the user had already moved focus elsewhere.
                if (focusWasInside || focusWasNowhere) {
                    triggerRef.current?.focus();
                }
            };

            const handlePointerDown = (event: PointerEvent) => {
                const target = event.target as Node | null;
                if (target && containsNode(target)) return;
                setIsOpen('');
            };

            ownerDocument.addEventListener('keydown', handleKeyDown);
            ownerDocument.addEventListener('pointerdown', handlePointerDown);
            return () => {
                ownerDocument.removeEventListener('keydown', handleKeyDown);
                ownerDocument.removeEventListener('pointerdown', handlePointerDown);
            };
        }, [itemOpen, setIsOpen]);

        // Close when keyboard focus moves to something outside the item (Tab past the last link,
        // arrowing to another trigger). A null relatedTarget (e.g. clicking non-focusable content
        // inside the panel) is ignored; outside pointer presses are handled above.
        const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
            if (!itemOpen) return;
            const nextFocused = event.relatedTarget as Node | null;
            if (!nextFocused || containsNode(nextFocused)) return;
            setIsOpen((current: string) => (current === value ? '' : current));
        };

        return (
            <NavigationMenuItemContext.Provider value={{ itemOpen, handleTrigger, triggerRef, contentId, registerLink, openAndFocusFirstLink, flushPendingFocus, contentNodeRef }}>
                <div
                    ref={mergeRefs(itemRef, ref)}
                    onMouseEnter={composeEventHandlers(onMouseEnter, handleMouseEnter)}
                    onMouseLeave={composeEventHandlers(onMouseLeave, handleMouseLeave)}
                    onBlur={composeEventHandlers(onBlur, handleBlur)}
                    className={clsx(rootClass && `${rootClass}-item`, className)}
                    {...props}
                >
                    {children}
                </div>
            </NavigationMenuItemContext.Provider>
        );
    }
);

NavigationMenuItem.displayName = 'NavigationMenuItem';

export default NavigationMenuItem;
