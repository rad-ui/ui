import React, { useContext } from 'react';
import { ScrollAreaContext } from '../contexts/ScrollAreaContext';

const ScrollAreaScrollBar = ({ orientation = 'vertical', children }: any) => {
    const { rootClass } = useContext(ScrollAreaContext);
    const scrollBarClass = `${rootClass}-scroll-bar`;

    return <div className={scrollBarClass}>
        {children}
    </div>;
};

export default ScrollAreaScrollBar;
