import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardTitleProps = React.ComponentPropsWithoutRef<typeof Primitive.h3>;

const CardTitle = React.forwardRef<React.ElementRef<typeof Primitive.h3>, CardTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.h3 ref={ref} className={clsx(rootClass && `${rootClass}-title`, className)} {...props}>{children}</Primitive.h3>;
});

CardTitle.displayName = 'CardTitle';

export default CardTitle;
