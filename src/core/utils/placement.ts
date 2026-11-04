import type { Placement } from '@floating-ui/react';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

/** Positioning a floating part's Content can ask its Root for. */
export type ContentPositioning = {
    side?: Side;
    align?: Align;
    sideOffset?: number;
    alignOffset?: number;
};

/** `side` + `align` as a floating-ui placement (`center` has no suffix). */
export const toPlacement = (side: Side, align: Align = 'center'): Placement =>
    (align === 'center' ? side : `${side}-${align}`) as Placement;

/** The side a resolved placement ended up on (after flipping). */
export const placementSide = (placement?: string): Side | undefined =>
    (placement ? placement.split('-')[0] : undefined) as Side | undefined;

/** The alignment a resolved placement ended up with. */
export const placementAlign = (placement?: string): Align | undefined => {
    if (!placement) return undefined;
    return (placement.split('-')[1] as Align | undefined) ?? 'center';
};

/** Shallow equality, so a Content re-render with the same values doesn't re-position. */
export const samePositioning = (a: ContentPositioning, b: ContentPositioning) =>
    a.side === b.side && a.align === b.align && a.sideOffset === b.sideOffset && a.alignOffset === b.alignOffset;
