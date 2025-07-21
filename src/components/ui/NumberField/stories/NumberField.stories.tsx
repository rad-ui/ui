import React from 'react';
import NumberField from '../NumberField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/NumberField',
    component: NumberField
};

export const Basic = () => (
    <SandboxEditor>
        <NumberField.Root defaultValue={5} step={1} min={0} max={10} largeStep={5}>
            <NumberField.Decrement>-</NumberField.Decrement>
            <NumberField.Input />
            <NumberField.Increment>+</NumberField.Increment>
        </NumberField.Root>
    </SandboxEditor>
);
