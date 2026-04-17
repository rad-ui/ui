import CheckboxRoot from './fragments/CheckboxRoot';
import CheckboxIndicator from './fragments/CheckboxIndicator';

const Checkbox = () => {
    console.warn('Direct usage of Checkbox is not supported. Please use Checkbox.Root, Checkbox.Indicator instead.');
    return null;
};

Checkbox.Root = CheckboxRoot;
Checkbox.Indicator = CheckboxIndicator;

export type { CheckboxRootProps } from './fragments/CheckboxRoot';
export type { CheckboxIndicatorProps } from './fragments/CheckboxIndicator';
export default Checkbox;
