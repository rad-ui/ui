import React from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

/**
 * Props for the RovingFocusRoot component
 * @property {React.ReactNode} children - Child components (should include RovingFocusGroup)
 * @property {'horizontal'|'vertical'} [orientation='horizontal'] - Orientation of keyboard navigation
 * @property {boolean} [loop=true] - Whether focus should loop from last to first item and vice versa
 * @property {string} [aria-label] - Accessible label for the roving focus group
 * @property {string} [aria-labelledby] - ID of an element that labels the roving focus group
 */
type RovingFocusRootProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical' | 'both';
    dir?: 'ltr' | 'rtl';
    mode?: 'default' | 'tree';
    loop?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    disableTabIndexing?: boolean;
    asChild?: boolean;
};

/**
 * Root component for the roving focus pattern
 *
 * Establishes the context and configuration for all nested RovingFocusGroup and RovingFocusItem components.
 * Manages overall orientation (horizontal/vertical) and loop behavior.
 *
 * @example
 * <RovingFocusRoot orientation="horizontal" loop={true} aria-label="Main navigation">
 *   <RovingFocusGroup>
 *     <RovingFocusItem><Button>Item 1</Button></RovingFocusItem>
 *     <RovingFocusItem><Button>Item 2</Button></RovingFocusItem>
 *   </RovingFocusGroup>
 * </RovingFocusRoot>
 */
const RovingFocusRoot = React.forwardRef<React.ElementRef<'div'>, RovingFocusRootProps>(({ 
    children,
    orientation = 'horizontal',
    loop = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    disableTabIndexing = false,
    mode = 'default',
    dir = 'ltr',
    asChild = false,
    ...props
}, forwardedRef) => {
    const sendValues = {
        orientation,
        loop,
        disableTabIndexing,
        dir,
        mode
    };

    return <RovingFocusRootContext.Provider value={sendValues}>
        <Primitive.div
            aria-orientation={orientation === 'both' ? undefined : orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            ref={forwardedRef}
            asChild={asChild}
            {...props}
        >
            {children}
        </Primitive.div>
    </RovingFocusRootContext.Provider>;
});

RovingFocusRoot.displayName = 'RovingFocusRoot';

export default RovingFocusRoot;
