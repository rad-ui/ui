import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Floater from '~/core/primitives/Floater';
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
                <MenuPrimitive.Trigger className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Trigger</MenuPrimitive.Trigger>
                <MenuPrimitive.Portal>
                    <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow-lg min-w-[180px]">
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 1">item 1</MenuPrimitive.Item>
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 2">item 2</MenuPrimitive.Item>
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 3">item 3</MenuPrimitive.Item>
                        <MenuPrimitive.Sub className="flex flex-col">
                            <MenuPrimitive.Trigger className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">Trigger</MenuPrimitive.Trigger>
                            <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow min-w-[160px]">
                                <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="Nested item 1">Nested item 1</MenuPrimitive.Item>
                                <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="Nested item 2">Nested item 2</MenuPrimitive.Item>
                                <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 3">item 1</MenuPrimitive.Item>
                                <MenuPrimitive.Sub className="flex flex-col">
                                    <MenuPrimitive.Trigger className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">Trigger</MenuPrimitive.Trigger>
                                    <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow min-w-[140px]">
                                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                                    </MenuPrimitive.Content>
                                </MenuPrimitive.Sub>
                                <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                                <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                            </MenuPrimitive.Content>

                        </MenuPrimitive.Sub>
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">item 1</MenuPrimitive.Item>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Portal>
            </MenuPrimitive.Root>
        </SandboxEditor>
    )
};
