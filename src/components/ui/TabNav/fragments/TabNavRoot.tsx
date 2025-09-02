import React, { useEffect } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import TabNavContext from '../context/TabNav.context';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'TabNav';

export type TabNavRootProps = {
    className?: string,
    loop?: boolean,
    orientation?: 'horizontal' | 'vertical',
    children: React.ReactNode,
    customRootClass?: string,
    color?: string;
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
}

const TabNavRoot = ({
    className, loop = true, orientation = 'horizontal', children, color, customRootClass = '', defaultValue = '',
    onValueChange = () => {},
    value, ...props
}: TabNavRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    console.log(rootClass, `customRootClass: ${customRootClass}`);

    const [tabValue, setTabValue] = useControllableState<string>(
        value,
        defaultValue || '',
        onValueChange
    );

    const handleTabChange = (value: string) => {
        setTabValue(value);
    };

    // Set the default tab only for uncontrolled usage to avoid clobbering a
    // controlled value passed from the parent. Including `value` as a
    // dependency lets the effect react if the component switches between
    // controlled and uncontrolled modes.
    useEffect(() => {
        if (value === undefined && defaultValue) {
            handleTabChange(defaultValue);
        }
    }, [defaultValue, value]);

    const contextValues = {
        rootClass,
        tabValue,
        handleTabChange
    };

    return (
        <TabNavContext.Provider value={contextValues}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation} >
                <RovingFocusGroup.Group className={clsx(rootClass, className)} {...props}>
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TabNavContext.Provider>

    );
};

export default TabNavRoot;
