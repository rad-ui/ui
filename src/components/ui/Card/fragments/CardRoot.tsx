import React, { useMemo } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import CardContext from '../contexts/CardContext';
import Primitive from '~/core/primitives/Primitive';
const COMPONENT_NAME = 'Card';
export type CardRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
};

const CardRoot = React.forwardRef<React.ElementRef<typeof Primitive.div>, CardRootProps>(({ children, customRootClass, className = '', variant = '', size = '', ...props }, ref) => {
    const componentClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');
    const dataAttributes = createDataAttributes('card', { variant, size });
    const contextValue = useMemo(() => ({ rootClass: componentClass }), [componentClass]);

    return (
        <CardContext.Provider value={contextValue}>
            <Primitive.div ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props} >
                {children}
            </Primitive.div>
        </CardContext.Provider>
    );
});

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
