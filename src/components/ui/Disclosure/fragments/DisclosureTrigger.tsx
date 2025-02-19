import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';

export type DisclosureTriggerProps = {
    children: React.ReactNode;
    className?: string;
}

const DisclosureTrigger = ({ children, className }:DisclosureTriggerProps) => {
    const { activeItem, setActiveItem, rootClass, focusNextItem, focusPrevItem } = useContext(DisclosureContext);
    const { itemValue, handleBlurEvent, handleClickEvent, handleFocusEvent } = useContext(DisclosureItemContext);

    const handleDisclosure = () => {
        setActiveItem(activeItem === itemValue ? null : itemValue);
        handleClickEvent();
    };

    const onFocusHandler = () => {
        handleFocusEvent();
    };

    return (

        <button
            type='button'
            className={clsx(`${rootClass}-trigger`, className)}
            onClick={handleDisclosure}
            onBlur={handleBlurEvent}
            onFocus={onFocusHandler}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    focusNextItem();
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    focusPrevItem();
                }
            }}
            aria-expanded={activeItem === itemValue}
            aria-haspopup='true'
        >

            {children}
        </button>

    );
};

export default DisclosureTrigger;
