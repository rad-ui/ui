import React from 'react';

import HoverCardRoot from './fragments/HoverCardRoot';
import HoverCardTrigger from './fragments/HoverCardTrigger';
import HoverCardPortal from './fragments/HoverCardPortal';
import HoverCardContent from './fragments/HoverCardContent';
import HoverCardArrow from './fragments/HoverCardArrow';

const HoverCard = ({ children, content = undefined, ...props }) => {
    return (
        <HoverCardRoot {...props}>
            <HoverCardTrigger>
                {children}
            </HoverCardTrigger>
            {/* <HoverCardPortal> */}
            <HoverCardContent>
                {content}
                <HoverCardArrow />
            </HoverCardContent>
            {/* </HoverCardPortal> */}
        </HoverCardRoot>
    );
};

export default HoverCard;
