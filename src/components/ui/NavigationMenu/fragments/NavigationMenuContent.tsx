import React, { useEffect } from 'react';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import clsx from 'clsx';

export interface NavigationMenuContentProps {
    children: React.ReactNode;
    className?: string;
}

const NavigationMenuContent = ({ children, className }: NavigationMenuContentProps) => {
    const { itemOpen } = React.useContext(NavigationMenuItemContext);
    const { rootClass } = React.useContext(NavigationMenuRootContext);
    const contentRef = React.useRef<HTMLDivElement>(null);

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
        >
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group>{children}</RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </div>
    );
};

export default NavigationMenuContent;

