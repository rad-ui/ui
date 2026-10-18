import Select from '@radui/ui/Select';
import Combobox from '@radui/ui/Combobox';

<Select.Trigger renderValue={(value, label) => {
    const display: string = `${value.toUpperCase()}: ${label.toUpperCase()}`;
    // @ts-expect-error Selected values are strings, not numbers.
    value.toFixed(2);
    return display;
}} />;

<Combobox.Trigger renderValue={(value, label) => {
    // @ts-expect-error The label is a string, not a number.
    label.toFixed(2);
    return `${value.toUpperCase()}: ${label.toUpperCase()}`;
}} />;
