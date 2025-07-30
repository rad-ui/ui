import React, { useContext, useEffect, useRef, useState, useId } from 'react';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import { clsx } from 'clsx';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureItemProps = {
    children: React.ReactNode;
    className?: string;
    value: number;
}

const DisclosureItem = ({ children, className = '', value }:DisclosureItemProps) => {
    const disclosureItemRef = useRef<HTMLDivElement>(null);
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
                    className={clsx(`${rootClass}-item`, className)}
                    ref={disclosureItemRef}
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
};

export default DisclosureItem;
