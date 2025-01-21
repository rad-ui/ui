import React, { PropsWithChildren } from 'react';
import CardRoot from './fragments/CardRoot';
import { clsx } from 'clsx';
export type CardProps = {
    customRootClass?: string;
    className?: string;
    props?: any;
    color?: string;
} & React.ComponentProps<'div'>;

const Card = ({ children, className = '', customRootClass, color='', ...props }: PropsWithChildren<CardProps>) => {
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }
    
    return (
    <CardRoot className={clsx(className)} customRootClass={customRootClass} {...props} {...data_attributes}>
        {children}
    </CardRoot>
    )
};

Card.Root = CardRoot;
export default Card;
