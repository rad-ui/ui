import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardTitleProps = React.ComponentPropsWithoutRef<'h3'>;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <h3 ref={ref} className={clsx(`${rootClass}-title`, className)} {...props}>{children}</h3>;
});

CardTitle.displayName = 'CardTitle';

export default CardTitle;
