import React, { PropsWithChildren } from 'react';
import CardRoot from './fragments/CardRoot';

export type CardProps = {
    customRootClass?: string;
    className?: string;
    props?: any;
} & React.ComponentProps<'div'>;

const Card = ({ children, className = '', customRootClass, ...props }: PropsWithChildren<CardProps>) => (
    <CardRoot className={className} customRootClass={customRootClass} {...props}>
        {children}
    </CardRoot>
);

Card.Root = CardRoot;
export default Card;
