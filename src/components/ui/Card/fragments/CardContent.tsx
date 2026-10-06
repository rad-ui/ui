import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CardContent = React.forwardRef<React.ElementRef<typeof Primitive.div>, CardContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-content`, className)} {...props}>{children}</Primitive.div>;
});

CardContent.displayName = 'CardContent';

export default CardContent;
