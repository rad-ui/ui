import React from 'react';

import HoverCardRoot from './fragments/HoverCardRoot';
import HoverCardTrigger from './fragments/HoverCardTrigger';
import HoverCardPortal from './fragments/HoverCardPortal';
import HoverCardContent from './fragments/HoverCardContent';
import HoverCardArrow from './fragments/HoverCardArrow';

// Empty props type - only supporting fragment exports
export type HoverCardProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const HoverCard = () => {
    console.warn('Direct usage of HoverCard is not supported. Please use HoverCard.Root, HoverCard.Trigger, etc. instead.');
    return null;
};

HoverCard.Root = HoverCardRoot;
HoverCard.Trigger = HoverCardTrigger;
HoverCard.Portal = HoverCardPortal;
HoverCard.Content = HoverCardContent;
HoverCard.Arrow = HoverCardArrow;

export default HoverCard;
