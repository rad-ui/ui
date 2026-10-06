"use client"

import Splitter from "@radui/ui/Splitter"

const SplitterExample = () => {
    return (
        <Splitter.Root orientation="horizontal" defaultSizes={[35, 65]} style={{ height: 200, width: 480, border: '1px solid var(--rad-ui-border-soft)', borderRadius: 8, overflow: 'hidden' }}>
            <Splitter.Panel index={0} style={{ padding: 16, background: 'var(--rad-ui-surface-subtle)' }}>
                <p className="font-medium text-sm">Left Panel</p>
                <p className="text-sm text-gray-950 mt-1">Drag the handle to resize.</p>
            </Splitter.Panel>
            <Splitter.Handle index={0} />
            <Splitter.Panel index={1} style={{ padding: 16 }}>
                <p className="font-medium text-sm">Right Panel</p>
                <p className="text-sm text-gray-950 mt-1">Content goes here.</p>
            </Splitter.Panel>
        </Splitter.Root>
    )
}

export default SplitterExample
