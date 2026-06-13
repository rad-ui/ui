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
            <div className="w-full max-w-[38rem] space-y-6">
                <div className="flex items-center gap-3">
                    <Checkbox.Root id="accept-terms" checked={checked} onCheckedChange={(val) => setChecked(val as boolean)}>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    <label htmlFor="accept-terms" className="cursor-pointer text-[0.95rem] font-medium text-[var(--rad-ui-text-primary)]">
                        Accept terms and conditions
                    </label>
                </div>
            </div>
        </SandboxEditor>
    );
};

export const Checked = () => (
    <SandboxEditor>
        <div className="w-full max-w-[38rem] space-y-6">
            <div className="flex items-start gap-3">
                <Checkbox.Root id="checked-default" checked={true}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <div className="space-y-1">
                    <label htmlFor="checked-default" className="block cursor-pointer text-[0.95rem] font-medium text-[var(--rad-ui-text-primary)]">Accept terms and conditions</label>
                    <p className="text-[0.8125rem] text-[var(--rad-ui-text-secondary)]">By clicking this checkbox, you agree to the terms.</p>
                </div>
            </div>
        </div>
    </SandboxEditor>
);

export const Disabled = () => (
    <SandboxEditor>
        <div className="w-full max-w-[38rem] space-y-5">
            <div className="flex items-center gap-3">
                <Checkbox.Root id="disabled-unchecked" disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled-unchecked" className="text-[0.95rem] font-medium text-[var(--rad-ui-text-muted)]">Enable notifications</label>
            </div>
        </div>
    </SandboxEditor>
);

export const WithLabel = () => {
    const [checked, setChecked] = useState(false);

    return (
        <SandboxEditor>
            <div className="w-full max-w-[38rem]">
                <label
                    htmlFor="notifications"
                    className="flex cursor-pointer items-start gap-3 rounded-[1rem] border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface)] px-4 py-4"
                >
                    <Checkbox.Root
                        id="notifications"
                        checked={checked}
                        onCheckedChange={(value) => setChecked(value as boolean)}
                    >
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    <div className="space-y-1">
                        <div className="text-[0.95rem] font-medium text-[var(--rad-ui-text-primary)]">Enable notifications</div>
                        <p className="text-[0.8125rem] text-[var(--rad-ui-text-secondary)]">
                            You can enable or disable notifications at any time.
                        </p>
                    </div>
                </label>
            </div>
        </SandboxEditor>
    );
};
