import React, { useMemo } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import CardContext from '../contexts/CardContext';
const COMPONENT_NAME = 'Card';
export type CardRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
};

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(({ children, customRootClass, className = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('card', { variant, size });
    const contextValue = useMemo(() => ({ rootClass }), [rootClass]);

    return (
        <CardContext.Provider value={contextValue}>
            <div ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props} >
                {children}
            </div>
        </CardContext.Provider>
    );
});

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
