import React from 'react';
import CardRoot from './fragments/CardRoot';
import CardAction from './fragments/CardAction';
import CardContent from './fragments/CardContent';
import CardDescription from './fragments/CardDescription';
import CardFooter from './fragments/CardFooter';
import CardHeader from './fragments/CardHeader';
import CardTitle from './fragments/CardTitle';
import clsx from 'clsx';

export type CardProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
};

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
    Root: typeof CardRoot;
    Action: typeof CardAction;
    Content: typeof CardContent;
    Description: typeof CardDescription;
    Footer: typeof CardFooter;
    Header: typeof CardHeader;
    Title: typeof CardTitle;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className = '', customRootClass, variant = '', size = '', ...props }, ref) => (
    <CardRoot ref={ref} className={clsx(className)} customRootClass={customRootClass} variant={variant} size={size} {...props}>
        {children}
    </CardRoot>
)) as CardComponent;

Card.displayName = 'Card';
Card.Root = CardRoot;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Description = CardDescription;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Title = CardTitle;

export type { CardRootProps } from './fragments/CardRoot';
export type { CardActionProps } from './fragments/CardAction';
export type { CardContentProps } from './fragments/CardContent';
export type { CardDescriptionProps } from './fragments/CardDescription';
export type { CardFooterProps } from './fragments/CardFooter';
export type { CardHeaderProps } from './fragments/CardHeader';
export type { CardTitleProps } from './fragments/CardTitle';
export default Card;
