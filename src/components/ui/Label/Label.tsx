'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Label';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
    /**
     * Custom root class to override default styling.
     */
    customRootClass?: string;
}

type LabelElement = ElementRef<'label'>;

const Label = React.forwardRef<LabelElement, LabelProps>(
    ({ className, customRootClass, htmlFor, ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        return (
            <label
                ref={ref}
                htmlFor={htmlFor}
                className={clsx(rootClass, className)}
                {...props}
            />
        );
    }
);

Label.displayName = COMPONENT_NAME;

export default Label;
export type { LabelElement };
