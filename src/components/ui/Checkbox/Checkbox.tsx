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
// Named part exports let React Server Components use `import * as Checkbox from '@radui/ui/Checkbox'`;
// property access on the default export is undefined across the client boundary.
export {
    CheckboxRoot as Root,
    CheckboxIndicator as Indicator
};

export default Checkbox;
