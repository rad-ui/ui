import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'NavigationMenuRoot';

export type NavigationMenuRootElement = React.ElementRef<'div'>;

export interface NavigationMenuRootProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    customRootClass?: string;
}

const NavigationMenuRoot = React.forwardRef<NavigationMenuRootElement, NavigationMenuRootProps>(
    (
        {
            children,
            value,
            defaultValue = '',
            onValueChange,
            customRootClass,
            className,
            ...props
        },
        ref
    ) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        const [isOpen, setIsOpen] = useControllableState(value, defaultValue, onValueChange);

        return (
            <div ref={ref} {...props}>
                <NavigationMenuRootContext.Provider value={{ isOpen, setIsOpen, rootClass }}>
                    <RovingFocusGroup.Root>
                        <RovingFocusGroup.Group className={clsx(`${rootClass}-root`, className)}>
                            {children}
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </NavigationMenuRootContext.Provider>
            </div>
        );
    }
);

NavigationMenuRoot.displayName = COMPONENT_NAME;

export default NavigationMenuRoot;
