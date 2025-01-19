import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

import { useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, autoPlacement, hide, shift, autoUpdate, useRole, useDismiss, FloatingPortal, Placement } from '@floating-ui/react';

import Root from './fragments/PopperRoot';
import Content from './fragments/PopperContent';
import Trigger from './fragments/PopperTrigger';

// TODO : Use Floating Portal?
// TODO : Collisions dont seem to be working as expected, need to investigate

const ARROW_HEIGHT = 7;
const GAP = 2;

/**
 *
 *
 * For Placement https://floating-ui.com/docs/computePosition#placement

 */

export type PopperProps = {
    popperName?: string;
    customRootClass?: string;
    activationStrategy?: 'hover';
    className?: string;
    placement?:Placement;
    children?: React.ReactNode; // TODO: fix
    open?: boolean;
    hoverDelay?: number;
    showArrow?: boolean;
    pop?: React.ReactNode;
    props?: Record<string, any>[];
}

const Popper = ({
    popperName = '',
    customRootClass = '',
    activationStrategy = 'hover',
    className = '',
    placement = 'top',
    children,
    open = false,
    hoverDelay = 10,
    showArrow = true,
    pop = <></>,
    ...props
}: PopperProps) => {
    return <Root>
        <Trigger>{children}</Trigger>
        <Content>{pop}</Content>
    </Root>;
};

export default Popper;
