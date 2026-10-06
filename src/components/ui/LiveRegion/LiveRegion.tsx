'use client';

import React, { ComponentPropsWithoutRef, CSSProperties, ElementRef, forwardRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'LiveRegion';

type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';
type LiveRegionRole = 'status' | 'alert' | 'log';
type LiveRegionRelevant = 'additions' | 'removals' | 'text' | 'all' | 'additions text';

export type LiveRegionElement = ElementRef<typeof Primitive.div>;
export type LiveRegionProps = {
    /**
     * Controls how urgently assistive technology should announce updates.
     */
    politeness?: LiveRegionPoliteness;
    /**
     * Landmark role for the live region. `status` is appropriate for most
     * non-blocking updates; use `alert` for urgent errors.
     */
    role?: LiveRegionRole;
    /**
     * Whether assistive technology should announce the full region on updates.
     */
    atomic?: boolean;
    /**
     * Describes which changes should be announced.
     */
    relevant?: LiveRegionRelevant;
    /**
     * Marks the region as temporarily busy while related updates are pending.
     */
    busy?: boolean;
    /**
     * Keeps the live region in the accessibility tree while visually hiding it.
     */
    visuallyHidden?: boolean;
    customRootClass?: string;
    style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<typeof Primitive.div>, 'role' | 'aria-live' | 'aria-atomic' | 'aria-relevant' | 'aria-busy'>;

const VISUALLY_HIDDEN_STYLES: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    border: '0',
    padding: '0',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none'
} as const;

const LiveRegion = forwardRef<LiveRegionElement, LiveRegionProps>(({
    children,
    customRootClass,
    className,
    politeness = 'polite',
    role = politeness === 'assertive' ? 'alert' : 'status',
    atomic = true,
    relevant = 'additions text',
    busy,
    visuallyHidden = true,
    style,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootStyle = visuallyHidden
        ? { ...VISUALLY_HIDDEN_STYLES, ...style }
        : style;

    return (
        <Primitive.div
            ref={ref}
            role={role}
            aria-live={politeness}
            aria-atomic={atomic}
            aria-relevant={relevant}
            aria-busy={busy}
            data-slot="live-region-root"
            className={clsx(rootClass, className)}
            style={rootStyle}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

LiveRegion.displayName = COMPONENT_NAME;

export default LiveRegion;
