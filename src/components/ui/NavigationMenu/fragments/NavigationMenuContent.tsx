import React, { useEffect } from 'react';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import clsx from 'clsx';

export type NavigationMenuContentElement = React.ElementRef<'div'>;

export interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
}

const NavigationMenuContent = React.forwardRef<NavigationMenuContentElement, NavigationMenuContentProps>(
    ({ children, className, ...props }, ref) => {
        const { itemOpen } = React.useContext(NavigationMenuItemContext);
        const { rootClass } = React.useContext(NavigationMenuRootContext);
        const contentRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

        useEffect(() => {
            const firstFocusable = contentRef.current?.querySelector<HTMLElement>('*');
            firstFocusable?.focus();
        }, [itemOpen]);

        if (!itemOpen) return null;

        return (
            <div
                ref={contentRef}
                className={clsx(`${rootClass}-content`, className)}
                data-state={itemOpen ? 'open' : 'closed'}
                {...props}
            >
                <RovingFocusGroup.Root>
                    <RovingFocusGroup.Group>{children}</RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
            </div>
        );
    }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

export default NavigationMenuContent;

