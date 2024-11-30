import React, { useContext } from 'react';

import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';

const HoverCardArrow = ({ ...props }) => {
    const { floatingContext, arrowRef } = useContext(HoverCardContext);

    return <Floater.Arrow {...props} context={floatingContext} ref={arrowRef} />;
};

export default HoverCardArrow;
