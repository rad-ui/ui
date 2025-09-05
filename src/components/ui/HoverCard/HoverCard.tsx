import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import HoverCardRoot from './fragments/HoverCardRoot';
import HoverCardTrigger from './fragments/HoverCardTrigger';
import HoverCardPortal from './fragments/HoverCardPortal';
import HoverCardContent from './fragments/HoverCardContent';
import HoverCardArrow from './fragments/HoverCardArrow';

export type HoverCardElement = ElementRef<'div'>;
// Empty props type - only supporting fragment exports
export type HoverCardProps = ComponentPropsWithoutRef<'div'>;

type HoverCardComponent = React.ForwardRefExoticComponent<HoverCardProps & React.RefAttributes<HoverCardElement>> & {
    Root: typeof HoverCardRoot;
    Trigger: typeof HoverCardTrigger;
    Portal: typeof HoverCardPortal;
    Content: typeof HoverCardContent;
    Arrow: typeof HoverCardArrow;
};

// Empty implementation - we don't support direct usage
const HoverCard = forwardRef<HoverCardElement, HoverCardProps>((_, ref) => {
    console.warn('Direct usage of HoverCard is not supported. Please use HoverCard.Root, HoverCard.Trigger, etc. instead.');
    return null;
}) as HoverCardComponent;

HoverCard.displayName = 'HoverCard';

HoverCard.Root = HoverCardRoot;
HoverCard.Trigger = HoverCardTrigger;
HoverCard.Portal = HoverCardPortal;
HoverCard.Content = HoverCardContent;
HoverCard.Arrow = HoverCardArrow;

export default HoverCard;
