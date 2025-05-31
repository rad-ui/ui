import React from 'react';
import { Meta } from '@storybook/react';
import SelectPrimitive from '../Select';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Floater from '~/core/primitives/Floater';

export default {
    title: 'Primitives/SelectPrimitive',
    component: SelectPrimitive
} as Meta;

export const BasicSelect = () => {
    return (
        <SandboxEditor>
            <div>
                <SelectPrimitive.Root>

                    <SelectPrimitive.Trigger>
            hello
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content>
                            <SelectPrimitive.Item value='option1'>Option 1</SelectPrimitive.Item>
                            <SelectPrimitive.Item value='option2'>Option 2</SelectPrimitive.Item>

                            <SelectPrimitive.Item value='option3'>Option 3</SelectPrimitive.Item>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>

                </SelectPrimitive.Root>
            </div>
        </SandboxEditor>
    );
};

export const ControlledExample = () => {
    const [value, setValue] = React.useState('option1');

    return (
        <SandboxEditor>
            <SelectPrimitive.Root value={value} onValueChange={setValue}>

                <SelectPrimitive.Trigger>
            helo
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Content>
                    <SelectPrimitive.Item value='option1'>Option 1</SelectPrimitive.Item>
                    <SelectPrimitive.Item value='option2'>Option 2</SelectPrimitive.Item>

                    <SelectPrimitive.Item value='option3'>Option 3</SelectPrimitive.Item>
                </SelectPrimitive.Content>

            </SelectPrimitive.Root>

            <div className='mt-4'>
        Selected value {value}
            </div>
        </SandboxEditor>
    );
};
