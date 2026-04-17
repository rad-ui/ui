'use client';

import CheckboxPrimitiveRoot, { CheckboxPrimitiveRootProps } from './fragments/CheckboxPrimitiveRoot';
import CheckboxPrimitiveIndicator from './fragments/CheckboxPrimitiveIndicator';

const CheckboxPrimitive = () => {
    console.warn('Direct usage of CheckboxPrimitive is not supported. Please use CheckboxPrimitive.Root, CheckboxPrimitive.Input, etc. instead.');
    return null;
};

export namespace CheckboxPrimitiveProps {
  export type Root = CheckboxPrimitiveRootProps;
}

CheckboxPrimitive.Root = CheckboxPrimitiveRoot;
CheckboxPrimitive.Indicator = CheckboxPrimitiveIndicator;

export default CheckboxPrimitive;
