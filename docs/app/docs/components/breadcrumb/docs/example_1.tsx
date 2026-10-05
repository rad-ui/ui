"use client"

import Breadcrumb from "@radui/ui/Breadcrumb"

const BreadcrumbExample = () => (
    <Breadcrumb.Root>
        <Breadcrumb.List>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
        </Breadcrumb.List>
    </Breadcrumb.Root>
)

export default BreadcrumbExample
