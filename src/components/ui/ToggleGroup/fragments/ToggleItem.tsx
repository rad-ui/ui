import React, { useContext } from 'react';

import { ToggleContext } from '../contexts/toggleContext';
import TogglePrimitive from '~/core/primitives/Toggle';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

/**
 * Props for the ToggleItem component
 * @typedef ToggleItemProps
 */
export type ToggleItemElement = React.ElementRef<typeof TogglePrimitive>;
export interface ToggleItemProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive> {
    /** Value associated with this toggle item, used for selection state */
    value?: any;
}

/**
 * Individual toggle item to be used within a ToggleGroup.
 * Receives context from ToggleGroupRoot for selection state management
 * and uses RovingFocusGroup.Item for keyboard navigation.
 *
 * @example
 * <ToggleGroup.Root>
 *   <ToggleItem value="bold">B</ToggleItem>
 *   <ToggleItem value="italic">I</ToggleItem>
 * </ToggleGroup.Root>
 *
 * @param {ToggleItemProps} props - Component props
 * @returns {JSX.Element} The ToggleItem component
 */
const ToggleItem = React.forwardRef<ToggleItemElement, ToggleItemProps>(({ 
    children,
    className = '',
    value = null,
    disabled = false,
    asChild = false,
    ...props
}, ref) => {
    const { type, activeToggles, setActiveToggles, rootClass, disabled: groupDisabled } = useContext(ToggleContext);
    const isActive = activeToggles?.includes(value);

    // Item is disabled if either the item itself is disabled or the group is disabled
    const isDisabled = disabled || groupDisabled;

    const ariaProps:Record<string, string> = {};
    const dataProps:Record<string, string> = {};

    /**
     * Handles the toggle selection/deselection based on the group type (single/multiple)
     */
    const handleToggleSelect = () => {
        if (isDisabled) {
            return;
        }

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

    // Set appropriate ARIA and data attributes based on active state
    if (isActive) {
        ariaProps['aria-pressed'] = 'true';
        dataProps['data-state'] = 'on';
    } else {
        ariaProps['aria-pressed'] = 'false';
        dataProps['data-state'] = 'off';
    }

    // Add data-disabled attribute if disabled
    if (isDisabled) {
        dataProps['data-disabled'] = '';
    }

    return <RovingFocusGroup.Item>
        <TogglePrimitive
            ref={ref}
            onClick={handleToggleSelect}
            className={`${rootClass}-item ${className}`}
            disabled={isDisabled}
            asChild={asChild}
            {...ariaProps}
            {...dataProps}
            {...props}
        >{children}</TogglePrimitive>
    </RovingFocusGroup.Item>;
});

ToggleItem.displayName = 'ToggleItem';

export default ToggleItem;
