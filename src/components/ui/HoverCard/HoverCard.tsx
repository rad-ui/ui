import React from 'react';

import HoverCardRoot from './fragments/HoverCardRoot';
import HoverCardTrigger from './fragments/HoverCardTrigger';
import HoverCardPortal from './fragments/HoverCardPortal';
import HoverCardContent from './fragments/HoverCardContent';
import HoverCardArrow from './fragments/HoverCardArrow';

export type HoverCardProps = {
    children: React.ReactNode,
    content: React.ReactNode,
    customRootClass?: string,
    openDelay?: number,
    closeDelay?: number,
    onOpenChange?: (open: boolean) => void
    props?: React.HTMLAttributes<HTMLElement>,
}

const HoverCard = ({
    children,
    onOpenChange = () => { },
    content = undefined,
    customRootClass = '',
    openDelay = 100,
    closeDelay = 200,
    ...props
}: HoverCardProps) => {
    return (
        <HoverCardRoot
            open={undefined}
            onOpenChange={onOpenChange}
            openDelay={openDelay}
            closeDelay={closeDelay}
            customRootClass={customRootClass}
            {...props}
        >
            <HoverCardTrigger>
                {children}
            </HoverCardTrigger>
            <HoverCardPortal >
                <HoverCardContent>
                    {content}
                    <HoverCardArrow />
                </HoverCardContent>
            </HoverCardPortal>
        </HoverCardRoot>
    );
};

HoverCard.Root = HoverCardRoot;
HoverCard.Trigger = HoverCardTrigger;
HoverCard.Portal = HoverCardPortal;
HoverCard.Content = HoverCardContent;
HoverCard.Arrow = HoverCardArrow;

export default HoverCard;
