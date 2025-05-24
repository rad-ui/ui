import React from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core';
import { ScrollAreaContext } from '../context/ScrollAreaContext';

const COMPONENT_NAME = 'ScrollArea';

type ScrollAreaRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
};

const ScrollAreaRoot = ({ children, className = '', customRootClass = '', ...props }: ScrollAreaRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <ScrollAreaContext.Provider value={{ rootClass }}>
        <div className={clsx(rootClass, className)} {...props} >{children}</div>
    </ScrollAreaContext.Provider>;
};

export default ScrollAreaRoot;
