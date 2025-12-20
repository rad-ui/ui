import React from 'react';
import { Meta } from '@storybook/react';
import ComboboxPrimitive from '../ComboboxPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Primitives/ComboboxPrimitive',
    component: ComboboxPrimitive
} as Meta;

export const BasicCombobox = () => {
    return (
        <SandboxEditor>
            <div>
                <ComboboxPrimitive.Root shift={false}>

                    <ComboboxPrimitive.Trigger>
            hello
                    </ComboboxPrimitive.Trigger>
                    <ComboboxPrimitive.Portal>
                        <ComboboxPrimitive.Content>
                            <ComboboxPrimitive.Group>
                                <ComboboxPrimitive.Item value='option1'>Option 1</ComboboxPrimitive.Item>
                                <ComboboxPrimitive.Item value='option2'>Option 2</ComboboxPrimitive.Item>

                                <ComboboxPrimitive.Item value='option3'>Option 3</ComboboxPrimitive.Item>
                            </ComboboxPrimitive.Group>
                        </ComboboxPrimitive.Content>
                    </ComboboxPrimitive.Portal>

                </ComboboxPrimitive.Root>
            </div>
        </SandboxEditor>
    );
};

export const ControlledExample = () => {
    const [value, setValue] = React.useState('option1');

    return (
        <SandboxEditor>
            <ComboboxPrimitive.Root value={value} onValueChange={setValue} shift={false}>

                <ComboboxPrimitive.Trigger>
            helo
                </ComboboxPrimitive.Trigger>
                <ComboboxPrimitive.Content>
                    <ComboboxPrimitive.Group>
                        <ComboboxPrimitive.Item value='option1'>Option 1</ComboboxPrimitive.Item>
                        <ComboboxPrimitive.Item value='option2'>Option 2</ComboboxPrimitive.Item>

                        <ComboboxPrimitive.Item value='option3'>Option 3</ComboboxPrimitive.Item>
                    </ComboboxPrimitive.Group>
                </ComboboxPrimitive.Content>

            </ComboboxPrimitive.Root>

            <div className='mt-4'>
        Selected value {value}
            </div>
        </SandboxEditor>
    );
};

export const FormExample = () => {
    const [submittedData, setSubmittedData] = React.useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        setSubmittedData(JSON.stringify(data, null, 2));
    };

    return (
        <SandboxEditor>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <ComboboxPrimitive.Root name="raduiCombobox" shift={false}>
                        <ComboboxPrimitive.Trigger>
                            Combobox an option
                        </ComboboxPrimitive.Trigger>
                        <ComboboxPrimitive.Content>
                            <ComboboxPrimitive.Group>
                                <ComboboxPrimitive.Item value="option1">Option 1</ComboboxPrimitive.Item>
                                <ComboboxPrimitive.Item value="option2">Option 2</ComboboxPrimitive.Item>
                                <ComboboxPrimitive.Item value="option3">Option 3</ComboboxPrimitive.Item>
                            </ComboboxPrimitive.Group>
                        </ComboboxPrimitive.Content>
                    </ComboboxPrimitive.Root>
                </div>
                <select name="nativeSelect">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <br/>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit Form
                </button>

            </form>

            {submittedData && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Submitted Form Data:</h3>
                    <pre>{submittedData}</pre>
                </div>
            )}
        </SandboxEditor>
    );
};

export const GroupExample = () => {
    return (
        <SandboxEditor>
            <ComboboxPrimitive.Root shift={false}>
                <ComboboxPrimitive.Trigger>
                    Combobox an option
                </ComboboxPrimitive.Trigger>
                <ComboboxPrimitive.Content>
                    <ComboboxPrimitive.Group>
                        <ComboboxPrimitive.Item value="g1option1">g1Option 1</ComboboxPrimitive.Item>
                        <ComboboxPrimitive.Item value="g1option2">g1Option 2</ComboboxPrimitive.Item>
                        <ComboboxPrimitive.Item value="g1option3">g1Option 3</ComboboxPrimitive.Item>
                    </ComboboxPrimitive.Group>

                    <ComboboxPrimitive.Group>
                        <ComboboxPrimitive.Item value="g2option1">g2Option 1</ComboboxPrimitive.Item>
                        <ComboboxPrimitive.Item value="g2option2">g2Option 2</ComboboxPrimitive.Item>
                        <ComboboxPrimitive.Item value="option3">Option 3</ComboboxPrimitive.Item>
                    </ComboboxPrimitive.Group>
                </ComboboxPrimitive.Content>
            </ComboboxPrimitive.Root>
        </SandboxEditor>
    );
};

export const SearchCombobox = () => {
    return (
        <SandboxEditor>
            <div>
                <ComboboxPrimitive.Root shift={false}>

                    <ComboboxPrimitive.Trigger>
            hello
                    </ComboboxPrimitive.Trigger>
                    {/* <ComboboxPrimitive.Portal> */}
                    <ComboboxPrimitive.Content>
                        <ComboboxPrimitive.Search/>
                        <ComboboxPrimitive.Group>
                            <ComboboxPrimitive.Item value='option1' >Option 1</ComboboxPrimitive.Item>
                            <ComboboxPrimitive.Item value='option2'>Option 2</ComboboxPrimitive.Item>

                            <ComboboxPrimitive.Item value='option3' data-focused={true}>Option 3</ComboboxPrimitive.Item>
                        </ComboboxPrimitive.Group>
                        <ComboboxPrimitive.Group>
                            <ComboboxPrimitive.Item value="g2option1">g2Option 1</ComboboxPrimitive.Item>
                            <ComboboxPrimitive.Item value="g2option2">g2Option 2</ComboboxPrimitive.Item>
                            <ComboboxPrimitive.Item value="g2option3">Option 3</ComboboxPrimitive.Item>
                        </ComboboxPrimitive.Group>
                    </ComboboxPrimitive.Content>
                    {/* </ComboboxPrimitive.Portal> */}

                </ComboboxPrimitive.Root>
            </div>
        </SandboxEditor>
    );
};
