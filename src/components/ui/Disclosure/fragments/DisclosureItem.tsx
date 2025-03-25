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
    const { activeItem, rootClass, focusItem } = useContext(DisclosureContext);

    const [itemValue, setItemValue] = useState<number>(value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(activeItem === itemValue);
    }, [activeItem, itemValue]);

    const id = useId();
    let shouldAddFocusDataAttribute = false;

    const focusItemId = focusItem?.id;
    if (focusItemId === `disclosure-data-item-${id}`) {
        shouldAddFocusDataAttribute = true;
    }

    const focusCurrentItem = () => {
        const elem = disclosureItemRef?.current;

        if (elem) {
            elem.setAttribute('data-rad-ui-focus-element', '');
        }
    };

    const handleBlurEvent = () => {
        const elem = disclosureItemRef?.current;

        if (elem) {
            elem.removeAttribute('data-rad-ui-focus-element');
        }
    };

    const handleClickEvent = () => {
        focusCurrentItem();
    };

    const handleFocusEvent = () => {
        focusCurrentItem();
    };
    return (
        <DisclosureItemContext.Provider
            value={{
                itemValue,
                setItemValue,
                handleBlurEvent,
                handleClickEvent,
                handleFocusEvent
            }}>
            <CollapsiblePrimitive.Root
                            open={isOpen}
                            asChild
                        >
            <div
                className={clsx(`${rootClass}-item`, className)}
                ref={disclosureItemRef}
                data-state={isOpen ? 'open' : 'closed'}
                id={`disclosure-data-item-${id}`}
                role="region"
                aria-labelledby={`disclosure-trigger-${id}`}
                data-expanded={isOpen}
                data-rad-ui-batch-element
                {...shouldAddFocusDataAttribute ? { 'data-rad-ui-focus-element': '' } : {}}
            >
                {children}

            </div>
            </CollapsiblePrimitive.Root>
        </DisclosureItemContext.Provider>
    );
};

export default DisclosureItem;
