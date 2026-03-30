'use client';

import React from 'react';
import PopoverRoot from './fragments/PopoverRoot';
import PopoverTrigger from './fragments/PopoverTrigger';
import PopoverContent from './fragments/PopoverContent';
import PopoverArrow from './fragments/PopoverArrow';

interface PopoverComponent extends React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<React.ElementRef<'div'>>> {
    Root: typeof PopoverRoot;
    Trigger: typeof PopoverTrigger;
    Content: typeof PopoverContent;
    Arrow: typeof PopoverArrow;
}

const Popover = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>((_, __) => {
    console.warn('Direct usage of Popover is not supported. Use Popover.Root etc.');
    return null;
}) as PopoverComponent;

Popover.displayName = 'Popover';

Popover.Root = PopoverRoot;
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Arrow = PopoverArrow;

export default Popover;
