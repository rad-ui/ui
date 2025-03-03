'use client';
import React from 'react';
import BadgeRoot from './fragments/BadgeRoot';
import BadgeContent from './fragments/BadgeContent';

type BadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost' | '';
type BadgeSize = 'small' | 'medium' | 'large' | 'x-large' | '';

export type BadgeProps = {
    children?: React.ReactNode,
    customRootClass?: string,
    className?: string,
    variant?: BadgeVariant;
    size?: BadgeSize
    color?: string,
    props?: object[],
}

const Badge = ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }: BadgeProps) => {


    return <BadgeRoot customRootClass={customRootClass} className={className} color={color} variant={variant} size={size} {...props}>
        <BadgeContent>
            {children}
        </BadgeContent>
    </BadgeRoot>;
};

Badge.Root = BadgeRoot;
Badge.Content = BadgeContent;
export default Badge;
