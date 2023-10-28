'use client';
import React from 'react';

const Link = ({children, ...props}) => (
    <a {...props}>{children}</a>
);

export default Link;
