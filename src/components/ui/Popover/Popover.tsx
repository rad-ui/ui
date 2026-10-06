'use client';

import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import PopoverRoot from './fragments/PopoverRoot';
import PopoverTrigger from './fragments/PopoverTrigger';
import PopoverAnchor from './fragments/PopoverAnchor';
import PopoverPortal from './fragments/PopoverPortal';
import PopoverContent from './fragments/PopoverContent';
import PopoverClose from './fragments/PopoverClose';
import PopoverArrow from './fragments/PopoverArrow';
import PopoverTitle from './fragments/PopoverTitle';
import PopoverDescription from './fragments/PopoverDescription';

export type PopoverElement = ElementRef<'div'>;
export type PopoverProps = ComponentPropsWithoutRef<'div'>;

type PopoverComponent = React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<PopoverElement>> & {
    Root: typeof PopoverRoot;
    Trigger: typeof PopoverTrigger;
    Anchor: typeof PopoverAnchor;
    Portal: typeof PopoverPortal;
    Content: typeof PopoverContent;
    Close: typeof PopoverClose;
    Arrow: typeof PopoverArrow;
    Title: typeof PopoverTitle;
    Description: typeof PopoverDescription;
};

const Popover = forwardRef<PopoverElement, PopoverProps>((_props, _ref) => {
    console.warn('Direct usage of Popover is not supported. Please use Popover.Root, Popover.Trigger, etc. instead.');
    return null;
}) as PopoverComponent;

Popover.displayName = 'Popover';

Popover.Root = PopoverRoot;
Popover.Trigger = PopoverTrigger;
Popover.Anchor = PopoverAnchor;
Popover.Portal = PopoverPortal;
Popover.Content = PopoverContent;
Popover.Close = PopoverClose;
Popover.Arrow = PopoverArrow;
Popover.Title = PopoverTitle;
Popover.Description = PopoverDescription;

export type { PopoverRootProps } from './fragments/PopoverRoot';
export type { PopoverTriggerProps } from './fragments/PopoverTrigger';
export type { PopoverAnchorProps } from './fragments/PopoverAnchor';
export type { PopoverPortalProps } from './fragments/PopoverPortal';
export type { PopoverContentProps } from './fragments/PopoverContent';
export type { PopoverCloseProps } from './fragments/PopoverClose';
export type { PopoverArrowProps } from './fragments/PopoverArrow';
export type { PopoverTitleProps } from './fragments/PopoverTitle';
export type { PopoverDescriptionProps } from './fragments/PopoverDescription';
// Named part exports let React Server Components use `import * as Popover from '@radui/ui/Popover'`;
// property access on the default export is undefined across the client boundary.
export {
    PopoverRoot as Root,
    PopoverTrigger as Trigger,
    PopoverAnchor as Anchor,
    PopoverPortal as Portal,
    PopoverContent as Content,
    PopoverClose as Close,
    PopoverArrow as Arrow,
    PopoverTitle as Title,
    PopoverDescription as Description
};

export default Popover;
