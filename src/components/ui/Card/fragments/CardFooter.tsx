import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardFooterProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CardFooter = React.forwardRef<React.ElementRef<typeof Primitive.div>, CardFooterProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-footer`, className)} {...props}>{children}</Primitive.div>;
});

CardFooter.displayName = 'CardFooter';

export default CardFooter;
