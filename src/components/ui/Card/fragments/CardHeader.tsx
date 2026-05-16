import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardHeaderProps = React.ComponentPropsWithoutRef<'div'>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <div ref={ref} className={clsx(rootClass && `${rootClass}-header`, className)} {...props}>{children}</div>;
});

CardHeader.displayName = 'CardHeader';

export default CardHeader;
