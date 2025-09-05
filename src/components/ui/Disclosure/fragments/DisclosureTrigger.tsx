import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type DisclosureTriggerProps = React.ComponentPropsWithoutRef<'button'>;

const DisclosureTrigger = React.forwardRef<React.ElementRef<'button'>, DisclosureTriggerProps>(({ children, className, onClick, ...props }, forwardedRef) => {
    const { activeItem, setActiveItem, rootClass } = useContext(DisclosureContext);
    const { itemValue } = useContext(DisclosureItemContext);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (activeItem === itemValue) {
            setActiveItem(null);
        } else if (activeItem !== itemValue) {
            setActiveItem(itemValue);
        }
        if (onClick) onClick(e);
    };

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger asChild>
                <button
                    {...props}
                    ref={forwardedRef}
                    type='button'
                    className={clsx(`${rootClass}-trigger`, className)}
                    onClick={onClickHandler}
                    aria-expanded={activeItem === itemValue}
                    aria-haspopup='true'
                >

                    {children}
                </button>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>
    );
});

DisclosureTrigger.displayName = 'DisclosureTrigger';

export default DisclosureTrigger;
