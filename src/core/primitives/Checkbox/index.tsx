'use client';

import CheckboxPrimitiveRoot from './fragments/CheckboxPrimitiveRoot';
import CheckboxPrimitiveIndicator from './fragments/CheckboxPrimitiveIndicator';

const CheckboxPrimitive = () => {
    console.warn('Direct usage of CheckboxPrimitive is not supported. Please use CheckboxPrimitive.Root, CheckboxPrimitive.Input, etc. instead.');
    return null;
};

CheckboxPrimitive.Root = CheckboxPrimitiveRoot;
CheckboxPrimitive.Indicator = CheckboxPrimitiveIndicator;

export default CheckboxPrimitive;
