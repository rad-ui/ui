import React from 'react';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type NavigationMenuItemElement = React.ElementRef<'div'>;

export interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
}

const NavigationMenuItem = React.forwardRef<NavigationMenuItemElement, NavigationMenuItemProps>(
    ({ value, children, className, onMouseEnter, onMouseLeave, onKeyDown, ...props }, ref) => {
        const { isOpen, setIsOpen, rootClass } = React.useContext(NavigationMenuRootContext);

        const itemOpen = isOpen === value;

        const handleTrigger = () => {
            setIsOpen(itemOpen ? '' : value);
        };

        const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Escape') setIsOpen('');
        };

        return (
            <NavigationMenuItemContext.Provider value={{ itemOpen, handleTrigger }}>
                <div
                    ref={ref}
                    onMouseEnter={composeEventHandlers(onMouseEnter, handleTrigger)}
                    onMouseLeave={composeEventHandlers(onMouseLeave, handleTrigger)}
                    className={clsx(`${rootClass}-item`, className)}
                    onKeyDown={composeEventHandlers(onKeyDown, handleEscape)}
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

