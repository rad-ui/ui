import React, { useContext } from 'react';
import { ScrollAreaContext } from '../contexts/ScrollAreaContext';

const ScrollAreaThumb = () => {
    const {
        rootClass,
        verticalScrollBarHeight,
        verticalScrollBarPosition,
        orientation
    } = useContext(ScrollAreaContext);

    const scrollBarClass = `${rootClass}-scroll-bar`;
    const scrollThumbClass = `${scrollBarClass}-thumb`;

    const style = {
        top: `${verticalScrollBarPosition * verticalScrollBarHeight}px`
    };

    console.log('style', style);

    return <div className={scrollThumbClass} style={style}>s</div>;
};

export default ScrollAreaThumb;
