'use client';
import React from 'react';
import Primitive from '../../Primitive';

export type ComboboxPrimitiveSeparatorProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/**
 * A visual divider between options or groups. A listbox may only own options
 * and groups, so it's hidden from assistive technology.
 */
const ComboboxPrimitiveSeparator = React.forwardRef<HTMLDivElement, ComboboxPrimitiveSeparatorProps>((props, ref) => (
    <Primitive.div ref={ref} role="presentation" aria-hidden="true" {...props} />
));

ComboboxPrimitiveSeparator.displayName = 'ComboboxPrimitiveSeparator';

export default ComboboxPrimitiveSeparator;
