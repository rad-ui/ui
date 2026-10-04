import React, { useState, useRef, useCallback } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { DisclosureContext, DisclosureItemValue } from '../contexts/DisclosureContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Disclosure';

export type DisclosureRootProps = React.ComponentPropsWithoutRef<'div'> & {
     customRootClass?: string;
     defaultOpen?: DisclosureItemValue | null;
     loop?: boolean;
};

const DisclosureRoot = React.forwardRef<React.ElementRef<'div'>, DisclosureRootProps>(({ children, className, customRootClass, defaultOpen = null, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, loop = true, ...props }, forwardedRef) => {
    const disclosureRef = useRef<React.ElementRef<'div'> | null>(null);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<DisclosureItemValue | null>(defaultOpen);

    const setRefs = useCallback((node: React.ElementRef<'div'> | null) => {
        disclosureRef.current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<React.ElementRef<'div'> | null>).current = node;
        }
    }, [forwardedRef]);

    return (

        <DisclosureContext.Provider
            value={{
                rootClass,
                activeItem,
                setActiveItem,
                disclosureRef

            }}>
            {/* Triggers stack vertically; accept both arrow axes. */}
            <RovingFocusGroup.Root loop={loop} orientation="both">
                <RovingFocusGroup.Group>
                    <div
                        {...props}
                        className={clsx(rootClass && `${rootClass}-root`, className)}
                        ref={setRefs}
                        // Only expose a landmark when it is labelled; an unlabelled region is noise.
                        role={ariaLabel || ariaLabelledBy ? 'region' : undefined}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        data-slot="disclosure-root"
                        data-testid='disclosure-root'
                    >

                        {children}
                    </div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>

        </DisclosureContext.Provider>
    );
});

DisclosureRoot.displayName = 'DisclosureRoot';

export default DisclosureRoot;
