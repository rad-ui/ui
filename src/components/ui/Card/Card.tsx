import React from 'react';

/**
 * Shards
 */
import CardRoot from './shards/CardRoot';

export type CardProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    props?: any;
};

const Card = ({children, className = '', customRootClass, ...props}:CardProps) => {
    return (
        <CardRoot className={className} customRootClass={customRootClass} {...props}>
            {children}
        </CardRoot>
    );
};


Card.Root = CardRoot;
export default Card;
