import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

import { useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, autoPlacement, hide, shift, autoUpdate, useRole, useDismiss, FloatingPortal, Placement } from '@floating-ui/react';

import PopperRoot from './fragments/PopperRoot';
import PopperContent from './fragments/PopperContent';
import PopperTrigger from './fragments/PopperTrigger';

import type { PopperRootProps } from './fragments/PopperRoot';
import type { PopperContentProps } from './fragments/PopperContent';
import type { PopperTriggerProps } from './fragments/PopperTrigger';

// TODO : Use Floating Portal?
// TODO : Collisions dont seem to be working as expected, need to investigate

const ARROW_HEIGHT = 7;
const GAP = 2;

/**
 *
 *
 * For Placement https://floating-ui.com/docs/computePosition#placement

 */

const COMPONENT_NAME = 'Popper';

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
  return (
    <PopperRoot>
      <PopperTrigger>{children}</PopperTrigger>
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
