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
    className, loop = true, orientation = 'horizontal', children, color, customRootClass = '',defaultValue = '',
    onValueChange = () => {},
    value, ...props
}: TabNavRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [tabValue, setTabValue] = useControllableState<string>(
            value,
            defaultValue || '',
            onValueChange
        );
    
        const handleTabChange = (value: string) => {
            setTabValue(value);
        };
    
        useEffect(() => {
            if (defaultValue) {
                handleTabChange(defaultValue);
            }
        }, [defaultValue]);
    
        const contextValues = {
            rootClass,
            tabValue,
            handleTabChange
        };
    return (
        <TabNavContext.Provider value={contextValues}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation} {...props} >
                <RovingFocusGroup.Group className={clsx(rootClass, className)}>
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TabNavContext.Provider>

    );
};

export default TabNavRoot;
