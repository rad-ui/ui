import Menu from '../Menu';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { useState } from 'react';

const MenuTemplate = (args) => {
    return (
        <SandboxEditor>
            <Menu.Root>
                <Menu.Trigger>
                    Trigger
                </Menu.Trigger>
                <Menu.Content>
                    <Menu.Item>
                        Item 1
                    </Menu.Item>
                    <Menu.Item>
                        Item 2
                    </Menu.Item>
                    <Menu.Item>
                        Item 3
                    </Menu.Item>
                </Menu.Content>
            </Menu.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/Menu',
    component: Menu,
    render: (args) => <MenuTemplate {...args}/>
};

export const All = {};
All.args = {};
