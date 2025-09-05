'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'Skeleton';

export type SkeletonProps = React.ComponentPropsWithoutRef<'div'> & {
    loading: boolean;
    customRootClass?: string;
    height: string;
    width: string;
    radius?: string;
};

const Skeleton = React.forwardRef<React.ElementRef<'div'>, SkeletonProps>(
    (
        {
            loading = true,
            className = '',
            customRootClass = '',
            children,
            height,
            width,
            radius,
            ...props
        },
        ref
    ) => {
        if (!loading) return <>{children}</>;

        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        return (
            <div
                ref={ref}
                className={clsx(rootClass, className)}
                style={{
                    ['--skeleton-height' as any]: height,
                    ['--skeleton-width' as any]: width,
                    ['--skeleton-radius' as any]: radius
                }}
                {...props}
            />
        );
    }
);

Skeleton.displayName = COMPONENT_NAME;

export default Skeleton;
