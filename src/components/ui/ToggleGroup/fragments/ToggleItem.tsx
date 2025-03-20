import React, { useContext } from 'react';

import { ToggleContext } from '../contexts/toggleContext';
import TogglePrimitive from '~/core/primitives/Toggle';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type ToggleItemProps = {
    children?: React.ReactNode;
    value?: any;
    props?: any;
};

const ToggleItem = ({ children, value = null, ...props }:ToggleItemProps) => {
    const { type, activeToggles, setActiveToggles } = useContext(ToggleContext);
    const isActive = activeToggles?.includes(value);

    const ariaProps:any = {};
    const dataProps:any = {};

    const handleToggleSelect = () => {
        let activeToggleArray = activeToggles || [];

        // For Single Case
        if (type === 'single') {
            if (isActive) {
                setActiveToggles([]);
                return;
            } else {
                setActiveToggles([value]);
                return;
            }
        }

        // For Multiple Case
        if (type === 'multiple') {
            if (isActive) {
                activeToggleArray = activeToggleArray.filter((item: any) => item !== value);
            } else {
                activeToggleArray = [...activeToggleArray, value]; // Using spread operator to create a new array
            }
        }

        setActiveToggles(activeToggleArray);
    };

    if (isActive) {
        ariaProps['aria-pressed'] = 'true';
        dataProps['data-active'] = 'true';
    } else {
        ariaProps['aria-pressed'] = 'false';
        dataProps['data-active'] = 'false';
    }

    return <RovingFocusGroup.Item>
        <TogglePrimitive
            onClick={handleToggleSelect}
            {...ariaProps}
            {...dataProps}
            {...props}
        >{children}</TogglePrimitive>
    </RovingFocusGroup.Item>;
};

export default ToggleItem;
