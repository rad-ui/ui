import React, { JSX, useState } from 'react';
import Switch, { SwitchProps } from '../Switch';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const Variants = ['surface', 'soft'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

export default {
    title: 'Components/Switch',
    component: Switch,
    render: (args: JSX.IntrinsicAttributes & SwitchProps.Root) => <SwitchComponent {...args}/>
};

const SwitchComponent = (args: SwitchProps.Root) => {
    const variants = ['classic', 'surface', 'solid'];
    const [isChecked, setIsChecked] = useState(true);

    const handleChange = (state: boolean | ((prevState: boolean) => boolean)) => {
        setIsChecked(state);
    };
    return <SandboxEditor className="flex flex-col gap-2">
        {variants.map((variant, index) => (
            <Switch.Root key={index} variant={variant} >
                <Switch.Thumb />
            </Switch.Root>
        ))}

    </SandboxEditor>;
};

export const All = {};

export const controlled = () => {
    const [checked, setChecked] = useState(true);

    const handleToggle = () => {
        setChecked((prev) => !prev);
    };
    return <SandboxEditor>
        <Switch.Root>
            <Switch.Thumb />
        </Switch.Root>
    </SandboxEditor>;
};

export const Uncontrolled = () => {
    return <SandboxEditor>
        <Switch.Root>
            <Switch.Thumb />
        </Switch.Root>

    </SandboxEditor>;
};
export const Color = {
    args: {
        color: 'blue'
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Switch Size</p>
        </div>
        <div>
            <div className='flex flex-col gap-2'>
                {Sizes.map((size, index) => {
                    return <Switch.Root key={index} size={size} >
                        <Switch.Thumb />
                    </Switch.Root>;
                })}
            </div>

        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Switch Variant</p>
        </div>
        <div>
            <div className='flex flex-col gap-2'>
                {Variants.map((variant, index) => {
                    return <Switch.Root key={index} variant={variant} >
                        <Switch.Thumb />
                    </Switch.Root>;
                })}
            </div>

        </div>
    </SandboxEditor>;
};

// New stories for the GitHub issue #1270 features
export const ControlledMode = () => {
    const [checked, setChecked] = useState(false);

    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Controlled Switch</p>
            <p className='text-sm text-gray-600'>Current state: {checked ? 'ON' : 'OFF'}</p>
        </div>
        <div className='flex flex-col gap-4'>
            <Switch.Root checked={checked} onCheckedChange={setChecked}>
                <Switch.Thumb />
            </Switch.Root>

            <div className='flex gap-2'>
                <button
                    onClick={() => setChecked(true)}
                    className='px-3 py-1 bg-blue-500 text-white rounded text-sm'
                >
                    Turn ON
                </button>
                <button
                    onClick={() => setChecked(false)}
                    className='px-3 py-1 bg-gray-500 text-white rounded text-sm'
                >
                    Turn OFF
                </button>
            </div>
        </div>
    </SandboxEditor>;
};

export const UncontrolledMode = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Uncontrolled Switch with defaultChecked</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-gray-600 mb-2'>Default OFF:</p>
                <Switch.Root defaultChecked={false}>
                    <Switch.Thumb />
                </Switch.Root>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Default ON:</p>
                <Switch.Root defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
            </div>
        </div>
    </SandboxEditor>;
};

export const DisabledState = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Disabled Switches</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-gray-600 mb-2'>Disabled OFF:</p>
                <Switch.Root disabled defaultChecked={false}>
                    <Switch.Thumb />
                </Switch.Root>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Disabled ON:</p>
                <Switch.Root disabled defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
            </div>
        </div>
    </SandboxEditor>;
};

export const FormIntegration = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Switch with Form Attributes</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-gray-600 mb-2'>Required Switch:</p>
                <Switch.Root name="notifications" value="enabled" required>
                    <Switch.Thumb />
                </Switch.Root>
                <p className='text-xs text-gray-500 mt-1'>This switch is required for form submission</p>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Optional Switch:</p>
                <Switch.Root name="marketing" value="opted-in">
                    <Switch.Thumb />
                </Switch.Root>
                <p className='text-xs text-gray-500 mt-1'>This switch is optional</p>
            </div>
        </div>
    </SandboxEditor>;
};

export const AsChildSupport = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Switch with asChild Support</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-gray-600 mb-2'>Custom Root Element:</p>
                <Switch.Root asChild>
                    <div className='inline-flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50'>
                        <Switch.Thumb />
                        <span>Custom Switch</span>
                    </div>
                </Switch.Root>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Custom Thumb Element:</p>
                <Switch.Root>
                    <Switch.Thumb asChild>
                        <div className='w-4 h-4 bg-blue-500 rounded-full' />
                    </Switch.Thumb>
                </Switch.Root>
            </div>
        </div>
    </SandboxEditor>;
};

export const DataAttributes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Switch Data Attributes</p>
            <p className='text-sm text-gray-600'>Open browser inspector to see data-state and data-disabled attributes</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-gray-600 mb-2'>Active Switch:</p>
                <Switch.Root defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
                <p className='text-xs text-gray-500 mt-1'>Has data-state="checked"</p>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Inactive Switch:</p>
                <Switch.Root defaultChecked={false}>
                    <Switch.Thumb />
                </Switch.Root>
                <p className='text-xs text-gray-500 mt-1'>Has data-state="unchecked"</p>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Disabled Switch:</p>
                <Switch.Root disabled defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
                <p className='text-xs text-gray-500 mt-1'>Has data-state="checked" and data-disabled=""</p>
            </div>
        </div>
    </SandboxEditor>;
};
