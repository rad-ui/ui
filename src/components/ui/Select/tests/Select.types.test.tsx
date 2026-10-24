import React from 'react';
import { render } from '@testing-library/react';
import Select from '../Select';

// Compile-time checks: these must type-check under strict mode.
describe('Select value typings', () => {
    test('inline, string and array handlers all type-check', () => {
        const SingleInline = () => {
            const [value, setValue] = React.useState('');
            return <Select.Root value={value} onValueChange={(next) => setValue(next)}><Select.Trigger /></Select.Root>;
        };
        const SingleTyped = () => {
            const handle = (next: string) => next.toUpperCase();
            return <Select.Root onValueChange={handle}><Select.Trigger /></Select.Root>;
        };
        const MultipleTyped = () => {
            const [values, setValues] = React.useState<string[]>([]);
            return <Select.Root multiple value={values} onValueChange={setValues}><Select.Trigger /></Select.Root>;
        };
        const Wrapper = (props: Omit<React.ComponentProps<typeof Select.Root>, 'children'>) => (
            <Select.Root {...props}><Select.Trigger /></Select.Root>
        );
        render(<><SingleInline /><SingleTyped /><MultipleTyped /><Wrapper multiple /></>);
    });
});
