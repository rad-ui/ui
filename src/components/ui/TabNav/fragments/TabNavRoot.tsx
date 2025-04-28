import React, { Children } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import TabNavContext from '../context/TabNav.context';

const COMPONENT_NAME = 'TabNav';

export type TabNavRootProps = {
    className?: string,
    loop?: boolean,
    orientation?: 'horizontal' | 'vertical',
    children: React.ReactNode,
    customRootClass?: string,
}

const TabNavRoot = ({ className, loop = true, orientation = 'horizontal', children, customRootClass = '', ...props }: TabNavRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <TabNavContext.Provider
            value={{
                rootClass
            }}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation} >
                <RovingFocusGroup.Group className={clsx(rootClass, className)}>
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TabNavContext.Provider>

    );
};

export default TabNavRoot;
