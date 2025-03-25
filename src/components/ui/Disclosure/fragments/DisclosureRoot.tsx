import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Disclosure';

export type DisclosureRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     defaultOpen?: number | null;
     'aria-label'?: string;

}

const DisclosureRoot = ({ children, customRootClass, 'aria-label': ariaLabel }:DisclosureRootProps) => {
    const disclosureRef = useRef(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<number | null>(null);

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
                        className={clsx(`${rootClass}-root`)}
                        ref={disclosureRef}
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
};

export default DisclosureRoot;
