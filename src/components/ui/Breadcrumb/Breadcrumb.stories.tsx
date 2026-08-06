import React from 'react';
import Breadcrumb from '../Breadcrumb';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Breadcrumb',
    component: Breadcrumb.Root
};

export const Default = () => (
    <SandboxEditor>
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                    <Breadcrumb.Separator />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
                    <Breadcrumb.Separator />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </SandboxEditor>
);

export const CustomSeparator = () => (
    <SandboxEditor>
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                    <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
                    <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Page>Navigation</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </SandboxEditor>
);
