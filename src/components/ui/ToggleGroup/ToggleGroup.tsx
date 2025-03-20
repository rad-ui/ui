import React from 'react';

import ToggleGroupRoot from './fragments/ToggleGroupRoot';
import ToggleItem from './fragments/ToggleItem';

const COMPONENT_NAME = 'ToggleGroup';

/**
 * ToggleGroup Item interface
 * @typedef ToggleItem
 */
type ToggleItem = {
    /** Unique value for the toggle item */
    value: any;
    /** Display label for the toggle item */
    label: any;
};

/**
 * ToggleGroup Props interface
 * @typedef ToggleGroupProps
 */
type ToggleGroupProps = {
    /** Selection mode - 'single' allows only one item to be selected, 'multiple' allows many */
    type?: 'single' | 'multiple';
    /** Array of items to display as toggles */
    items?: ToggleItem[];
    /** Optional accent color for the toggle group */
    color?: string;
};

/**
 * Type definition for the ToggleGroup component with static properties
 */
type ToggleGroupComponent = React.FC<ToggleGroupProps> & {
    Root: typeof ToggleGroupRoot;
    Item: typeof ToggleItem;
    displayName?: string;
};

/**
 * A group of toggle buttons that can operate in single or multiple selection mode.
 * Uses RovingFocusGroup for keyboard navigation accessibility.
 *
 * @example
 * // Single selection mode (default)
 * <ToggleGroup
 *   items={[
 *     { value: 'item1', label: 'Item 1' },
 *     { value: 'item2', label: 'Item 2' }
 *   ]}
 * />
 *
 * @example
 * // Multiple selection mode
 * <ToggleGroup
 *   type="multiple"
 *   items={[
 *     { value: 'bold', label: 'Bold' },
 *     { value: 'italic', label: 'Italic' },
 *     { value: 'underline', label: 'Underline' }
 *   ]}
 *   color="blue"
 * />
 *
 * @param {ToggleGroupProps} props - Component props
 * @returns {JSX.Element} The ToggleGroup component
 */
const ToggleGroup: ToggleGroupComponent = ({ type = 'single', items = [], color = '' }) => {
    return (
        <ToggleGroupRoot type={type} componentName={COMPONENT_NAME} color={color}>
            {
                items.map((item, index) => {
                    return (
                        <ToggleItem key={index} value={item.value} >
                            {item.label}
                        </ToggleItem>
                    );
                })
            }
        </ToggleGroupRoot>
    );
};

ToggleGroup.displayName = COMPONENT_NAME;

/**
 * Root component that provides context and layout for the toggle group
 */
ToggleGroup.Root = ToggleGroupRoot;

/**
 * Individual toggle item to be used within a ToggleGroup
 */
ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
