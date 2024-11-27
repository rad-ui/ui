import React from 'react';

import HoverCardRoot from './fragments/HoverCardRoot';
import HoverCardTrigger from './fragments/HoverCardTrigger';
import HoverCardPortal from './fragments/HoverCardPortal';
import HoverCardContent from './fragments/HoverCardContent';
import HoverCardArrow from './fragments/HoverCardArrow';

const HoverCard = ({ children, ...props }) => {
    return (
        <HoverCardRoot {...props}>
            <HoverCardTrigger>trigger
            </HoverCardTrigger>
            <HoverCardPortal>
                <HoverCardContent>
                    <div>content</div>
                    <HoverCardArrow />
                </HoverCardContent>
            </HoverCardPortal>
        </HoverCardRoot>
    );
};

export default HoverCard;
