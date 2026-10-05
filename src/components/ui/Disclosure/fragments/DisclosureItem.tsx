import React, { useContext, useId, useCallback } from 'react';
import { DisclosureContext, DisclosureItemValue } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import clsx from 'clsx';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureItemProps = React.ComponentPropsWithoutRef<'div'> & {
    value: DisclosureItemValue;
};

const noop = () => {};

const DisclosureItem = React.forwardRef<React.ElementRef<'div'>, DisclosureItemProps>(({ children, className = '', value, ...props }, forwardedRef) => {
    const { activeItem, setActiveItem, rootClass } = useContext(DisclosureContext);
    const triggerId = useId();

    // Open state is derived from the root so there is a single source of truth.
    const isOpen = activeItem === value;

    const handleOpenChange = useCallback((nextOpen: boolean) => {
        setActiveItem(nextOpen ? value : null);
    }, [setActiveItem, value]);

    return (
        <DisclosureItemContext.Provider
            value={{
                itemValue: value,
                setItemValue: noop,
                triggerId
            }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={handleOpenChange}
                asChild
            >
                <div
                    {...props}
                    className={clsx(rootClass && `${rootClass}-item`, className)}
                    ref={forwardedRef}
                    data-state={isOpen ? 'open' : 'closed'}
                    data-slot="disclosure-item"
                >
                    {children}
                </div>
            </CollapsiblePrimitive.Root>
        </DisclosureItemContext.Provider>
    );
});

DisclosureItem.displayName = 'DisclosureItem';

export default DisclosureItem;
