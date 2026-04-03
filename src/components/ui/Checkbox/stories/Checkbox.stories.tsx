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
            <div className="flex items-center gap-3">
                <Checkbox.Root id="accept-terms" checked={checked} onCheckedChange={(val) => setChecked(val as boolean)}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="accept-terms" className="text-base font-medium cursor-pointer text-gray-950">
                    Accept terms and conditions
                </label>
            </div>
        </SandboxEditor>
    );
};

export const Checked = () => (
    <SandboxEditor>
        <div className="flex items-start gap-3">
            <Checkbox.Root id="checked-default" checked={true}>
                <Checkbox.Indicator />
            </Checkbox.Root>
            <div className="space-y-1">
                <label htmlFor="checked-default" className="block text-base font-medium cursor-pointer text-gray-950">Accept terms and conditions</label>
                <p className="text-sm text-gray-700">By clicking this checkbox, you agree to the terms.</p>
            </div>
        </div>
    </SandboxEditor>
);

export const Disabled = () => (
    <SandboxEditor>
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Checkbox.Root id="disabled-unchecked" disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled-unchecked" className="text-base font-medium text-gray-500">Enable notifications</label>
            </div>
            <div className="flex items-center gap-3">
                <Checkbox.Root id="disabled-checked" checked disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled-checked" className="text-base font-medium text-gray-500">Receive weekly updates</label>
            </div>
        </div>
    </SandboxEditor>
);

export const WithLabel = () => {
    const [items, setItems] = useState({
        terms: false,
        notifications: true,
        disabled: false
    });

    return (
        <SandboxEditor>
            <div className="space-y-4 w-full max-w-md">
                <div className="space-y-5">
                    {Object.entries(items).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-3">
                            <Checkbox.Root
                                id={key}
                                checked={value}
                                disabled={key === 'disabled'}
                                onCheckedChange={(checked) =>
                                    setItems({ ...items, [key]: checked as boolean })
                                }
                            >
                                <Checkbox.Indicator />
                            </Checkbox.Root>
                            <div className="space-y-1">
                                <label
                                    htmlFor={key}
                                    className={`block text-base font-medium cursor-pointer ${key === 'disabled' ? 'text-gray-500' : 'text-gray-950'}`}
                                >
                                    {key === 'terms'
                                        ? 'Accept terms and conditions'
                                        : key === 'notifications'
                                            ? 'Enable notifications'
                                            : 'Disabled'}
                                </label>
                                {key === 'terms' && (
                                    <p className="text-sm text-gray-700">By clicking this checkbox, you agree to the terms.</p>
                                )}
                                {key === 'notifications' && (
                                    <p className="text-sm text-gray-700">Enable notifications to receive updates.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SandboxEditor>
    );
};
