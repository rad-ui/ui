import React, { useContext } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';

const HoverCardTrigger = ({ children, ...props }) => {
    const { handleOpenChange, isOpen, floatingRefs } = useContext(HoverCardContext);

    return <>
        {/* <button onClick={() => {}} onMouseEnter={() => handleOpenChange(true)} onMouseLeave={() => handleOpenChange(false)} ref={floatingRefs.setReference} >{children}</button> */}
        <Primitive.button className="here" onClick={() => {}} onMouseEnter={() => handleOpenChange(true)} onMouseLeave={() => handleOpenChange(false)} ref={floatingRefs.setReference} >{children}</Primitive.button>
    </>;
};

export default HoverCardTrigger;
