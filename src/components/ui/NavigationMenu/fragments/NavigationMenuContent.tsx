import React from 'react';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import clsx from 'clsx';

export type NavigationMenuContentElement = React.ElementRef<'div'>;

export interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    loop?: boolean;
}

const NavigationMenuContent = React.forwardRef<NavigationMenuContentElement, NavigationMenuContentProps>(
    ({ children, className, loop, ...props }, ref) => {
        const { itemOpen, contentId, flushPendingFocus } = React.useContext(NavigationMenuItemContext);
        const { rootClass, contentLoop, dir } = React.useContext(NavigationMenuRootContext);
        const contentRef = React.useRef<HTMLDivElement>(null);
        const resolvedLoop = loop ?? contentLoop;

        React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

        // Links register themselves in effects that run before this one, so a pending
        // "focus first link" request (ArrowDown on a closed trigger) can be served here.
        React.useEffect(() => {
            if (itemOpen) flushPendingFocus?.();
        }, [itemOpen]);

        if (!itemOpen) return null;

        return (
            <div
                ref={contentRef}
                id={contentId}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                data-state={itemOpen ? 'open' : 'closed'}
                {...props}
            >
                {/* Panels lay links out in rows, columns or grids, so every arrow key moves between them. */}
                <RovingFocusGroup.Root loop={resolvedLoop} orientation="both" dir={dir}>
                    {/* Always render a wrapper group: slotting onto a lone Link would put role="group" on the anchor. */}
                    <RovingFocusGroup.Group asChild={false}>{children}</RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
            </div>
        );
    }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

export default NavigationMenuContent;
