import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import CheckboxGroupPrimitive from '../CheckboxGroupsPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// Reuse TickIcon from CheckboxPrimitive stories
const TickIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
);

type Story = StoryObj<typeof CheckboxGroupPrimitive>;

export default {
    title: 'Primitives/CheckboxGroupPrimitive',
    component: CheckboxGroupPrimitive
};

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <CheckboxGroupPrimitive.Root className="flex gap-4" name="fruits" defaultValue={['apple', 'banana']}>

                <CheckboxGroupPrimitive.Item value="apple" className='bg-gray-200 border border-blue-800 w-6 h-6 rounded-md flex items-center justify-center'>
                    <TickIcon />
                </CheckboxGroupPrimitive.Item>
                <label className="flex items-center gap-2">
                    Apple
                </label>

                <CheckboxGroupPrimitive.Item value="banana" className='bg-gray-200 border border-blue-800 w-6 h-6 rounded-md flex items-center justify-center'>
                    <TickIcon />
                </CheckboxGroupPrimitive.Item>
                <label className="flex items-center gap-2">
                    Banana
                </label>

                <CheckboxGroupPrimitive.Item value="cherry" className='bg-gray-200 border border-blue-800 w-6 h-6 rounded-md flex items-center justify-center'>
                    <span className="text-blue-900"><TickIcon /></span>
                </CheckboxGroupPrimitive.Item>
                <label className="flex items-center gap-2">
                    Cherry
                </label>
            </CheckboxGroupPrimitive.Root>
        </SandboxEditor>
    )
};

export const FormWithCheckboxGroupPrimitive: Story = {
    render: () => {
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const entries: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
            for (const [key, value] of formData.entries()) {
                if (entries[key]) {
                    if (Array.isArray(entries[key])) {
                        (entries[key] as FormDataEntryValue[]).push(value);
                    } else {
                        entries[key] = [entries[key] as FormDataEntryValue, value];
                    }
                } else {
                    entries[key] = value;
                }
            }
            alert(JSON.stringify(entries, null, 2));
        };
        return (
            <SandboxEditor>
                <form onSubmit={handleSubmit}>
                    <CheckboxGroupPrimitive.Root className="flex gap-4" name="fruits">
                        <label className="flex items-center gap-2">
                            <CheckboxGroupPrimitive.Item value="apple">
                                <span className="text-blue-900"><TickIcon /></span>
                            </CheckboxGroupPrimitive.Item>
                            Apple
                        </label>
                        <label className="flex items-center gap-2">
                            <CheckboxGroupPrimitive.Item value="banana">
                                <span className="text-blue-900"><TickIcon /></span>
                            </CheckboxGroupPrimitive.Item>
                            Banana
                        </label>
                        <label className="flex items-center gap-2">
                            <CheckboxGroupPrimitive.Item value="cherry">
                                <span className="text-blue-900"><TickIcon /></span>
                            </CheckboxGroupPrimitive.Item>
                            Cherry
                        </label>
                    </CheckboxGroupPrimitive.Root>
                    <button type="submit" style={{ marginTop: 16 }}>
                        Submit
                    </button>
                </form>
            </SandboxEditor>
        );
    }
};
