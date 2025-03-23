import React from 'react';
import CardRoot from './fragments/CardRoot';
import { clsx } from 'clsx';
export type CardProps = {
    customRootClass?: string;
    className?: string;
    props?: any;
} & React.ComponentProps<'div'>;

const Card = ({ children, className = '', customRootClass, ...props }: CardProps) => (
    <CardRoot className={clsx(className)} customRootClass={customRootClass} {...props}>
        {children}
    </CardRoot>
);

Card.Root = CardRoot;
export default Card;
