import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type NavigationMenuTriggerElement = React.ElementRef<'button'>;

export interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {}

const NavigationMenuTrigger = React.forwardRef<NavigationMenuTriggerElement, NavigationMenuTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { handleTrigger } = React.useContext(NavigationMenuItemContext);
        const { rootClass } = React.useContext(NavigationMenuRootContext);

        return (
            <RovingFocusGroup.Item>
                <button
                    ref={ref}
                    onClick={composeEventHandlers(onClick, handleTrigger)}
                    className={clsx(`${rootClass}-trigger`, className)}
                    {...props}
                >
                    {children}
                </button>
            </RovingFocusGroup.Item>
        );
    }
);

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export default NavigationMenuTrigger;

