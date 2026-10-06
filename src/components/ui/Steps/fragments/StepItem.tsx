'use client';

import React from 'react';
import { useStepsContext } from '../context/StepsContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type StepItemProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    value?: string | number | null;
};

// Accept numeric strings (e.g. `value={String(index)}`) so string-keyed lists still resolve their state.
const toStepIndex = (value: StepItemProps['value']): number | null => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const StepItem = React.forwardRef<HTMLDivElement, StepItemProps>(({ children, value, className = '', ...props }, ref) => {
    const { rootClass, currentStep, registerItem, itemElements } = useStepsContext();
    const [element, setElement] = React.useState<HTMLDivElement | null>(null);

    const setRefs = React.useCallback((node: HTMLDivElement | null) => {
        setElement(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }, [ref]);

    useIsomorphicLayoutEffect(() => {
        if (!element || !registerItem) return;
        return registerItem(element);
    }, [element, registerItem]);

    // Without an explicit `value`, an item's index is its position among the root's items.
    const derivedIndex = element && itemElements ? itemElements.indexOf(element) : -1;
    const hasExplicitValue = value !== undefined && value !== null;
    const stepIndex = hasExplicitValue ? toStepIndex(value) : (derivedIndex >= 0 ? derivedIndex : null);
    const isCompleted = stepIndex !== null && currentStep > stepIndex;
    const isActive = stepIndex !== null && currentStep === stepIndex;
    const state = isCompleted ? 'completed' : isActive ? 'active' : 'inactive';

    return (
        <Primitive.div
            ref={setRefs}
            className={clsx(rootClass && `${rootClass}-item`, className)}
            data-state={state}
            data-value={hasExplicitValue ? value : (stepIndex ?? undefined)}
            aria-current={isActive ? 'step' : undefined}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

StepItem.displayName = 'Steps.Item';

export default StepItem;
