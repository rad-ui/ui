import React from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

/**
 * Props for the RovingFocusRoot component
 * @property {React.ReactNode} children - Child components (should include RovingFocusGroup)
 * @property {'horizontal'|'vertical'} [direction='horizontal'] - Direction of keyboard navigation
 * @property {boolean} [loop=true] - Whether focus should loop from last to first item and vice versa
 * @property {string} [aria-label] - Accessible label for the roving focus group
 * @property {string} [aria-labelledby] - ID of an element that labels the roving focus group
 */
type RovingFocusRootProps = {
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    loop?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Root component for the roving focus pattern
 *
 * Establishes the context and configuration for all nested RovingFocusGroup and RovingFocusItem components.
 * Manages overall direction (horizontal/vertical) and loop behavior.
 *
 * @example
 * <RovingFocusRoot direction="horizontal" loop={true} aria-label="Main navigation">
 *   <RovingFocusGroup>
 *     <RovingFocusItem><Button>Item 1</Button></RovingFocusItem>
 *     <RovingFocusItem><Button>Item 2</Button></RovingFocusItem>
 *   </RovingFocusGroup>
 * </RovingFocusRoot>
 */
const RovingFocusRoot = ({
    children,
    direction = 'horizontal',
    loop = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: RovingFocusRootProps) => {
    const sendValues = {
        direction,
        loop
    };

    return <RovingFocusRootContext.Provider value={sendValues}>
        <Primitive.div
            role="listbox"
            aria-orientation={direction}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            {...props}
        >
            {children}
        </Primitive.div>
    </RovingFocusRootContext.Provider>;
};

export default RovingFocusRoot;
