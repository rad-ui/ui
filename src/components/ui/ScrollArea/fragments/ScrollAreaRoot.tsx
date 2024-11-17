import React, { useState, useRef, useEffect } from 'react';
import { ScrollAreaContext } from '../contexts/ScrollAreaContext';

import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'ScrollArea';

const ScrollAreaRoot = ({ children, customRootClass, ...props }: any) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isHovered, setIsHovered] = useState(false);
    const [verticalScrollBarHeight, setVerticalScrollBarHeight] = useState(0);
    const [verticalScrollBarPosition, setVerticalScrollBarPosition] = useState(0);

    const scrollBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollBarRef.current) {
            setVerticalScrollBarHeight(scrollBarRef.current.clientHeight);
            setVerticalScrollBarPosition(scrollBarRef.current.offsetTop);
        }
    }, [verticalScrollBarHeight, verticalScrollBarPosition]);

    const handleFocus = () => {
        setIsHovered(true);
    };

    const handleBlur = () => {
        // 2 sec delay
        setTimeout(() => {
            setIsHovered(false);
        }, 2000);
    };

    const values = { isHovered, setIsHovered, rootClass, verticalScrollBarHeight, verticalScrollBarPosition, setVerticalScrollBarPosition };

    return (
        <ScrollAreaContext.Provider value={values}>
            <div ref={scrollBarRef} className={rootClass} onFocus={handleFocus} onBlur={handleBlur} {...props}>{children}</div>
        </ScrollAreaContext.Provider>
    );
};

ScrollAreaRoot.displayName = COMPONENT_NAME;

export default ScrollAreaRoot;
