'use client'

import ColorLooper from "../helpers/ColorLooper"
import Avatar from "@radui/ui/Avatar"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Avatar"
            docsLink="/docs/components/avatar"
            description="Compound avatars with image fallback, variant, and size coverage."
        >
            <div className='flex flex-wrap items-center gap-4'>
                <Avatar.Root>
                    <Avatar.Fallback>RU</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root>
                    <Avatar.Image src="https://i.pravatar.cc/64?img=12" alt="Riya" />
                    <Avatar.Fallback>RI</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root size="lg" variant="square">
                    <Avatar.Image src="https://i.pravatar.cc/64?img=32" alt="Sam" />
                    <Avatar.Fallback>SM</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root size="sm">
                    <Avatar.Fallback>PK</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root size="lg">
                    <Avatar.Fallback>AN</Avatar.Fallback>
                </Avatar.Root>
            </div>
            <div className='mt-4 flex flex-wrap items-center gap-4'>
                <Avatar.Root size="sm">
                    <Avatar.Fallback>SM</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root>
                    <Avatar.Fallback>MD</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root size="lg">
                    <Avatar.Fallback>LG</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root variant="square">
                    <Avatar.Fallback>SQ</Avatar.Fallback>
                </Avatar.Root>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
