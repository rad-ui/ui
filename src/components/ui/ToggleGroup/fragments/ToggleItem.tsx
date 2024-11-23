import React, { useContext } from 'react';

import { ToggleContext } from '../contexts/toggleContext';
import TogglePrimitive from '~/core/primitives/Toggle';

export type ToggleItemProps = {
    children: React.ReactNode;
    value: any;
    props: any;
};

const ToggleItem = ({ children, value = null, ...props }:ToggleItemProps) => {
    const toggleContext = useContext(ToggleContext);

    const type = toggleContext?.type;

    const isActive = toggleContext?.activeToggles?.includes(value);

    const ariaProps:any = {};
    const dataProps:any = {};

    const handleToggleSelect = () => {
        let activeToggleArray = toggleContext?.activeToggles || [];

        // For Single Case
        if (type === 'single') {
            if (isActive) {
                toggleContext?.setActiveToggles([]);
                return;
            } else {
                toggleContext?.setActiveToggles([value]);
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

        toggleContext?.setActiveToggles(activeToggleArray);
    };

    if (isActive) {
        ariaProps['aria-pressed'] = 'true';
        dataProps['data-active'] = 'true';
    } else {
        ariaProps['aria-pressed'] = 'false';
        dataProps['data-active'] = 'false';
    }

    return <TogglePrimitive

        onClick={handleToggleSelect}
        {...ariaProps}
        {...dataProps}
        {...props}

    >{children}</TogglePrimitive>;
};

export default ToggleItem;
