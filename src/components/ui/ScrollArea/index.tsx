import React from 'react';

import ScrollAreaRoot from './fragments/ScrollAreaRoot';
import ScrollAreaViewport from './fragments/ScrollAreaViewport';
import ScrollAreaScrollBar from './fragments/ScrollAreaScrollBar';
import ScrollAreaThumb from './fragments/ScrollAreaThumb';

const ScrollArea = ({ children, ...props }: any) => {
    return <ScrollAreaRoot {...props}>
        <ScrollAreaViewport>{children}</ScrollAreaViewport>
        <ScrollAreaScrollBar>
            <ScrollAreaThumb />
        </ScrollAreaScrollBar>
    </ScrollAreaRoot>;
};

export default ScrollArea;
