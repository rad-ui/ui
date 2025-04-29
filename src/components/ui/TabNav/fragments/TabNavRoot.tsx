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
}

const TabNavRoot = ({
    className, loop = true, orientation = 'horizontal', children, color, customRootClass = '', ...props
}: TabNavRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const contextValues = {
        rootClass
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
