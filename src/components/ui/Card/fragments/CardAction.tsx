import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';

export type CardActionProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CardAction = React.forwardRef<React.ElementRef<typeof Primitive.div>, CardActionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-action`, className)} {...props}>{children}</Primitive.div>;
});

CardAction.displayName = 'CardAction';

export default CardAction;
