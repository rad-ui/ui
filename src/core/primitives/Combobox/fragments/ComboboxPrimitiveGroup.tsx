import React from 'react';
import { ComboboxGroupContext } from '../contexts/ComboboxGroupContext';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';

export type ComboboxPrimitiveGroupProps = {
    children: React.ReactNode,
    className?: string,
}

const ComboboxPrimitiveGroup = React.forwardRef<
    React.ElementRef<'div'>,
    ComboboxPrimitiveGroupProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => {
    const [visibleItems, setVisibleItems] = React.useState<Set<string>>(new Set());
    const { search } = React.useContext(ComboboxPrimitiveContext);

    const registerItem = React.useCallback((id: string, isVisible: boolean) => {
        setVisibleItems(prev => {
            if (isVisible && prev.has(id)) return prev;
            if (!isVisible && !prev.has(id)) return prev;

            const next = new Set(prev);
            if (isVisible) {
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
        return () => {
            setVisibleItems(prev => {
                if (!prev.has(id)) return prev;
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        };
    }, []);

    const hasVisibleItems = visibleItems.size > 0;
    const shouldHide = search !== '' && !hasVisibleItems;

    const labelId = React.useId();
    const [hasLabel, setHasLabel] = React.useState(false);
    const contextValue = React.useMemo(() => ({ registerItem, labelId, setHasLabel }), [registerItem, labelId]);

    return (
        <ComboboxGroupContext.Provider value={contextValue}>
            <div
                className={className}
                ref={forwardedRef}
                role="group"
                aria-labelledby={hasLabel ? labelId : undefined}
                {...props}
                style={{ display: shouldHide ? 'none' : undefined, ...props.style }}
            >
                {children}
            </div>
        </ComboboxGroupContext.Provider>
    );
});

ComboboxPrimitiveGroup.displayName = 'ComboboxPrimitiveGroup';

export default ComboboxPrimitiveGroup;
