import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardFooterProps = React.ComponentPropsWithoutRef<'div'>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <div ref={ref} className={clsx(`${rootClass}-footer`, className)} {...props}>{children}</div>;
});

CardFooter.displayName = 'CardFooter';

export default CardFooter;
