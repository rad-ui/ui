import React from 'react';
import Radio from '../Radio';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/Radio',
    component: Radio,
    render: (args: React.ComponentProps<typeof Radio>) => (
        <SandboxEditor>
            <form>
                <Radio {...args} />
                <label htmlFor={args.id || 'radio'} style={{ marginLeft: 8 }}>
        Radio 1
                </label>
            </form>
        </SandboxEditor>
    )
};

export const Default = {
    args: {
        name: 'radio',
        value: 'radio',
        id: 'radio',
        required: true,
        onChange: () => {
            // action handler
        }
    }
};

export const Disabled = {
    args: {
        disabled: true,
        name: 'radio',
        value: 'radio1',
        id: 'radio1',
        onChange: () => {
            // action handler
        }
    }
};

export const Variants = {
    render: (args: React.ComponentProps<typeof Radio>) => (
        <SandboxEditor>
            <div style={{ display: 'flex', gap: 16 }}>
                <div>
                    <Radio {...args} variant="outline" id="radio-outline" />
                    <label htmlFor="radio-outline" style={{ marginLeft: 8 }}>Outline</label>
                </div>
                <div>
                    <Radio {...args} variant="solid" id="radio-solid" />
                    <label htmlFor="radio-solid" style={{ marginLeft: 8 }}>Solid</label>
                </div>
            </div>
        </SandboxEditor>
    ),
    args: {
        name: 'radio-variant',
        value: 'radio',
        required: false,
        onChange: () => {}
    }
};

export const Sizes = {
    render: (args: React.ComponentProps<typeof Radio>) => (
        <SandboxEditor>
            <div style={{ display: 'flex', gap: 16 }}>
                <div>
                    <Radio {...args} size="small" id="radio-small" />
                    <label htmlFor="radio-small" style={{ marginLeft: 8 }}>Small</label>
                </div>
                <div>
                    <Radio {...args} size="medium" id="radio-medium" />
                    <label htmlFor="radio-medium" style={{ marginLeft: 8 }}>Medium</label>
                </div>
                <div>
                    <Radio {...args} size="large" id="radio-large" />
                    <label htmlFor="radio-large" style={{ marginLeft: 8 }}>Large</label>
                </div>
            </div>
        </SandboxEditor>
    ),
    args: {
        name: 'radio-size',
        value: 'radio',
        required: false,
        onChange: () => {}
    }
};
