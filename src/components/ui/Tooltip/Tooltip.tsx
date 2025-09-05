'use client';

import React from 'react';

import TooltipRoot from './fragments/TooltipRoot';
import TooltipTrigger from './fragments/TooltipTrigger';
import TooltipContent from './fragments/TooltipContent';

interface TooltipComponent extends React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<React.ElementRef<'div'>>> {
    Root: typeof TooltipRoot;
    Trigger: typeof TooltipTrigger;
    Content: typeof TooltipContent;
}

const Tooltip = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
    (_props, _ref) => {
        console.warn('Direct usage of Tooltip is not supported. Please use Tooltip.Root, Tooltip.Trigger, etc. instead.');
        return null;
    }
) as TooltipComponent;

Tooltip.displayName = 'Tooltip';

Tooltip.Root = TooltipRoot;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
