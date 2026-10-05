'use client';
import React from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';

const COMPONENT_NAME = 'Skeleton';

export type SkeletonProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Shows the placeholder while true (default) and the children once false. */
    loading?: boolean;
    customRootClass?: string;
    /** Placeholder height; falls back to the theme default (1em in Clarity). */
    height?: string;
    /** Placeholder width; falls back to the theme default (100% in Clarity). */
    width?: string;
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
            style,
            ...props
        },
        ref
    ) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

        if (!loading) return <>{children}</>;

        return (
            <div
                ref={ref}
                className={clsx(rootClass, className)}
                style={{
                    ...style,
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
