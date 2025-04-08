import React from 'react';
import CardRoot from './fragments/CardRoot';
import { clsx } from 'clsx';
export type CardProps = {
    customRootClass?: string;
    className?: string;
    variant?: string;
    size?: string;
    props?: any;
} & React.ComponentProps<'div'>;

const Card = ({ children, className = '', customRootClass, variant = '', size = '', ...props }: CardProps) => (
    <CardRoot className={clsx(className)} customRootClass={customRootClass} variant={variant} size={size} {...props}>
        {children}
    </CardRoot>
);

Card.Root = CardRoot;
export default Card;
