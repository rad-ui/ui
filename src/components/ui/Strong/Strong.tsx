import React from 'react';

interface StrongProps {
    children: React.ReactNode
}

const Strong = ({children}: StrongProps) => {
    return (
        <strong>{children}</strong>
    );
};

export default Strong;
