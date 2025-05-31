'use client';

import React from 'react';

const ScrollAreaCorner = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div {...props}>{children}</div>;
};

export default ScrollAreaCorner;
