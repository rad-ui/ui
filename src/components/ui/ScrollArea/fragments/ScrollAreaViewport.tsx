import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { ScrollAreaContext } from '../contexts/ScrollAreaContext';

const ScrollAreaViewport = ({ children, ...props }: any) => {
    const { rootClass, setVerticalScrollBarPosition } = useContext(ScrollAreaContext);
    const viewportClass = `${rootClass}-viewport`;

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        // calculate the scroll percentage
        const scrollPercentage = event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight);
        // console.log('scrollPercentage', scrollPercentage);
        setVerticalScrollBarPosition(scrollPercentage);
    };

    return <Primitive.div {...props} className={viewportClass} style={{}} onScroll={handleScroll}>{children}</Primitive.div>;
};

export default ScrollAreaViewport;
