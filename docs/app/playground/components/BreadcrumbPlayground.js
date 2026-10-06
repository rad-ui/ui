'use client'

import Breadcrumb from "@radui/ui/Breadcrumb"
import PlaygroundSection from "../helpers/PlaygroundSection"

const BreadcrumbPlayground = () => (
    <div>
        <PlaygroundSection
            title="Breadcrumb"
            docsLink="/docs/components/breadcrumb"
            description="Hierarchical trail showing where the current page sits."
        >
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                    <Breadcrumb.Item><Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                    <Breadcrumb.Item><Breadcrumb.Page>Playground</Breadcrumb.Page></Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        </PlaygroundSection>
    </div>
)

export default BreadcrumbPlayground
