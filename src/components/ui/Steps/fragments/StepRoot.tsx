'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import Primitive from '~/core/primitives/Primitive';
import StepsContext from '../context/StepsContext';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Steps';

export type StepsRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string;
    /**
     * Layout direction. Defaults to `vertical`, which is how Steps has always rendered;
     * `horizontal` lays steps out in a row with horizontal connector lines.
     */
    orientation?: 'horizontal' | 'vertical';
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
};

const StepsRoot = React.forwardRef<HTMLDivElement, StepsRootProps>(({
    children,
    className,
    customRootClass,
    orientation = 'vertical',
    value,
    defaultValue,
    onValueChange,
    ...props
}, ref) => {
    const [currentStep, setCurrentStep] = useControllableState<number>(value, defaultValue ?? 0, onValueChange);

    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [itemElements, setItemElements] = React.useState<HTMLElement[]>([]);
    const registerItem = React.useCallback((element: HTMLElement) => {
        setItemElements((previous) => {
            if (previous.includes(element)) return previous;
            return [...previous, element].sort((a, b) => {
                const position = a.compareDocumentPosition(b);
                if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
                if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
                return 0;
            });
        });
        return () => {
            setItemElements((previous) => (previous.includes(element) ? previous.filter((item) => item !== element) : previous));
        };
    }, []);

    const contextValue = React.useMemo(
        () => ({ currentStep, setCurrentStep, rootClass, orientation, registerItem, itemElements }),
        [currentStep, setCurrentStep, rootClass, orientation, registerItem, itemElements]
    );

    return <StepsContext.Provider value={contextValue}>
        <Primitive.div ref={ref} className={clsx(rootClass, className, rootClass && `${rootClass}-${orientation}`)} data-orientation={orientation} {...props}>{children}</Primitive.div>
    </StepsContext.Provider>;
});

StepsRoot.displayName = 'Steps.Root';

export default StepsRoot;
