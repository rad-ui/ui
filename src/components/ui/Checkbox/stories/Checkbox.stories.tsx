import Checkbox from '~/components/ui/Checkbox/Checkbox';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React, { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Checkbox',
    component: Checkbox
};

export const Default = () => {
    const [checked, setChecked] = useState(false);

    return (
        <SandboxEditor>
            <div className="flex items-center space-x-2">
                <Checkbox.Root id="accept-terms" checked={checked} onCheckedChange={(val) => setChecked(val as boolean)}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="accept-terms" className="text-sm font-medium cursor-pointer">
                    Accept terms and conditions
                </label>
            </div>
        </SandboxEditor>
    );
};

export const Checked = () => (
    <SandboxEditor>
        <div className="flex items-center space-x-2">
            <Checkbox.Root id="checked-default" checked={true}>
                <Checkbox.Indicator />
            </Checkbox.Root>
            <label htmlFor="checked-default" className="text-sm font-medium cursor-pointer">Checked by default</label>
        </div>
    </SandboxEditor>
);

export const Disabled = () => (
    <SandboxEditor>
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Checkbox.Root id="disabled-unchecked" disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled-unchecked" className="text-sm font-medium text-gray-500">Disabled unchecked</label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox.Root id="disabled-checked" checked disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled-checked" className="text-sm font-medium text-gray-500">Disabled checked</label>
            </div>
        </div>
    </SandboxEditor>
);

export const WithLabel = () => {
    const [items, setItems] = useState({
        notifications: true,
        marketing: false,
        security: true
    });

    return (
        <SandboxEditor>
            <div className="space-y-4 w-full max-w-md">
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <div className="space-y-3">
                    {Object.entries(items).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox.Root
                                id={key}
                                checked={value}
                                onCheckedChange={(checked) =>
                                    setItems({ ...items, [key]: checked })
                                }
                            >
                                <Checkbox.Indicator />
                            </Checkbox.Root>
                            <label
                                htmlFor={key}
                                className="text-sm font-medium cursor-pointer capitalize"
                            >
                                {key.replace('_', ' ')}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </SandboxEditor>
    );
};
