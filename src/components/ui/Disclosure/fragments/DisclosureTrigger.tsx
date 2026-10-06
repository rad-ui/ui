import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type DisclosureTriggerProps = React.ComponentPropsWithoutRef<'button'>;

const DisclosureTrigger = React.forwardRef<React.ElementRef<'button'>, DisclosureTriggerProps>(({ children, className, id, ...props }, forwardedRef) => {
    const { rootClass } = useContext(DisclosureContext);
    const { triggerId } = useContext(DisclosureItemContext);
    const resolvedId = id ?? triggerId;

    // Toggling, aria-expanded, aria-controls and data-state come from the Collapsible trigger.
    // A consumer onClick runs first and can cancel the toggle with event.preventDefault().
    return (
        <RovingFocusGroup.Item domId={resolvedId}>
            <CollapsiblePrimitive.Trigger asChild>
                <button
                    {...props}
                    ref={forwardedRef}
                    id={resolvedId}
                    type='button'
                    className={clsx(rootClass && `${rootClass}-trigger`, className)}
                    data-slot="disclosure-trigger"
                >
                    {children}
                </button>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>
    );
});

DisclosureTrigger.displayName = 'DisclosureTrigger';

export default DisclosureTrigger;
