import React from "react";
import NumberField from "../NumberField";
import SandboxEditor from "~/components/tools/SandboxEditor/SandboxEditor";

export default {
  title: "WIP/NumberField",
  component: NumberField,
};

export const Basic = () => (
  <SandboxEditor>
    <NumberField.Root
      defaultValue={5}
      step={1}
      min={-10}
      max={110}
      largeStep={5}
    >
      <NumberField.Decrement>-</NumberField.Decrement>
      <NumberField.Input />
      <NumberField.Increment>+</NumberField.Increment>
    </NumberField.Root>
  </SandboxEditor>
);

export const Controlled = () => {
  const [value, setValue] = React.useState<number | "">(3);
  return (
    <SandboxEditor>
      <NumberField.Root
        value={value}
        onValueChange={setValue}
        defaultValue={3}
        step={1}
        min={0}
        max={10}
        largeStep={5}
      >
        <NumberField.Decrement>-</NumberField.Decrement>
        <NumberField.Input />
        <NumberField.Increment>+</NumberField.Increment>
      </NumberField.Root>
      <div style={{ marginTop: 8 }}>Current value: {value}</div>
    </SandboxEditor>
  );
};

export const FormExample = () => {
  const [fieldValue, setFieldValue] = React.useState<number | "">(2);
  const [submitted, setSubmitted] = React.useState<number | null>(null);
  return (
    <SandboxEditor>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(fieldValue === "" ? null : fieldValue);
        }}
      >
        <NumberField.Root
          name="quantity"
          value={fieldValue}
          onValueChange={setFieldValue}
          defaultValue={2}
          step={1}
          min={0}
          max={10}
          largeStep={5}
        >
          <NumberField.Decrement>-</NumberField.Decrement>
          <NumberField.Input />
          <NumberField.Increment>+</NumberField.Increment>
        </NumberField.Root>
        <button type="submit" style={{ marginTop: 8 }}>
          Submit
        </button>
      </form>
      {submitted !== null && (
        <div style={{ marginTop: 8 }}>Submitted value: {submitted}</div>
      )}
    </SandboxEditor>
  );
};

export const WithLocale = () => (
    <SandboxEditor>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <p>German (de-DE)</p>
                <NumberField.Root defaultValue={1234567.89} locale="de-DE" step={1}>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input style={{ width: '200px' }} />
                    <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Root>
            </div>
            <div>
                <p>French (fr-FR)</p>
                <NumberField.Root defaultValue={1234567.89} locale="fr-FR" step={1}>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input style={{ width: '200px' }} />
                    <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Root>
            </div>
            <div>
                <p>Indian (en-IN)</p>
                <NumberField.Root defaultValue={1234567.89} locale="en-IN" step={1}>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input style={{ width: '200px' }} />
                    <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Root>
            </div>
        </div>
    </SandboxEditor>
);

