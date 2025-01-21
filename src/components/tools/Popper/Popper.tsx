import React from 'react';

import PopperRoot from './fragments/PopperRoot';
import PopperContent from './fragments/PopperContent';
import PopperTrigger from './fragments/PopperTrigger';

import type { PopperRootProps } from './fragments/PopperRoot';
import type { PopperContentProps } from './fragments/PopperContent';
import type { PopperTriggerProps } from './fragments/PopperTrigger';

// TODO : Collisions dont seem to be working as expected, need to investigate

/**
 *
 *
 * For Placement https://floating-ui.com/docs/computePosition#placement

 */

const COMPONENT_NAME = 'Popper';

export type PopperProps = {
  pop: React.ReactNode,
} & PopperRootProps & PopperContentProps & PopperTriggerProps;

const Popper = ({
    popperName = '',
    customRootClass = '',
    className = '',
    placement = 'top',
    children,
    open = false,
    showArrow = true,
    pop = <></>,
    ...props
}: PopperProps) => {
    return (
        <PopperRoot showArrow={showArrow} customRootClass={customRootClass} popperName={popperName} placement={placement} open={open}>
            <PopperTrigger className={className}>{children}</PopperTrigger>
            <PopperContent>{pop}</PopperContent>
        </PopperRoot>
    );
};

Popper.displayName = COMPONENT_NAME;
Popper.Root = PopperRoot;
Popper.Trigger = PopperTrigger;
Popper.Content = PopperContent;

export default Popper;

export { PopperRoot, PopperTrigger, PopperContent };

export type { PopperTriggerProps, PopperContentProps, PopperRootProps };
