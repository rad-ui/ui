import React from 'react';
import { createPortal } from 'react-dom';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import clsx from 'clsx';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';

export type NavigationMenuContentElement = React.ElementRef<'div'>;

export interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    loop?: boolean;
    /** Keep the panel in the DOM while closed (hidden), for SEO or to keep its state. */
    forceMount?: boolean;
}

const NavigationMenuContent = React.forwardRef<NavigationMenuContentElement, NavigationMenuContentProps>(
    ({ children, className, loop, onKeyDown, forceMount = false, ...props }, ref) => {
        const { itemOpen, contentId, flushPendingFocus, contentNodeRef, triggerRef } = React.useContext(NavigationMenuItemContext);
        const { rootClass, contentLoop, dir, viewport, setActiveContent, triggersRef, onOpenChangeComplete } = React.useContext(NavigationMenuRootContext);
        const contentRef = React.useRef<HTMLDivElement | null>(null);
        const resolvedLoop = loop ?? contentLoop;

        React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

        const setContentNode = React.useCallback((node: HTMLDivElement | null) => {
            contentRef.current = node;
            if (contentNodeRef) contentNodeRef.current = node;
            if (node) {
                setActiveContent?.(node);
            } else {
                setActiveContent?.((current) => (current && !current.isConnected ? null : current));
            }
        }, [contentNodeRef, setActiveContent]);

        // Links register themselves in effects that run before this one, so a pending
        // "focus first link" request (ArrowDown on a closed trigger) can be served here.
        React.useEffect(() => {
            if (itemOpen) flushPendingFocus?.();
        }, [itemOpen]);

        // Links rove, so Tab always leaves the panel. Inside a viewport the panel is out of DOM
        // order: Shift+Tab goes back to its trigger and Tab on to the next trigger (or onward
        // from the viewport after the last one).
        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(event);
            if (event.defaultPrevented || event.key !== 'Tab' || !viewport) return;
            const trigger = triggerRef.current;
            if (!trigger) return;
            if (event.shiftKey) {
                event.preventDefault();
                trigger.focus();
                return;
            }
            const triggers = Array.from(triggersRef?.current ?? []).filter((node) => node.isConnected);
            triggers.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
            const next = triggers[triggers.indexOf(trigger) + 1];
            if (!next) return;
            event.preventDefault();
            next.focus();
        };

        const transition = useTransitionStatus(Boolean(itemOpen), () => contentRef.current, onOpenChangeComplete);
        if (!transition.mounted && !forceMount) return null;
        const hidden = !itemOpen && !transition.mounted;

        const panel = (
            <div
                ref={setContentNode}
                id={contentId}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                data-state={itemOpen ? 'open' : 'closed'}
                {...getTransitionAttributes(transition.status)}
                hidden={hidden || undefined}
                {...props}
                onKeyDown={handleKeyDown}
            >
                {/* Panels lay links out in rows, columns or grids, so every arrow key moves between them. */}
                <RovingFocusGroup.Root loop={resolvedLoop} orientation="both" dir={dir}>
                    {/* Always render a wrapper group: slotting onto a lone Link would put role="group" on the anchor. */}
                    <RovingFocusGroup.Group asChild={false}>{children}</RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
            </div>
        );

        // With a NavigationMenu.Viewport rendered, every panel shows inside it.
        return viewport ? createPortal(panel, viewport) : panel;
    }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

export default NavigationMenuContent;
