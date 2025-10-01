import React from 'react';
import NumberField from '../NumberField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/NumberField',
    component: NumberField
};

export const Basic = () => (
    <SandboxEditor>
        <NumberField.Root defaultValue={5} step={1} min={-10} max={110} largeStep={5} snapOnStep={true}>
            <NumberField.Decrement>-</NumberField.Decrement>
            <NumberField.Input />
            <NumberField.Increment>+</NumberField.Increment>
        </NumberField.Root>
    </SandboxEditor>
);

export const Controlled = () => {
    const [value, setValue] = React.useState<number | ''>(3);
    return (
        <SandboxEditor>
            <NumberField.Root value={value} onValueChange={setValue} defaultValue={3} step={1} largeStep={5}>
                <NumberField.Decrement>-</NumberField.Decrement>
                <NumberField.Input />
                <NumberField.Increment>+</NumberField.Increment>
            </NumberField.Root>
            <div style={{ marginTop: 8 }}>Current value: {value}</div>
        </SandboxEditor>
    );
};

export const FormExample = () => {
    const [fieldValue, setFieldValue] = React.useState<number | ''>(2);
    const [submitted, setSubmitted] = React.useState<number | null>(null);
    return (
        <SandboxEditor>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setSubmitted(fieldValue === '' ? null : fieldValue);
                }}
            >
                <NumberField.Root name="quantity" value={fieldValue} onValueChange={setFieldValue} defaultValue={2} step={1} min={0} max={10} largeStep={5}>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input />
                    <NumberField.Increment>+</NumberField.Increment>

                </NumberField.Root>
                <button type="submit" style={{ marginTop: 8 }}>Submit</button>
            </form>
            {submitted !== null && (
                <div style={{ marginTop: 8 }}>Submitted value: {submitted}</div>
            )}
        </SandboxEditor>
    );
};
