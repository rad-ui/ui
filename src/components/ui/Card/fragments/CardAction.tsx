import React, { useContext } from 'react';
import clsx from 'clsx';
import CardContext from '../contexts/CardContext';

export type CardActionProps = React.ComponentPropsWithoutRef<'div'>;

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CardContext);

    return <div ref={ref} className={clsx(rootClass && `${rootClass}-action`, className)} {...props}>{children}</div>;
});

CardAction.displayName = 'CardAction';

export default CardAction;
