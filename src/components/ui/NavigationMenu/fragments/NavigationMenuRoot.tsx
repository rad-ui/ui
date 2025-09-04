import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'NavigationMenu';

export interface NavigationMenuRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    customRootClass?: string;
    className?: string;
}

const NavigationMenuRoot = ({
    children,
    value,
    defaultValue = '',
    onValueChange,
    customRootClass,
    className,
    ...props
}: NavigationMenuRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isOpen, setIsOpen] = useControllableState(value, defaultValue, onValueChange);

    return (
        <div {...props}>
            <NavigationMenuRootContext.Provider value={{ isOpen, setIsOpen, rootClass }}>
                <RovingFocusGroup.Root>
                    <RovingFocusGroup.Group className={clsx(`${rootClass}-root`, className)}>
                        {children}
                    </RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
            </NavigationMenuRootContext.Provider>
        </div>
    );
};

export default NavigationMenuRoot;

