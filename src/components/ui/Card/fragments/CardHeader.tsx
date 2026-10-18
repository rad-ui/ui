import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardHeaderProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CardHeader = React.forwardRef<React.ElementRef<typeof Primitive.div>, CardHeaderProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-header`, className)} {...props}>{children}</Primitive.div>;
});

CardHeader.displayName = 'CardHeader';

export default CardHeader;
