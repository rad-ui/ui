'use client'

import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import ColorLooper from "../helpers/ColorLooper"

const CardPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Card"
            docsLink="/docs/components/card"
            description="Structured surface with header, content, action, and footer regions."
        >
            <div className='grid gap-4 md:grid-cols-2'>
                <Card variant="outline">
                    <Card.Header>
                        <Card.Title>Release status</Card.Title>
                        <Card.Description>Snapshot of the current docs refresh work.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p className="text-sm text-gray-700">
                            Playground coverage now mirrors the documented component set instead of a small hand-picked subset.
                        </p>
                    </Card.Content>
                    <Card.Footer>
                        <Button size="small">View changelog</Button>
                    </Card.Footer>
                </Card>
                <Card size="small">
                    <Card.Header>
                        <Card.Title>Team</Card.Title>
                        <Card.Description>Two editors currently active in docs.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center justify-between">
                                <span>Documentation</span>
                                <span>Ready</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Playground</span>
                                <span>Updated</span>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </ColorLooper>
    </div>
)

export default CardPlayground
