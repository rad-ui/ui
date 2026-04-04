import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardContentProps = React.ComponentPropsWithoutRef<'div'>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <div ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>{children}</div>;
});

CardContent.displayName = 'CardContent';

export default CardContent;
