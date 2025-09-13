import React, { useContext, useEffect, useState, useId } from 'react';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import clsx from 'clsx';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureItemProps = React.ComponentPropsWithoutRef<'div'> & {
    value: number;
};

const DisclosureItem = React.forwardRef<React.ElementRef<'div'>, DisclosureItemProps>(({ children, className = '', value, ...props }, forwardedRef) => {
    const { activeItem, rootClass } = useContext(DisclosureContext);

    const [itemValue, setItemValue] = useState<number>(value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(activeItem === itemValue);
    }, [activeItem, itemValue]);

    const id = useId();

    return (
        <DisclosureItemContext.Provider
            value={{
                itemValue,
                setItemValue
            }}>

            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={setIsOpen}
                asChild
            >
                <div
                    {...props}
                    className={clsx(`${rootClass}-item`, className)}
                    ref={forwardedRef}
                    data-state={isOpen ? 'open' : 'closed'}
                    id={`disclosure-data-item-${id}`}
                    role="region"
                    aria-labelledby={`disclosure-trigger-${id}`}
                >
                    {children}

                </div>
            </CollapsiblePrimitive.Root>

        </DisclosureItemContext.Provider>
    );
});

DisclosureItem.displayName = 'DisclosureItem';

export default DisclosureItem;
