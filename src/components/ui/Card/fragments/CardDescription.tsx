import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardDescriptionProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

const CardDescription = React.forwardRef<React.ElementRef<typeof Primitive.p>, CardDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.p ref={ref} className={clsx(rootClass && `${rootClass}-description`, className)} {...props}>{children}</Primitive.p>;
});

CardDescription.displayName = 'CardDescription';

export default CardDescription;
