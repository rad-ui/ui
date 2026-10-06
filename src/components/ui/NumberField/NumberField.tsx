import NumberFieldRoot from './fragments/NumberFieldRoot';
import NumberFieldInput from './fragments/NumberFieldInput';
import NumberFieldIncrement from './fragments/NumberFieldIncrement';
import NumberFieldDecrement from './fragments/NumberFieldDecrement';

const NumberField = () => {
    console.warn('Direct usage of NumberField is not supported. Please use NumberField.Root, NumberField.Item instead.');
    return null;
};

NumberField.Root = NumberFieldRoot;
NumberField.Input = NumberFieldInput;
NumberField.Increment = NumberFieldIncrement;
NumberField.Decrement = NumberFieldDecrement;

export type { NumberFieldRootProps } from './fragments/NumberFieldRoot';
export type { NumberFieldInputProps } from './fragments/NumberFieldInput';
export type { NumberFieldIncrementProps } from './fragments/NumberFieldIncrement';
export type { NumberFieldDecrementProps } from './fragments/NumberFieldDecrement';
// Named part exports let React Server Components use `import * as NumberField from '@radui/ui/NumberField'`;
// property access on the default export is undefined across the client boundary.
export {
    NumberFieldRoot as Root,
    NumberFieldInput as Input,
    NumberFieldIncrement as Increment,
    NumberFieldDecrement as Decrement
};

export default NumberField;
