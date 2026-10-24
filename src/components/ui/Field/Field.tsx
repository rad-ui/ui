'use client';

import React, { forwardRef } from 'react';
import FieldRoot, { FieldRootElement, FieldRootProps } from './fragments/FieldRoot';
import FieldLabel from './fragments/FieldLabel';
import FieldControl from './fragments/FieldControl';
import FieldDescription from './fragments/FieldDescription';
import FieldError from './fragments/FieldError';

export const COMPONENT_NAME = 'Field';

export type FieldProps = FieldRootProps;

type FieldComponent = React.ForwardRefExoticComponent<
    FieldProps & React.RefAttributes<FieldRootElement>
> & {
    Root: typeof FieldRoot;
    Label: typeof FieldLabel;
    Control: typeof FieldControl;
    Description: typeof FieldDescription;
    Error: typeof FieldError;
};

const Field = forwardRef<FieldRootElement, FieldProps>((props, ref) => (
    <FieldRoot ref={ref} {...props} />
)) as FieldComponent;

Field.displayName = COMPONENT_NAME;
Field.Root = FieldRoot;
Field.Label = FieldLabel;
Field.Control = FieldControl;
Field.Description = FieldDescription;
Field.Error = FieldError;

export type { FieldRootProps } from './fragments/FieldRoot';
export type { FieldLabelProps } from './fragments/FieldLabel';
export type { FieldControlProps } from './fragments/FieldControl';
export type { FieldDescriptionProps } from './fragments/FieldDescription';
export type { FieldErrorProps } from './fragments/FieldError';
// Named part exports let React Server Components use `import * as Field from '@radui/ui/Field'`;
// property access on the default export is undefined across the client boundary.
export {
    FieldRoot as Root,
    FieldLabel as Label,
    FieldControl as Control,
    FieldDescription as Description,
    FieldError as Error
};

export default Field;
