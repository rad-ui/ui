import React from 'react';
import CardRoot from './fragments/CardRoot';
import clsx from 'clsx';

export type CardProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
};

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
    Root: typeof CardRoot;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className = '', customRootClass, variant = '', size = '', ...props }, ref) => (
    <CardRoot ref={ref} className={clsx(className)} customRootClass={customRootClass} variant={variant} size={size} {...props}>
        {children}
    </CardRoot>
)) as CardComponent;

Card.displayName = 'Card';
Card.Root = CardRoot;
export default Card;
