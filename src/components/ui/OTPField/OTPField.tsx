'use client';

import React, { forwardRef } from 'react';
import OTPFieldRoot, { OTPFieldRootElement, OTPFieldRootProps } from './fragments/OTPFieldRoot';
import OTPFieldInput from './fragments/OTPFieldInput';

type OTPFieldComponent = React.ForwardRefExoticComponent<
    OTPFieldRootProps & React.RefAttributes<OTPFieldRootElement>
> & {
    Root: typeof OTPFieldRoot;
    Input: typeof OTPFieldInput;
};

const OTPField = forwardRef<OTPFieldRootElement, OTPFieldRootProps>((props, ref) => (
    <OTPFieldRoot ref={ref} {...props} />
)) as OTPFieldComponent;

OTPField.displayName = 'OTPField';
OTPField.Root = OTPFieldRoot;
OTPField.Input = OTPFieldInput;

export type { OTPFieldRootProps } from './fragments/OTPFieldRoot';
export type { OTPFieldInputProps } from './fragments/OTPFieldInput';
export type { OTPFieldValidationType } from './contexts/OTPFieldContext';
// Named part exports let React Server Components use `import * as OTPField from '@radui/ui/OTPField'`;
// property access on the default export is undefined across the client boundary.
export {
    OTPFieldRoot as Root,
    OTPFieldInput as Input
};

export default OTPField;
