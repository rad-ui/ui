import React, { useContext, useState } from 'react';

import { ToggleContext } from '../contexts/toggleContext';
import TogglePrimitive from '~/core/primitives/Toggle';

export type ToggleItemProps = {
    children?: React.ReactNode;
    value?: any;
    props?: any;
};

const ToggleItem = ({ children, value = null, ...props }:ToggleItemProps) => {
    const { type, activeToggles, setActiveToggles, nextItem, previousItem } = useContext(ToggleContext);
    const isActive = activeToggles?.includes(value);

    const [isFocused, setIsFocused] = useState(false);

    const ariaProps:any = {};
    const dataProps:any = {};

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

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

    const handleKeyDown = (e:any) => {
        if (e.key === 'ArrowRight') {
            // prevent scrolling when pressing arrow keys
            e.preventDefault();
            nextItem();
        }
        if (e.key === 'ArrowLeft') {
            // prevent scrolling when pressing arrow keys
            e.preventDefault();
            previousItem();
        }
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...ariaProps}
        {...dataProps}
        data-rad-ui-batch-element
        onKeyDown={handleKeyDown}
        {...isFocused ? { 'data-rad-ui-focus-element': '' } : {}}
        {...props}

    >{children}</TogglePrimitive>;
};

export default ToggleItem;
