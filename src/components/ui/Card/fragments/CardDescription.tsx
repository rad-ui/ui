import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardDescriptionProps = React.ComponentPropsWithoutRef<'p'>;

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <p ref={ref} className={clsx(`${rootClass}-description`, className)} {...props}>{children}</p>;
});

CardDescription.displayName = 'CardDescription';

export default CardDescription;
