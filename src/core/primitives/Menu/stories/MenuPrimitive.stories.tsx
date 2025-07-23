import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import MenuPrimitive from '../MenuPrimitive';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';



type Story = StoryObj<typeof MenuPrimitive>;

export default {
    title: 'Primitives/MenuPrimitive',
    component: MenuPrimitive
};

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <MenuPrimitive.Root>
                <MenuPrimitive.Trigger>Trigger</MenuPrimitive.Trigger>
                <MenuPrimitive.Content className="flex flex-col">
                    <MenuPrimitive.Item>
                        item 1
                    </MenuPrimitive.Item>
                    <MenuPrimitive.Item>
                        item 1
                    </MenuPrimitive.Item>
                    <MenuPrimitive.Item>
                        item 1
                    </MenuPrimitive.Item>
                    <MenuPrimitive.Root>
                        <MenuPrimitive.Trigger>Trigger</MenuPrimitive.Trigger>
                        <MenuPrimitive.Content className="flex flex-col">
                            <MenuPrimitive.Item>
                                item 1
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Item>
                                item 1
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Item>
                                item 1
                            </MenuPrimitive.Item>
                              <MenuPrimitive.Root>
                <MenuPrimitive.Trigger>Trigger</MenuPrimitive.Trigger>
                <MenuPrimitive.Content className="flex flex-col">
                <MenuPrimitive.Item>
                    item 1
                </MenuPrimitive.Item>
                <MenuPrimitive.Item>
                    item 1
                </MenuPrimitive.Item>
                <MenuPrimitive.Item>
                    item 1
                </MenuPrimitive.Item>
                </MenuPrimitive.Content>
            </MenuPrimitive.Root>
                        </MenuPrimitive.Content>
                        
                        
                    </MenuPrimitive.Root>
                </MenuPrimitive.Content>
            </MenuPrimitive.Root>
        </SandboxEditor>
    )
};

