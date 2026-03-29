'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'Spinner';

export type SpinnerProps = {
    customRootClass?: string;
    size?: string;
} & ComponentPropsWithoutRef<'span'>;

type SpinnerElement = ElementRef<'span'>;

const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(({ className, customRootClass = '', size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('spinner', { size });

    return (
        <div className={`${rootClass}-container`}>
            <span
                className={clsx(rootClass, className)} {...props}

                {...dataAttributes()}>
            </span>
        </div>
    );
});

export default Spinner;
