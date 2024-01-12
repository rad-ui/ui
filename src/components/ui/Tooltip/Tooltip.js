import React from 'react';

import Popper from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

const Tooltip = ({children, label, ...props}) => {
    return <div>
        <Popper popperName={COMPONENT_NAME} pop={'hello'} {...props}>{children}</Popper>
    </div>;
};

export default Tooltip;
