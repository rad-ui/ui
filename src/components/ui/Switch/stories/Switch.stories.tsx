import React from 'react';
import Switch from '../Switch';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Switch',
    component: Switch
} as any;

const SwitchRow = ({ defaultChecked = false }: { defaultChecked?: boolean }) => {
    return (
        <label className="inline-flex items-center gap-3 text-base font-medium leading-none text-[var(--rad-ui-text-primary)]">
            <Switch.Root defaultChecked={defaultChecked} aria-label="Airplane Mode">
                <Switch.Thumb />
            </Switch.Root>
            <span>Airplane Mode</span>
        </label>
    );
};

export const Checked = {
    render: () => {
        return <SandboxEditor>
            <div className="flex justify-center py-16">
                <SwitchRow defaultChecked />
            </div>
        </SandboxEditor>;
    }
};

export const Unchecked = {
    render: () => {
        return <SandboxEditor>
            <div className="flex justify-center py-16">
                <SwitchRow />
            </div>
        </SandboxEditor>;
    }
};
