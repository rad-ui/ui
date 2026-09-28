'use client';

import React, { forwardRef } from 'react';
import FieldsetRoot, {
    FieldsetRootElement,
    FieldsetRootProps
} from './fragments/FieldsetRoot';
import FieldsetLegend from './fragments/FieldsetLegend';
import FieldsetDescription from './fragments/FieldsetDescription';
import FieldsetMessage from './fragments/FieldsetMessage';

export const COMPONENT_NAME = 'Fieldset';

export type FieldsetProps = FieldsetRootProps;

type FieldsetComponent = React.ForwardRefExoticComponent<
    FieldsetProps & React.RefAttributes<FieldsetRootElement>
> & {
    Root: typeof FieldsetRoot;
    Legend: typeof FieldsetLegend;
    Description: typeof FieldsetDescription;
    Message: typeof FieldsetMessage;
};

const Fieldset = forwardRef<FieldsetRootElement, FieldsetProps>((props, ref) => (
    <FieldsetRoot ref={ref} {...props} />
)) as FieldsetComponent;

Fieldset.displayName = COMPONENT_NAME;
Fieldset.Root = FieldsetRoot;
Fieldset.Legend = FieldsetLegend;
Fieldset.Description = FieldsetDescription;
Fieldset.Message = FieldsetMessage;

export type { FieldsetRootProps } from './fragments/FieldsetRoot';
export type { FieldsetLegendProps } from './fragments/FieldsetLegend';
export type { FieldsetDescriptionProps } from './fragments/FieldsetDescription';
export type { FieldsetMessageProps } from './fragments/FieldsetMessage';
export default Fieldset;
