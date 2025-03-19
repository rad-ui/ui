import React from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

/**
 * Props for the RovingFocusRoot component
 * @property {React.ReactNode} children - Child components (should include RovingFocusGroup)
 * @property {'horizontal'|'vertical'} [direction='horizontal'] - Direction of keyboard navigation
 * @property {boolean} [loop=true] - Whether focus should loop from last to first item and vice versa
 */
type RovingFocusRootProps = {
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    loop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Root component for the roving focus pattern
 *
 * Establishes the context and configuration for all nested RovingFocusGroup and RovingFocusItem components.
 * Manages overall direction (horizontal/vertical) and loop behavior.
 *
 * @example
 * <RovingFocusRoot direction="horizontal" loop={true}>
 *   <RovingFocusGroup>
 *     <RovingFocusItem><Button>Item 1</Button></RovingFocusItem>
 *     <RovingFocusItem><Button>Item 2</Button></RovingFocusItem>
 *   </RovingFocusGroup>
 * </RovingFocusRoot>
 */
const RovingFocusRoot = ({ children, direction = 'horizontal', loop = true, ...props }: RovingFocusRootProps) => {
    const sendValues = {
        direction,
        loop
    };

    return <RovingFocusRootContext.Provider value={sendValues}>
        <Primitive.div {...props}>
            {children}
        </Primitive.div>
    </RovingFocusRootContext.Provider>;
};

export default RovingFocusRoot;
