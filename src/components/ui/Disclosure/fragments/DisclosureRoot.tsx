import React, { useState, useRef, useCallback } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Disclosure';

export type DisclosureRootProps = React.ComponentPropsWithoutRef<'div'> & {
     customRootClass?: string;
     defaultOpen?: number | null;
};

const DisclosureRoot = React.forwardRef<React.ElementRef<'div'>, DisclosureRootProps>(({ children, customRootClass, 'aria-label': ariaLabel, ...props }, forwardedRef) => {
    const disclosureRef = useRef<React.ElementRef<'div'> | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<number | null>(null);

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
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group className={clsx(`${rootClass}-root`)}>
                    <div
                        {...props}
                        className={clsx(`${rootClass}-root`)}
                        ref={setRefs}
                        role="region"
                        aria-label={ariaLabel}
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
